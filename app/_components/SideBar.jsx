'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

// * profile image
import profile from "../../public/profile.jpg";

// * icons from react icons
import { CgNotes } from "react-icons/cg";
import { FaRegBell } from "react-icons/fa";
import { IoArchiveOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";
import { FaBars } from "react-icons/fa"; // Hamburger icon for mobile

function SideBar() {
  const [userID, setUserID] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar open/close for mobile

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get('http://localhost:3009/')
      .then(res => {
        if (res.status === 200) {
          setUserID(res.data.id);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:3009/logout').then(res => {
      if (res.status === 200) {
        route.push('/login');
      }
    });
  };

  const route = useRouter();

  return (
    <div className="dark">
      {/* Hamburger Menu for small screens */}
      <div className="z-10 w-0 md:hidden flex items-center absolute left-5 top-5 justify-between dark:bg-[#1E201E]">
        <button
          className="text-gray-700 dark:text-[#F39F5A] text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${
    isOpen ? 'block' : 'hidden'
}  md:flex md:flex-col md:justify-between fixed md:static inset-y-0 left-0 z-50 md:z-auto dark h-screen bg-orange-100 dark:bg-[#1E201E] p-5 text-center w-[250px] md:w-full items-center dark:text-[#F39F5A] text-gray-700 transition-transform duration-500 ease-in-out`}>
    {/* Account Section */}
    <div className="account md:mt-4 mt-10 flex flex-col items-center">
          <div className="profile py-2">
            <Image
              src={profile}
              alt="profile"
              className="border-2 border-[#F39F5A] h-24 w-24 rounded-full"
            />
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Hassam Ali</div>
            <div className="text-sm text-gray-400">Premium</div>
          </div>
        </div>

  {/* Main Section */}
  <div className="main flex flex-col items-start justify-center  md:mt-2 mt-24 w-full flex-grow">
    <div className="side-bar-labels mb-2"> {/* Add margin bottom */}
      <CgNotes />
      <p onClick={() => route.push(`/${userID}/home/notes`)}>Notes</p>
    </div>
    <div className="side-bar-labels mb-2">
      <IoArchiveOutline />
      <p onClick={() => route.push(`/${userID}/home/archives`)}>Archives</p>
    </div>
    <div className="side-bar-labels mb-2">
      <BsPeople />
      <p onClick={() => route.push(`/${userID}/home/space`)}>Space</p>
    </div>
  </div>

  {/* Settings Section */}
  <div className="settings flex flex-col justify-between items-start w-full mb-8 mt-10 md:mt-0"> {/* Add margin bottom */}
    <hr className="w-full border-t border-gray-300 dark:border-[#F39F5A] my-2" />
    <div className="side-bar-labels mb-2"> {/* Add margin bottom */}
      <IoSettingsOutline />
      <p>Settings</p>
    </div>
    <div className="side-bar-labels mb-2">
      <FaPowerOff />
      <p onClick={handleLogout}>Logout</p>
    </div>
  </div>

  {/* Developer Section */}
  <div className="Company-name items-center justify-center flex my-2 dark:text-[#F39F5A] text-gray-700 text-xs absolute md:left-6 bottom-2"> {/* Adjusted margin */}
    Developed by Soma Tusi
  </div>
</div>


      {/* Backdrop for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default SideBar;
