"use client";

import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { IoArchiveOutline } from "react-icons/io5";

function NoteCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  function getRandomColor() {
    const colors = [
      "#FF5733", // Red
      "#33FF57", // Green
      "#3357FF", // Blue
      "#FF33A1", // Pink
      "#FFBD33", // Orange
      "#33FFF5", // Cyan
      "#8D33FF", // Purple
      "#FFC433", // Yellow
      "#FF33D4", // Magenta
      "#33FFAC", // Mint
    ];
  
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  return (
    <div onClick={toggleExpand} className="cursor-pointer">
      <div   className={`flex flex-col border-2 w-64 max-w-xs bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden`}
  style={{ borderColor: getRandomColor() }}>
        {/* Title Bar */}
        <div>
          <div className="flex justify-between items-center p-4 bg-blue-100 dark:bg-gray-900">
            <h3 className="text-lg font-semibold">Title</h3>
            <div className="flex gap-2">
              <div className="border-2 border-red-600 rounded-full flex items-center text-center p-2">
                <RiDeleteBin5Line className="text-red-600" />
              </div>
              <div className="border-2 border-yellow-500 rounded-full flex items-center text-center p-2">
                <GrEdit className="text-yellow-500" />
              </div>
              <div className="border-2 border-green-700 rounded-full flex items-center text-center p-2">
                <IoArchiveOutline className="text-green-700" />
              </div>
            </div>
          </div>
          <hr className="w-full dark:text-gray-500 text-gray-800 my-2" />
        </div>
        {/* Body */}
        <div
          className={`p-4 transition-max-height duration-500 ease-in-out ${
            isExpanded ? "max-h-full" : "max-h-24"
          } overflow-hidden`}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            iure laborum autem maxime doloribus, qui dolor asperiores aut a
            nemo, debitis rem voluptatem enim perferendis exercitationem itaque
            quidem, fuga facilis delectus! In voluptatibus cum non dolor
            perferendis cupiditate quasi id nesciunt. Facilis, ducimus quos
            dolorum illo quaerat beatae explicabo minus.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
