"use client";
import { setNotes } from "@/app/_store/features/notes/noteSlice";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDraw } from "react-icons/md";
import { Spinner } from "@material-tailwind/react";
import Modal from "react-modal";

import { useAppDispatch, useAppSelector } from "@/app/_store/hooks";
import { useEffect, useState } from "react";

import Card from "@/app/_components/NoteCard";

function page() {
  //   const userID = useAppSelector((state) => state.userId.userID);
  const id = 3;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`http://localhost:3009/home/${id}/notes`);
        const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 3000));
        dispatch(setNotes(data.notes));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [dispatch, id]);

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

  const saveNote = () => {
    console.log(modalTitle, modalBody);
   fetch(`http://localhost:3009/home/${id}/notes/post`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: modalTitle, text: modalBody }),
  })
  closeModal();
  }

  return (
    <div className="dark h-screen">
      <div className="dark:bg-[#0c0c0c] h-full bg-orange-100 dark:text-white text-black p-10 flex flex-col relative">
        <div className="rounded-ful dborder-[#F39F5A] hidden md:flex mt-2 mb-5 justify-end">
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
                  // Handle save note logic here
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
