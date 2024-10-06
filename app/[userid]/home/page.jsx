"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../_components/SideBar";

function Home() {
  const [userID, setUserID] = useState(null);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3009/verifyUser")
      .then((res) => {
        if (res.status === 200) {
          setUserID(res.data.id);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex">
      <div className="h-full">
        <SideBar />
      </div>
      <div className="flex justify-center w-full">
        <div className="flex flex-col justify-center items-center mt-8">
          <header className="text-center mb-10">
            <h1 className="text-5xl font-extrabold text-[#F39F5A]">
              Features of Note Keeping
            </h1>
            <p className="text-gray-400 mt-2">
              Explore the powerful functionalities of our app!
            </p>
          </header>

          <section className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-[#F39F5A] mb-4">
              Notes Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-[#F39F5A]">
                  Draw & Write
                </h3>
                <p className="text-gray-400">
                  Create notes in various formats: type, draw, or doodle your
                  ideas!
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-[#F39F5A]">Edit Notes</h3>
                <p className="text-gray-400">
                  Easily edit your notes to refine your thoughts and ideas.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-[#F39F5A]">
                  Delete & Archive
                </h3>
                <p className="text-gray-400">
                  Remove unwanted notes or archive them for later reference.
                </p>
              </div>
            </div>
          </section>

          <section className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-[#F39F5A] mb-4">
              Archive Section
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#F39F5A]">
                Archive Your Notes
              </h3>
              <p className="text-gray-400">
                Keep your workspace tidy by archiving notes you no longer need
                immediately, but may want to refer to later.
              </p>
            </div>
          </section>

          <section className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-[#F39F5A] mb-4">
              Space for Meetings
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#F39F5A]">
                Join or Create Meetings
              </h3>
              <p className="text-gray-400">
                Easily set up meetings or join existing ones. Share your meeting
                ID with others to collaborate seamlessly!
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
