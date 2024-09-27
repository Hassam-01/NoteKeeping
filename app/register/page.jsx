'use client';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const RegisterPage = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // New state to check if passwords match
  const [values, setValues] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });

  const route = useRouter();

  const checkPassword = (password) => {
    setPasswordsMatch(values.password === password); // Set passwordsMatch based on equality check
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      alert('Passwords do not match!');
      return;
    }
    axios.post('http://localhost:3009/register', values)
    .then(res=>{
        if(res.status === 200){
            route.push(`/${res.userId}/home/`);
        }
    })
    .then(err=>console.log(err))

};

  return (
    <div className="dark flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <div className="bg-gray-800 text-[#F39F5A] p-8 rounded-lg shadow-2xl flex max-w-5xl mx-auto w-full transform  transition-transform duration-300">
        {/* Left Section with Graphic */}
        <div className="w-1/2 flex flex-col items-center justify-center p-6 border-r border-gray-700">
          <div className="flex items-center justify-center mb-6">
            <img
              src=""
              alt="Person Graphic"
              className="w-36 h-36 mb-4 rounded-full shadow-lg border-2 border-gray-700"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-[#F39F5A]">Note Keeping</h1>
            <p className="text-gray-400 mt-2 italic">"Let's talk Ease!"</p>
          </div>
        </div>

        {/* Right Section with Register Form */}
        <div className="w-1/2 bg-gray-900 p-8 rounded-r-lg">
          <h2 className="text-4xl font-extrabold mb-6 text-[#F39F5A] text-center">Register</h2>
          <p className="mb-8 text-gray-400 text-center">Join our community today!</p>

          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* First Name */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-[#F39F5A] transition"
                  value={values.first_name}
                  onChange={(e) => setValues({...values, first_name: e.target.value})}
                />
              </div>
              {/* Last Name */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-[#F39F5A] transition"
                  value={values.last_name}
                  onChange={(e) => setValues({...values, last_name: e.target.value})}
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-[#F39F5A] transition"
                  value={values.email}
                  onChange={(e) => setValues({...values, email: e.target.value})}
                />
              </div>
              {/* Password */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-[#F39F5A] transition"
                  value={values.password}
                  onChange={(e) => setValues({...values, password: e.target.value})}
                />
              </div>
              {/* Confirm Password */}
              <div className="col-span-2">
                <label className="block text-gray-400 text-sm mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-4 transition ${
                    passwordsMatch
                      ? 'focus:ring-[#F39F5A]'
                      : 'border-red-500 focus:ring-red-500' // Red border when passwords don't match
                  }`}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    checkPassword(e.target.value);
                  }}
                />
                {!passwordsMatch && (
                  <p className="text-red-500 text-sm mt-1">Passwords do not match!</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <button
                type="submit"
                disabled={!passwordsMatch} // Disable button if passwords don't match
                className={`w-full py-3 bg-[#2A2A2A] hover:bg-[#111111] dark:bg-[#F39F5A] dark:hover:bg-[#F3801B] rounded text-white dark:text-black font-bold shadow-md hover:shadow-xl transition-all duration-300 ${
                  !passwordsMatch ? 'opacity-50 cursor-not-allowed' : ''
                }`} // Make button inactive when disabled
              >
                REGISTER
              </button>
            </div>
          </form>

          <div className="flex justify-between items-center text-sm mt-4">
            <a href="/login" className="text-gray-400 hover:text-gray-300 transition" onClick={()=> route.push("../login")}>
              Already have an account? Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
