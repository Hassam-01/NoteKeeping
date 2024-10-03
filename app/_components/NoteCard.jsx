import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoArchiveOutline } from "react-icons/io5";
import Modal from "react-modal";

if (typeof window !== "undefined") {
  Modal.setAppElement(document.body);
}

function NoteCard({ title, initialBody, date, noteId, user_id }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [body, setBody] = useState(initialBody);
  const userID = user_id;

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      body: initialBody,
    },
  });

  useEffect(() => {
    setValue("body", body);
  }, [body, setValue]);

  const onSubmit = (data) => {
    setBody(data.body);
    toggleExpand();
    updateNote(noteId, data.body);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    fetch(`http://localhost:3009/${userID}/home/notes/${noteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const handleArchive = () => {};

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const updateNote = (noteId, updatedBody) => {
    fetch(`http://localhost:3009/${userID}/home/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, text: updatedBody }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div onClick={toggleExpand} className="cursor-pointer">
        <div className="flex flex-col border-2 md:w-64 max-w-xs md:h-72 w-32 h-36 dark:border-[#F39F5A] bg-white dark:bg-[#28282B] rounded-lg shadow-md relative">
          <div>
            <div className="flex justify-between items-center p-2 md:p-4 bg-blue-100 dark:bg-[#28282B]">
              <h3 className="text-md md:text-lg font-semibold">{title}</h3>
            </div>
          </div>
          <div className="p-4 transition-max-height duration-500 ease-in-out overflow-hidden">
            <p>{body}</p>
          </div>
          <div className="my-2 mx-2 text-xs text-gray-500 flex absolute bottom-3">
            <p className="text-xs px-2">{formatDate(date)}</p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isExpanded}
        onRequestClose={toggleExpand}
        contentLabel="Expanded Note"
        className="modal-content min-w-[600px] dark"
        overlayClassName="modal-overlay"
      >
        <div className="flex flex-col border-2 w-full max-w-2xl dark:text-white text-black bg-white dark:bg-gray-900 rounded-lg shadow-md">
          <div>
            <div className="flex justify-between items-center p-4 bg-blue-100 dark:bg-gray-900">
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className="flex gap-2">
                <div className="border-2 border-red-600 rounded-full flex items-center text-center p-2">
                  <RiDeleteBin5Line className="text-red-600 dark:hover:bg-[#2A2A2A] rounded-full" onClick={handleDelete} />
                </div>
                <div className="border-2 border-green-700 rounded-full flex items-center text-center p-2">
                  <IoArchiveOutline className="text-green-700 dark:hover:bg-[#2A2A2A] rounded-full" onClick={handleArchive} />
                </div>
              </div>
            </div>
            <hr className="w-full dark:text-gray-500 text-gray-800 my-2" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <textarea
              name="body"
              id="bodytext"
              className="w-full h-32 bg-gray-100 dark:bg-gray-800 dark:text-white p-2 rounded-lg"
              {...register("body")}
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-[#bf6e2c] text-white rounded-lg hover:bg-[#9b6436]"
            >
              Save
            </button>
          </form>

          <div className="my-2 mx-2 text-xs text-gray-500 flex">
            Last Modified:
            <p className="text-xs px-2">{formatDate(date)}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default NoteCard;
