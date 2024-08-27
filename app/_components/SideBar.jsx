import Image from "next/image";

// * profile image
import profile from "../../public/profile.jpg";

// * icons from react icons
import { CgNotes } from "react-icons/cg";
import { FaRegBell } from "react-icons/fa";
import { IoArchiveOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";

function SideBar() {
  return (
    <div className="dark h-full flex flex-col justify-between">
      <div className="dark:bg-[#1E201E] bg-orange-100 p-5 flex flex-col text-center h-full w-full items-center dark:text-[#F39F5A] text-gray-700">
        {/* Account Section */}
        <div className="account mt-10 flex flex-col items-center">
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
        <div className="main flex flex-col items-start mt-16 w-full">
          
          <div className="side-bar-labels">
            <CgNotes />
            <p>Notes</p>
          </div>
          <div className="side-bar-labels">
            <FaRegBell />
            <p>Reminders</p>
          </div>
          <div className="side-bar-labels">
            <IoArchiveOutline />
            <p>Archives</p>
          </div>
          <div className="side-bar-labels">
            <BsPeople />
            <p>Space</p>
          </div>
        </div>
        {/* Settings Section */}
        <div className="settings flex flex-col items-start mt-16 w-full">
          <hr className="w-full border-t border-gray-300 dark:border-[#F39F5A] my-2" />
          <div className="side-bar-labels">
            <IoSettingsOutline />
            <p>Settings</p>
          </div>
          <div className="side-bar-labels">
            <FaPowerOff />
            <p>Logout</p>
          </div>
        </div>
        {/* Developer Section */}
        <div className="Company-name dark:text-[#F39F5A] text-gray-700 text-xs absolute left-10 bottom-1 ">
          Developed by Soma Tusi
        </div>
      </div>
    </div>
  );
}

export default SideBar;
