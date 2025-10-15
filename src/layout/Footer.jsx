import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 relative overflow-hidden border-t border-gray-700">
      {/* Nền lưới công nghệ */}
      <div className="absolute inset-0 opacity-15">
        <div className="hex-grid"></div>
      </div>

      <div className="container mx-auto px-8 text-center relative z-10">
        {/* Logo và slogan */}
        <div className="mb-6 flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 tracking-wide">
              CodeFarm
            </span>
            <span className="text-2xl">🌿</span>
          </div>
          <p className="text-gray-400 text-sm italic">
            Cultivating code with creativity & innovation.
          </p>
        </div>

        {/* Liên kết nhanh */}
        <div className="flex justify-center space-x-8 mb-6 text-base font-medium">
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
        </div>

        {/* Mạng xã hội */}
        <div className="flex justify-center space-x-8 mb-8">
          <a
            href="#"
            className="hover:text-blue-400 transition-transform transform hover:scale-125 text-2xl"
            title="GitHub"
          >
            🐙
          </a>
          <a
            href="#"
            className="hover:text-blue-400 transition-transform transform hover:scale-125 text-2xl"
            title="Twitter"
          >
            🐦
          </a>
          <a
            href="#"
            className="hover:text-blue-400 transition-transform transform hover:scale-125 text-2xl"
            title="LinkedIn"
          >
            💼
          </a>
          <a
            href="#"
            className="hover:text-green-400 transition-transform transform hover:scale-125 text-2xl"
            title="Email"
          >
            📧
          </a>
        </div>

        {/* Bản quyền */}
        <div className="border-t border-gray-700 pt-6 text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">CodeFarm</span>. All
            rights reserved.
          </p>
        </div>
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
    </footer>
  );
};

export default Footer;
