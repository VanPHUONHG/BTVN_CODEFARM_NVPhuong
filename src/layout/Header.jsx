import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const nav = useNavigate();
  const Logout = () => {
    const confim = window.confirm("Dang xuat nhe!");
    if (confim) {
      localStorage.clear();
      sessionStorage.clear();
      toast.success("Đăng xuất thành công!");
      nav(`/auth/login`);
      return;
    }
  };
  return (
    <header className="bg-gray-900 text-white py-6 relative overflow-hidden shadow-lg">
      {/* Nền hexagonal grid công nghệ */}
      <div className="absolute inset-0 opacity-20">
        <div className="hex-grid"></div>
      </div>

      <div className="container mx-auto px-8 flex justify-between items-center relative z-10">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 tracking-wide">
            CodeFarm
          </span>
          <span className="text-3xl">🌿</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex space-x-10 text-lg font-medium">
          <a
            href="#home"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#services"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Services
          </a>
          <a
            href="#portfolio"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Portfolio
          </a>
          <a
            href="#contact"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Contact
          </a>
        </nav>
        <button
          onClick={Logout}
          className="relative px-5 py-2.5 flex items-center gap-2 border border-green-400 text-green-400 font-semibold rounded-full transition-all duration-300 hover:bg-green-500 hover:text-white hover:shadow-green-400/50 hover:shadow-md active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
            />
          </svg>
          Logout
        </button>
      </div>

      <style>{`
        .hex-grid {
          background-image: radial-gradient(
              circle at 25% 25%,
              #00ff88 2px,
              transparent 2px
            ),
            radial-gradient(circle at 75% 75%, #00ff88 2px, transparent 2px);
          background-size: 60px 60px;
          height: 100%;
          width: 100%;
        }
      `}</style>
    </header>
  );
};

export default Header;
