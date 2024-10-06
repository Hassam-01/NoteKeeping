function Archives() {
    const archives = [
      { id: 1, title: "Team Sync - September", date: "Sep 20, 2024" },
      { id: 2, title: "Client Meeting - Project Alpha", date: "Aug 15, 2024" },
      { id: 3, title: "Weekly Review - Sprint 12", date: "Jul 30, 2024" },
      { id: 4, title: "Tech Conference Recap", date: "Jun 25, 2024" },
    ];
  
    return (
      <div className="dark h-screen dark:text-white dark:bg-[#0c0c0c] bg-orange-50 flex justify-center">
        <div className="flex flex-col w-full max-w-4xl items-center text-center justify-start my-5 p-6 gap-8">
          {/* Header Section */}
          <div className="flex flex-col gap-5 mb-8">
            <h1 className="text-5xl font-extrabold tracking-wide text-[#c56f28] dark:text-[#ffa45b]">
              ARCHIVES
            </h1>
            <h3 className="text-2xl font-semibold text-[#cf7b36] dark:text-[#ffcc91]">
              PAST MEETINGS & RECORDINGS
            </h3>
          </div>
  
          {/* Archives List Section */}
    
  
          {/* Divider */}
          <div className="border-t-2 border-orange-200 dark:border-gray-800 w-full my-8"></div>
  
          {/* Footer Section */}
          <div className="mt-4">
            <p className="text-md text-[#c56f28] dark:text-[#ffa45b]">Space by ST NOTES</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Archives;
  