import React from "react";

const Header = () => {
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
