import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HERO_IMG from "../assets/hero-img.webp";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Modal from "../components/Modal"; // assuming you already have a Modal component

const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(true);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    navigate("/create");
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 via-white to-green-50 text-gray-800">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-green-500">
          Resume<span className="text-gray-700">Builder</span>
        </h1>
        <button
          onClick={() => setOpenAuthModal(true)}
          className="px-6 py-2.5 text-sm md:text-base font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-green-400 text-white shadow-md hover:scale-105 transition-transform duration-300"
        >
          Login / Sign Up
        </button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-10 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Build Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-green-400 animate-pulse">
              Dream Resume
            </span>{" "}
            in Minutes 🚀
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Create a professional, eye-catching resume effortlessly. Customize
            templates, preview live, and download instantly!
          </p>
          <button
            onClick={handleCTA}
            className="mt-4 px-8 py-3 rounded-full text-white text-sm font-semibold bg-black hover:bg-gray-900 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </button>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-indigo-200 to-green-200 opacity-30 rounded-full"></div>
          <img
            src={HERO_IMG}
            alt="Hero"
            className="w-[85%] relative z-10 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-extrabold mb-12 text-gray-900">
          ✨ Features That Make You Shine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Easy Editing",
              desc: "Update your resume live with instant preview and smart suggestions.",
              icon: "🖊️",
            },
            {
              title: "Beautiful Templates",
              desc: "Pick from sleek, modern templates tailored for professionals.",
              icon: "🎨",
            },
            {
              title: "One-Click Export",
              desc: "Download your resume as a high-quality PDF instantly.",
              icon: "⚡",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm bg-gray-50 text-gray-500 border-t border-gray-100">
        Made with 💖 by <span className="font-medium">Rajat & Aniket</span> — Happy Coding!
      </footer>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div className="p-4">
          {currentPage === "login" ? (
            <Login setCurrentPage={setCurrentPage} />
          ) : (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
