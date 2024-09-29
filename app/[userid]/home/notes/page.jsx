"use client";
import { setNotes } from "../../../_store/features/notes/noteSlice";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDraw } from "react-icons/md";
import { Spinner } from "@material-tailwind/react";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../../_store/hooks";
import { useEffect, useState } from "react";

import Card from "../../../_components/NoteCard";
import { useParams } from "next/navigation";
import axios from "axios";

function page() {
  const dispatch = useAppDispatch();
  const [id, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  // First useEffect to get the ID
  useEffect(() => {
    axios
      .get("http://localhost:3009/")
      .then((res) => {
        if (res.status === 200) {
          console.log("ID received:", res.data.id);
          setUserID(res.data.id); // Setting the ID here
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Second useEffect to fetch notes only after ID is set
  useEffect(() => {
    if (!id) return; // If id is null or undefined, do not proceed

    console.log("Fetching notes for ID:", id); // Log the ID being used
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`http://localhost:3009/${id}/home/notes`);
        const data = response.data;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
        dispatch(setNotes(data.notes));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes(); // Call fetchNotes only when id is available
  }, [id, dispatch]); // Dependency array includes `id` and `dispatch`

  const notes = useAppSelector((state) => state.note.notes);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const openModal = () => {
    setModalTitle("");
    setModalBody("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateNote = () => {
    openModal();
  };

  const handleDrawNote = () => {
    openModal();
  };

  const saveNote = async () => {
    console.log(modalTitle, modalBody);
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

  return (
    <div className="dark h-screen">
      <div className="dark:bg-[#0c0c0c] h-full bg-orange-100 dark:text-white text-black p-10 flex flex-col relative">
        <div className="rounded-full border-[#F39F5A] hidden md:flex mt-2 mb-5 justify-end">
          <div className="flex gap-2">
            <IoIosAddCircleOutline className="edit-tools" onClick={handleCreateNote} />
            <MdOutlineDraw className="edit-tools" onClick={handleDrawNote} />
          </div>
        </div>
        <div className="lg:grid-cols-4 md:grid-cols-3 grid-cols-2 grid gap-y-5">
          {loading ? (
            <div className="fixed top-[40%] left-[60%]">
              <Spinner color="white" size="5xl" />
            </div>
          ) : notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.note_id}>
                <Card
                  title={note.title}
                  initialBody={note.text}
                  date={note.date}
                  noteId={note.note_id}
                />
              </div>
            ))
          ) : (
            <p>No notes available</p>
          )}
        </div>
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
                onClick={() => {
                  saveNote();
                }}
              >
                Save
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default page;
