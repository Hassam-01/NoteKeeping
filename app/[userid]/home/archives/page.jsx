import SideBar from "../../../_components/SideBar";

function Archives() {
  
    return (
      <div className="dark h-screen dark:text-white dark:bg-[#0c0c0c] bg-orange-50 flex ">
        <div>
        <SideBar/>
      </div>
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col w-full max-w-4xl items-center text-center justify-start my-5 p-6 gap-8">
          {/* Header Section */}
          <div className="flex flex-col gap-5 mb-8">
            <h1 className="text-5xl font-extrabold tracking-wide text-[#c56f28] dark:text-[#ffa45b]">
              ARCHIVES
            </h1>
            <h3 className="text-lg font-semibold text-[#cf7b36] dark:text-[#ffcc91]">
              NOTES AND DRAWINGS
            </h3>
          </div>
  
          {/* Archives List Section */}
    
  
          {/* Divider */}
          <div className="border-t-2 border-orange-200 dark:border-gray-800 w-full my-8"></div>
  
          {/* Footer Section */}
          <div className="mt-4">
            <p className="text-md text-[#c56f28] dark:text-[#ffa45b]">ST NOTES</p>
          </div>
        </div>
      </div>
      </div>
    );
  }
  
  export default Archives;
  