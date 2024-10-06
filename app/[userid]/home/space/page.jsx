"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { FiCopy } from "react-icons/fi"; // Icon for copy button
import axios from "axios";
import SideBar from "../../../_components/SideBar";

function Page() {
  const [roomId, setRoomId] = useState(null); // Store the room ID
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState(""); // Input state for joining room
  const [UserID, setUserID] = useState(null);

  const route = useRouter();

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const res = await axios.get("http://localhost:3009/verifyUser");
        if (res.status === 200) {
          setUserID(res.data.id);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserID();
  }, []);

  // Modal Close Handlers
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const closeJoinModal = () => {
    setIsJoinModalOpen(false);
  };

  // Create Meeting Handler
  const handleCreate = () => {
    const room = `${UserID}-${Math.random().toString(36).substring(2, 10)}`;
    setRoomId(room); // Set room ID
    setIsCreateModalOpen(true);
  };

  // Join Meeting Handler
  const handleJoin = () => {
    setIsJoinModalOpen(true);
  };

  // Copy Room ID to Clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId);
    alert("Space ID copied to clipboard!");
  };

  return (
    <div className="dark h-screen dark:text-white dark:bg-[#0c0c0c] bg-orange-50 flex">
      <div>
        <SideBar />
      </div>
      <div className="justify-center flex h-full w-full">
        <div className="flex flex-col items-center text-center justify-between my-5 p-6 gap-8 md:mt-4 mt-24">
          {/* Heading Section */}
          <div className="flex flex-col gap-5 mb-8">
            <h1 className="text-6xl font-extrabold tracking-wide text-[#c56f28] dark:text-[#ffa45b]">
              MEETING AT A GO
            </h1>
            <h3 className="text-3xl font-semibold text-[#cf7b36] dark:text-[#ffcc91]">
              SECURE AND RELIABLE
            </h3>
          </div>

          {/* Button Section */}
          <div className="flex gap-8">
            <button
              className="rounded-full py-3 px-6 bg-gradient-to-r from-[#e0904f] to-[#c56f28] text-sm text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={handleCreate}
            >
              CREATE SPACE
            </button>
            <button
              className="rounded-full py-3 px-6 bg-gradient-to-r from-[#e0904f] to-[#c56f28] text-sm text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={handleJoin}
            >
              JOIN SPACE
            </button>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-orange-200 dark:border-gray-800 w-full max-w-lg my-6"></div>

          {/* Footer Section */}
          <div className="mt-4">
            <p className="text-md text-[#c56f28] dark:text-[#ffa45b]">
              Space by ST NOTES
            </p>
          </div>
        </div>

        {/* Create Meeting Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onRequestClose={closeCreateModal}
          contentLabel="Create Space"
          className="modal-content dark bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out"
          overlayClassName="modal-overlay"
        >
          <div className="md:p-6 p-4 space-y-4">
            <h2 className="md:text-3xl text-lg  font-semibold text-center text-[#ffa45b]">
              Space Created
            </h2>
            <p className="text-lg text-center dark:text-white text-black flex flex-col md:flex-row">
              Your Space ID:{" "}
              <span className="font-bold text-[#ffcc91]">{roomId}</span>
            </p>
            <div className="flex  md:flex-row flex-col justify-center gap-4 mt-6">
              <button
                className="flex items-center justify-center rounded-md py-2 px-4 bg-gradient-to-r from-[#ffa45b] to-[#ffcc91] text-black font-medium transition-transform duration-300 ease-in-out hover:scale-105 shadow-md"
                onClick={copyToClipboard}
              >
                <FiCopy className="mr-2 " /> Copy Space ID
              </button>
              <button
                className="rounded-md py-2 px-4 bg-gradient-to-r from-[#ffcc91] to-[#ffa45b] text-black font-medium transition-transform duration-300 ease-in-out hover:scale-105 shadow-md"
                onClick={() =>
                  route.push(`/${UserID}/home/space/room/${roomId}`)
                }
              >
                Join Space
              </button>
            </div>
          </div>
        </Modal>

        {/* Join Meeting Modal */}
        <Modal
          isOpen={isJoinModalOpen}
          onRequestClose={closeJoinModal}
          contentLabel="Join Space"
          className="modal-content dark bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out"
          overlayClassName="modal-overlay"
        >
          <div className="p-6 space-y-4">
            <h2 className="md:text-3xl text-lg font-semibold text-center text-[#ffa45b]">
              Join a Space
            </h2>
            <input
              type="text"
              placeholder="Enter Space ID"
              className="md:p-3 md:placeholder:text-lg placeholder:text-sm p-1 border border-gray-600 rounded-md w-full text-center bg-[#2a2a2a] text-white focus:outline-none focus:ring focus:ring-orange-500 transition-shadow duration-300"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
            />
            <div className="flex justify-center mt-4">
              <button
                className="rounded-md py-2 px-6 bg-gradient-to-r from-[#ffa45b] to-[#ffcc91] text-black font-medium transition-transform duration-300 ease-in-out hover:scale-105 shadow-md md:text-lg text-sm"
                onClick={() =>
                  route.push(`/${UserID}/home/space/room/${joinRoomId}`)
                }
              >
                Join Space
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Page;
