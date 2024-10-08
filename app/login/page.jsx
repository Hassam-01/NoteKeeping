'use client';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import ST from './ST.png';
const LoginPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const route = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3009/login', values)
      .then(res => {
        if (res.status === 200) {
          route.push(`/${res.data.userId}/home/`);
        }
      })
      .then(err => console.log(err));
  };

  return (
    <div className="dark flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4">
      <div className="bg-gray-800 mt-8 text-[#F39F5A] p-8 rounded-lg shadow-2xl flex flex-col md:flex-row max-w-4xl mx-auto w-full transform hover:scale-105 transition-transform duration-300">
        {/* Left Section with Graphic */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 border-b md:border-r md:border-b-0 border-gray-700">
          <div className="flex items-center justify-center mb-6">
            <img
              src="./ST.png"
              alt="Brand Logo"
              className="w-36 h-36 mb-4 rounded-full shadow-lg border-2 border-gray-700"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-[#F39F5A]">Note Keeping</h1>
            <p className="text-gray-400 mt-2 italic">"Let's talk Ease!"</p>
          </div>
        </div>

        {/* Right Section with Login Form */}
        <div className="w-full md:w-1/2 bg-gray-900 p-8 rounded-lg md:rounded-r-lg">
          <h2 className="text-4xl font-extrabold mb-4 text-[#F39F5A]">Login</h2>
          <p className="mb-6 text-gray-400">Welcome onboard with us!</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-[#F39F5A] transition"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-[#F39F5A] transition"
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-3 bg-[#2A2A2A] hover:bg-[#111111] dark:bg-[#F39F5A] dark:hover:bg-[#F3801B] rounded text-white dark:text-black font-bold shadow-md hover:shadow-xl transition-all duration-300"
              >
                LOGIN
              </button>
            </div>
          </form>
          <div className="flex justify-between items-center text-sm mt-4">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-300 transition"
            >
              Forgot Password?
            </a>
            <span>
              New to NoteKeeping?{' '}
              <button
                onClick={() => route.push('../register')}
                className="text-xs text-[#F39F5A] hover:underline dark:hover:text-[#F3801B] transition"
              >
                Register Here
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
