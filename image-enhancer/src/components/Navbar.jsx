import React, { useState, useEffect } from "react";
import { PiImagesBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { FaImages } from "react-icons/fa";
import GalleryPopup from "./GalleryPopup";
import Feedback from "./feedback";
import LoginPage from "./LoginPage";
import axios from "axios";

const Navbar = ({ count }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const location = useLocation();

  const active = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold underline underline-offset-4"
      : "text-black hover:text-blue-600 transition-colors duration-200";

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);
  const openLoginPage = () => setIsLoginPageOpen(true);
  const closeLoginPage = () => setIsLoginPageOpen(false);

  // Fetch images from database
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/images");
      setImages(response.data);
    } catch (err) {
      console.error("Error fetching saved images:", err);
    } finally {
      setLoading(false);
    }
  };

  const openGallery = () => {
    fetchImages();
    setShowGallery(true);
  };

  return (
    <div className="w-full py-4 px-3 shadow-lg shadow-gray-600 bg-white mb-4 flex flex-wrap justify-between items-center sticky top-0 z-50">
      {/* LEFT SIDE */}
      <div className="flex flex-wrap items-center gap-6">
        {/* Logo */}
        <h1 className="text-black text-2xl font-bold flex items-center gap-2">
          EnHanso <PiImagesBold className="text-blue-600" />
        </h1>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-5 text-lg">
          <Link to="/" className={active("/")}>Enhance</Link>
          <Link to="/remove-bg" className={active("/remove-bg")}>Remove BG</Link>
          <Link to="/unblur" className={active("/unblur")}>Unblur</Link>
          <Link to="/colorize" className={active("/colorize")}>Colorize</Link>
        </div>
      </div>

      {/* RIGHT SIDE ICONS */}
      <div className="flex items-center space-x-4 mt-2 sm:mt-0">
        {/* Saved Images (Gallery) Button */}
<button
  onClick={() => setShowGallery(true)}
  className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90 transition"
>
  View Gallery
</button>


        {/* Feedback Button */}
        <button onClick={handleOpenForm} title="Feedback">
          <div className="flex items-center justify-center h-10 w-10 border border-gray-300 rounded-full hover:bg-gray-200 transition-colors duration-200">
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M16 12h.01M21 12c0 4.97-4.48 9-10 9-2.92 0-5.5-1.03-7.56-2.69L3 21l2.45-3.95C4.31 15.5 3 13.82 3 12c0-4.97 4.48-9 10-9s10 4.03 10 9z"
              />
            </svg>
          </div>
        </button>

        {/* Upload Counter */}
        <div className="px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold text-gray-700">
          Uploads: {count || 0}
        </div>

        {/* Profile Button */}
        <button onClick={openLoginPage} title="Profile">
          <div className="flex items-center justify-center h-10 w-10 border border-gray-300 rounded-full hover:bg-gray-200 transition-colors duration-200">
            <CgProfile className="text-black text-2xl" />
          </div>
        </button>

        {/* Popups */}
        {isFormOpen && <Feedback onClose={handleCloseForm} />}
        {isLoginPageOpen && <LoginPage onClose={closeLoginPage} />}
        {isGalleryOpen && <GalleryPopup onClose={() => setIsGalleryOpen(false)} />}
          {showGallery && <GalleryPopup onClose={() => setShowGallery(false)} />}

      </div>

      {/* ==================== GALLERY POPUP ==================== */}
      {showGallery && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] md:w-[70%] lg:w-[60%] shadow-2xl relative max-h-[80vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-3 right-3 text-black text-xl font-bold"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">
              🖼️ Saved Images
            </h2>

            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : images.length === 0 ? (
              <p className="text-center text-gray-600">No saved images yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img) => (
                  <div
                    key={img._id}
                    className="border rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={img.enhancedUrl}
                      alt="Enhanced"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-2 text-center bg-gray-100">
                      <p className="text-xs text-gray-700">
                        {img.featureType} •{" "}
                        {new Date(img.createdAt).toLocaleString()}
                      </p>
                      <a
                        href={img.enhancedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-xs font-semibold hover:underline"
                      >
                        View Full Image
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
