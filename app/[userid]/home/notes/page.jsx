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
  const [strokeColor , setStrokeColor] = useState("black");
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
     
      const base64Image = exportedImage.split(',')[1];
      await axios.post(
        `http://localhost:3009/${id}/home/notes/drawing/post`,
        {
          drawing: paths, // Save the paths
          drawing_img: base64Image
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
      <div className="dark:bg-[#0c0c0c] h-full bg-orange-100 dark:text-white text-black p-10 flex flex-col relative">
        <div className="rounded-full border-[#F39F5A] hidden md:flex mt-2 mb-5 justify-end">
          <div className="flex gap-2">
            <IoIosAddCircleOutline
              className="edit-tools"
              onClick={handleCreateNote}
            />
            <MdOutlineDraw className="edit-tools" onClick={handleDrawNote} />
          </div>
        </div>
        <div className="lg:grid-cols-4 md:grid-cols-3 grid-cols-2 grid gap-y-5">
        {loading ? (
            <div className="fixed top-[40%] left-[60%]">
              <Spinner color="white" size="5xl" />
            </div>
          ) : sortedItems.length > 0 ? (
            sortedItems.map((item) => (
              <div key={item.note_id || item.drawing_id}>
                {item.text ? ( // If the item has text, it's a note
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
          ): (
            <p>No notes available</p>
          )}
        </div>

        {/* Note Creation Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Create Note"
          className="modal-content min-w-[600px] dark"
          overlayClassName="modal-overlay"
        >
          <div className="flex flex-col border-2 w-full max-w-2xl dark:text-white text-black bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <div className="flex justify-between items-center p-4 bg-blue-100 dark:bg-gray-900">
              <h3 className="text-lg font-semibold">Create Note</h3>
              <button onClick={closeModal} className="text-red-600">
                Close
              </button>
            </div>
            <hr className="w-full dark:text-gray-500 text-gray-800 my-2" />
            <form className="p-4">
              <input
                type="text"
                placeholder="Title"
                value={modalTitle}
                onChange={(e) => setModalTitle(e.target.value)}
                className="w-full mb-4 p-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg"
              />
              <textarea
                placeholder="Body"
                value={modalBody}
                onChange={(e) => setModalBody(e.target.value)}
                className="w-full h-32 bg-gray-100 dark:bg-gray-800 dark:text-white p-2 rounded-lg"
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
          className="modal-content min-w-[600px] dark"
          overlayClassName="modal-overlay"
        >
          <div className="flex flex-col border-2 w-full max-w-2xl dark:text-white text-black bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <div className="flex justify-between items-center p-4 bg-blue-100 dark:bg-gray-900">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Draw Note</h3>
                <div className="flex gap-2">
                  <button onClick={()=>handleStrokeColor("red")} className="w-4 h-4 rounded-full bg-red-700"></button>
                  <button onClick={()=>handleStrokeColor("yellow")} className="w-4 h-4 rounded-full bg-yellow-600"></button>
                  <button onClick={()=>handleStrokeColor("blue")} className="w-4 h-4 rounded-full bg-blue-700"></button>
                  <button onClick={()=>handleStrokeColor("green")} className="w-4 h-4 rounded-full bg-green-500"></button>
                  <button onClick={()=>handleStrokeColor("pink")} className="w-4 h-4 rounded-full bg-pink-400"></button>
                  <button onClick={()=>handleStrokeColor("black")} className="w-4 h-4 rounded-full bg-black"></button>
                </div>
              </div>
              <button onClick={closeDrawModal} className="text-red-600">
                Close
              </button>
            </div>
            <hr className="w-full dark:text-gray-500 text-gray-800 my-2" />
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
