'use client';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  return (
    <div className="dark flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-[#F39F5A]">Welcome to Note Keeping</h1>
        <p className="text-gray-400 mt-2">Your ultimate solution for organizing thoughts and ideas.</p>
      </header>

      <section className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-[#F39F5A] mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-[#F39F5A]">Text Notes</h3>
            <p className="text-gray-400">Easily create and manage your notes in a simple text format.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-[#F39F5A]">Draw Your Ideas</h3>
            <p className="text-gray-400">Use our drawing tools to sketch your thoughts and ideas visually.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-[#F39F5A]">Meetings</h3>
            <p className="text-gray-400">Collaborate with others in real-time meetings to discuss your notes.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-[#F39F5A] mb-4">Subscription Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-[#F39F5A]">BASIC</h3>
            <p className="text-gray-400">Free plan for casual users.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-[#F39F5A]">STANDARD</h3>
            <p className="text-gray-400">Advanced features for serious note-takers.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-[#F39F5A]">PREMIUM</h3>
            <p className="text-gray-400">All features for power users.</p>
          </div>
        </div>
      </section>

      <footer className="text-center">
        <button
          onClick={() => router.push('/login')}
          className="mx-2 py-3 px-6 bg-[#F39F5A] text-white rounded-lg font-bold hover:bg-[#F3801B] transition duration-300"
        >
          LOGIN
        </button>
        <button
          onClick={() => router.push('/register')}
          className="mx-2 py-3 px-6 bg-[#2A2A2A] text-white rounded-lg font-bold hover:bg-[#111111] transition duration-300"
        >
          SIGN UP
        </button>
      </footer>
    </div>
  );
};

export default Home;
