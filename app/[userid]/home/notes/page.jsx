"use client";
import { setNotes } from "../../../_store/features/notes/noteSlice";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDraw } from "react-icons/md";
import { Spinner } from "@material-tailwind/react";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../../_store/hooks";
import { useEffect, useState, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

import Card from "../../../_components/NoteCard";
import DrawingPane from "../../../_components/DrawingPane";
import axios from "axios";
import { setDrawing } from "../../../_store/features/drawing/drawingSlice";

axios.defaults.withCredentials = true;

function page() {
  const dispatch = useAppDispatch();
  const [id, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);

  // First useEffect to get the ID
  useEffect(() => {
    axios
      .get("http://localhost:3009/")
      .then((res) => {
        if (res.status === 200) {
          setUserID(res.data.id); // Setting the ID here
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Second useEffect to fetch notes only after ID is set
  useEffect(() => {
    if (!id) return; // If id is null or undefined, do not proceed

    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3009/${id}/home/notes`
        );
        const data = response.data;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
        dispatch(setNotes(data.notes));
        dispatch(setDrawing(data.drawing));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes(); // Call fetchNotes only when id is available
  }, [id, dispatch]); // Dependency array includes `id` and `dispatch`

  const notes = useAppSelector((state) => state.note.notes);
  const drawing = useAppSelector((state) => state.drawing.drawing);

  const combinedNotes = [...notes, ...drawing]; // Combine notes and drawings'

  const sortedItems = combinedNotes.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // Sort descending by date
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawModalOpen, setIsDrawModalOpen] = useState(false); // New state for draw modal
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [strokeColor, setStrokeColor] = useState("black");
  const sketchRef = useRef(null); // Ref for the drawing canvas

  const openModal = () => {
    setModalTitle("");
    setModalBody("");
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openDrawModal = () => {
    setIsDrawModalOpen(true);
  };
  const closeDrawModal = () => {
    setIsDrawModalOpen(false);
  };
  const handleCreateNote = () => {
    openModal();
  };
  const handleDrawNote = () => {
    openDrawModal();
  };

  const saveNote = async () => {
    try {
      await axios.post(
        `http://localhost:3009/${id}/home/notes/post`,
        {
          title: modalTitle,
          text: modalBody,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      closeModal();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const saveDrawing = async () => {
    try {
      const paths = await sketchRef.current.exportPaths(); // Export paths directly
      const exportedImage = await sketchRef.current.exportImage("png"); // Export paths directly

      const base64Image = exportedImage.split(",")[1];
      await axios.post(
        `http://localhost:3009/${id}/home/notes/drawing/post`,
        {
          drawing: paths, // Save the paths
          drawing_img: base64Image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      closeDrawModal();
    } catch (error) {
      console.error("Error saving drawing:", error);
    }
  };

  let handleStrokeColor = (color) => {
    setStrokeColor(color);
  };
  return (
    <div className="dark h-screen">
      <div className="dark:bg-[#0c0c0c] h-full border-2 border-red-500 items-center bg-orange-100 dark:text-white text-black md:p-10 flex flex-col relative">
        <div className="h-fit absolute top-3 right-5 md:flex md:mt-2 md:mb-5 justify-end">
          <div className="flex gap-2">
            <IoIosAddCircleOutline
              className="edit-tools"
              onClick={handleCreateNote}
            />
            <MdOutlineDraw className="edit-tools" onClick={handleDrawNote} />
          </div>
        </div>
        {/* Grid to display notes/drawings, responsive layout */}
        <div className="grid gap-y-5 grid-cols-2 lg:grid-cols-3 gap-6 my-24 md:my-2">
          {loading ? (
            <div className="fixed top-[40%] left-[50%]">
              <Spinner color="white" size="5xl" />
            </div>
          ) : sortedItems.length > 0 ? (
            sortedItems.map((item) => (
              <div key={item.note_id || item.drawing_id} className="w-full">
                {item.text ? (
                  <Card
                    title={item.title}
                    initialBody={item.text}
                    date={item.date}
                    noteId={item.note_id}
                    user_id={id}
                  />
                ) : item.drawing ? (
                  <DrawingPane
                    initialBody={item.drawing}
                    drawing_img={`data:image/png;base64,${item.drawing_img}`}
                    date={item.date}
                    drawing_id={item.drawing_id}
                    user_id={id}
                  />
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-center">No notes available</p>
          )}
        </div>

        {/* Note Creation Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Create Note"
          className="modal-content w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg dark"
          overlayClassName="modal-overlay"
        >
          <div className="flex flex-col p-4 border-2 dark:text-white bg-white dark:bg-gray-900 rounded-lg shadow-md">
            {/* Modal content */}
            <form className="p-4">
              <input
                type="text"
                placeholder="Title"
                value={modalTitle}
                onChange={(e) => setModalTitle(e.target.value)}
                className="w-full mb-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
              />
              <textarea
                placeholder="Body"
                value={modalBody}
                onChange={(e) => setModalBody(e.target.value)}
                className="w-full h-32 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg"
              />
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-[#bf6e2c] text-white rounded-lg hover:bg-[#9b6436]"
                onClick={saveNote}
              >
                Save
              </button>
            </form>
          </div>
        </Modal>

        {/* Drawing Modal */}
        <Modal
          isOpen={isDrawModalOpen}
          onRequestClose={closeDrawModal}
          contentLabel="Draw Note"
          className="modal-content w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg dark"
          overlayClassName="modal-overlay"
        >
          <div className="flex flex-col p-4 border-2 dark:text-white bg-white dark:bg-gray-900 rounded-lg shadow-md">
            {/* Drawing Canvas */}
            <div className="p-4">
              <ReactSketchCanvas
                ref={sketchRef}
                style={{
                  border: "1px solid #000",
                  width: "100%",
                  height: "300px",
                }}
                strokeWidth={4}
                strokeColor={strokeColor}
              />
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-[#bf6e2c] text-white rounded-lg hover:bg-[#9b6436]"
                onClick={saveDrawing}
              >
                Save Drawing
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default page;
