import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cpu } from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        {/* Left: Logo */}
        <div className="flex justify-start">
          <Link
            to="/"
            className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 hover:scale-110 transition-transform"
          >
            <Cpu size={28} />
          </Link>
        </div>

        {/* Middle: Brand Name */}
        <div className="flex justify-center">
          <Link to="/" className="font-black text-3xl tracking-tighter text-slate-900 group">
            Smart<span className="text-primary group-hover:text-blue-700 transition-colors">Recruiter</span>
          </Link>
        </div>

        {/* Right: Nav Buttons */}
        <div className="flex justify-end items-center gap-4">
          <Link
            to="/jobs"
            className="px-5 py-2.5 text-sm font-black text-slate-600 hover:text-primary transition-colors border-2 border-transparent hover:border-primary/10 rounded-xl"
          >
            Job List
          </Link>
          <Link
            to="/hr/login"
            className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-black shadow-[0_10px_20px_-5px_rgba(37,99,235,0.3)] active:scale-95"
          >
            HR Login
          </Link>
        </div>
      </div>
    </nav>
  );
};