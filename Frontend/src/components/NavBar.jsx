// src/components/Navbar.jsx

import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md bg-white/70 shadow-md sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-gray-800">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#7472E0]">
          ROOM<span className="text-yellow-400">BUDDY</span>
        </h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm md:text-base font-medium">
          <li><a href="/" className="hover:text-[#7472E0] transition">Home</a></li>
          <li><a href="/contact" className="hover:text-[#7472E0] transition">Contact Us</a></li>
          <li><a href="/about" className="hover:text-[#7472E0] transition">About</a></li>
          <li>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-full bg-[#7472E0] text-white hover:brightness-110 shadow-md transition"
            >
              LogIn
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2 rounded-full border border-[#7472E0] text-[#7472E0] hover:bg-[#7472E0] hover:text-white transition shadow-md"
            >
              Sign Up
            </button>
          </li>
        </ul>

        {/* Mobile Nav */}
        <div className="flex items-center md:hidden gap-3">
          <button onClick={() => navigate("/login")} className="text-[#7472E0] font-semibold text-sm">Sign In</button>
          <button onClick={() => navigate("/signup")} className="text-[#7472E0] font-semibold text-sm border px-3 py-1 rounded-full border-[#7472E0]">Sign Up</button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl text-[#7472E0] z-50">
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Sliding Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 mt-16 flex flex-col gap-4 text-sm font-medium text-gray-800">
          <a href="/" onClick={() => setMenuOpen(false)} className="hover:text-[#7472E0]">Home</a>
          <a href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-[#7472E0]">Contact Us</a>
          <a href="/about" onClick={() => setMenuOpen(false)} className="hover:text-[#7472E0]">About</a>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
