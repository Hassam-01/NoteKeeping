import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoArchiveOutline } from "react-icons/io5";
import Modal from "react-modal";
import { ReactSketchCanvas } from "react-sketch-canvas";
import axios from "axios";

if (typeof window !== "undefined") {
  Modal.setAppElement(document.body);
}

function DrawingPane({
  title,
  initialBody,
  date,
  drawing_id,
  user_id,
  drawing_img,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [body, setBody] = useState(initialBody);
  const [strokeColor, setStrokeColor] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState(4); // Adding strokeWidth state
  const [exportedImage, setExportedImage] = useState(drawing_img); // Image for both card and modal
  const [eraseMode, setEraseMode] = useState(false);

  const userID = user_id;
  const sketchRef = useRef(null); // Ref for the canvas

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      body: initialBody,
    },
  });

  useEffect(() => {
    setValue("body", body);
  }, [body, setValue]);

  const handleCanvasChange = useCallback(
    debounce((updatedPaths) => {
      if (updatedPaths && updatedPaths.length) {
        setBody(JSON.stringify(updatedPaths)); // Update paths
      }
    }, 200), // Debounce time of 200ms
    []
  );

  useEffect(() => {
    setTimeout(() => {
      if (isExpanded && sketchRef.current) {
        try {
          const parsedPaths = Array.isArray(initialBody)
            ? initialBody
            : JSON.parse(initialBody);
          if (Array.isArray(parsedPaths)) {
            sketchRef.current.clearCanvas(); // Clear the canvas
            sketchRef.current.loadPaths(parsedPaths); // Load the paths
          }
        } catch (error) {
          console.error("Error parsing initial body:", error);
        }
      }
    }, 500); // Small delay to ensure the modal and canvas are fully rendered
  }, [isExpanded, initialBody, sketchRef]);

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  const handleStrokeColor = (color) => {
    setEraseMode(false); 
    setStrokeColor(color);
    setStrokeWidth(4); // Set back to normal stroke width when drawing
  };

  const handleErase = () => {
    setEraseMode(!eraseMode);
    sketchRef.current?.eraseMode(eraseMode); 
  };

  const onSubmit = async (data) => {
    setBody(data.body); // Update local state

    await updateDrawing(drawing_id); // Ensure update is successful
    await exportCanvasToImage(); // Export image after the update

    toggleExpand(); // Now toggle the modal after updates
    window.location.reload();
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = async () => {
    try {
      await fetch(
        `http://localhost:3009/${userID}/home/notes/drawing/${drawing_id}`,
        {
          method: "DELETE",
        }
      );
      toggleExpand(); // Close modal on delete
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleArchive = () => {
    // Implement archive functionality if needed
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const options = { month: "short", day: "numeric" };

    if (date.getFullYear() !== now.getFullYear()) {
      options.year = "numeric";
    }

    return date.toLocaleDateString(undefined, options);
  };

  const updateDrawing = async (drawing_id) => {
    try {
      const paths = await sketchRef.current.exportPaths(); // Export paths directly
      const image = await sketchRef.current.exportImage("png");
      const base64Image = image.split(",")[1];

      const response = await axios.put(
        `http://localhost:3009/${userID}/home/notes/drawing/${drawing_id}`,
        {
          title: title,
          drawing: paths,
          drawing_img: base64Image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const exportCanvasToImage = async () => {
    if (sketchRef.current) {
      try {
        const image = await sketchRef.current.exportImage("jpeg");
        setExportedImage(image); // Set the exported image to state
      } catch (error) {
        console.error("Error exporting image:", error);
      }
    }
  };

  return (
    <div className="dark">
      <div onClick={toggleExpand} className="cursor-pointer">
        <div className="flex flex-col border-2 md:w-64 max-w-xs md:h-72 w-32 h-36 dark:border-[#F39F5A] bg-white dark:bg-[#28282B] rounded-lg shadow-md relative">
          <div>
            <div className="flex justify-between items-center p-2 md:p-4 bg-blue-100 dark:bg-[#28282B]">
              <h3 className="text-md md:text-lg font-semibold">{title}</h3>
            </div>
          </div>
          <div className="p-4 transition-max-height duration-500 ease-in-out overflow-hidden">
            {exportedImage ? (
              <img
                src={exportedImage}
                alt="Drawing"
                className="h-16 md:h-4/6 w-full object-cover"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            ) : (
              <p>No image available</p>
            )}
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
        className="modal-content dark w-full max-w-lg p-4 dark:bg-gray-900 bg-white rounded-lg shadow-md mx-auto"
        overlayClassName="modal-overlay"
      >
        <div className="flex flex-col dark:text-white text-black">
          <div className="flex justify-between items-center p-4 bg-blue-100 dark:bg-gray-900">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="flex gap-2">
              <div className="border-2 border-red-600 rounded-full flex items-center text-center p-2 cursor-pointer">
                <RiDeleteBin5Line
                  className="text-red-600 dark:hover:bg-[#2A2A2A] rounded-full"
                  onClick={handleDelete}
                />
              </div>
              <div className="border-2 border-green-700 rounded-full flex items-center text-center p-2 cursor-pointer">
                <IoArchiveOutline
                  className="text-green-700 dark:hover:bg-[#2A2A2A] rounded-full"
                  onClick={handleArchive}
                />
              </div>
            </div>
          </div>
          <hr className="w-full dark:text-gray-500 text-gray-800 my-2" />

          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <div className="flex justify-between">
              <div className="flex gap-2 my-2">
                <button
                  type="button"
                  onClick={() => handleStrokeColor("red")}
                  className="w-4 h-4 rounded-full bg-red-700"
                ></button>
                <button
                  type="button"
                  onClick={() => handleStrokeColor("yellow")}
                  className="w-4 h-4 rounded-full bg-yellow-600"
                ></button>
                <button
                  type="button"
                  onClick={() => handleStrokeColor("blue")}
                  className="w-4 h-4 rounded-full bg-blue-700"
                ></button>
                <button
                  type="button"
                  onClick={() => handleStrokeColor("green")}
                  className="w-4 h-4 rounded-full bg-green-500"
                ></button>
                <button
                  type="button"
                  onClick={() => handleStrokeColor("pink")}
                  className="w-4 h-4 rounded-full bg-pink-400"
                ></button>
                <button
                  type="button"
                  onClick={() => handleStrokeColor("black")}
                  className="w-4 h-4 rounded-full bg-black"
                ></button>
              </div>
              <div className="flex items-center">
                <h3 className="cursor-pointer" onClick={handleErase}>Erase</h3>
              </div>
            </div>

            <ReactSketchCanvas
              ref={sketchRef}
              style={{
                border: "1px solid #000",
                width: "100%",
                height: "300px",
              }}
              strokeWidth={strokeWidth} // Dynamic stroke width
              strokeColor={strokeColor} // Dynamic stroke color
              onChange={handleCanvasChange}
            />

            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-[#bf6e2c] text-white rounded-lg hover:bg-[#9b6436]"
            >
              Save
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default DrawingPane;
