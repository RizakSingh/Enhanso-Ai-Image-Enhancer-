import React, { useState, useEffect } from "react";
import { PiImagesBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import GalleryPopup from "./GalleryPopup";
import Feedback from "./feedback";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const Navbar = ({ count }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [user, setUser] = useState(null);
  const [profileMenu, setProfileMenu] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem("enhansoUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("enhansoUser");
    localStorage.removeItem("token"); // 🔥 IMPORTANT
    setUser(null);
    setProfileMenu(false);
  };

  const active = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold underline underline-offset-4"
      : "text-black hover:text-blue-600 transition";

  return (
    <>
      <div className="w-full py-4 px-3 shadow-lg bg-white flex justify-between items-center sticky top-0 z-40">

        {/* LEFT */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold flex items-center text-black gap-2">
            EnHanso <PiImagesBold className="text-blue-600" />
          </h1>

          <div className="flex gap-5 text-lg">
            <Link to="/" className={active("/")}>Enhance</Link>
            <Link to="/remove-bg" className={active("/remove-bg")}>Remove BG</Link>
            <Link to="/unblur" className={active("/unblur")}>Unblur</Link>
            <Link to="/colorize" className={active("/colorize")}>Colorize</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center space-x-4">

          {/* Gallery */}
          <button
            onClick={() => {
              if (!user) {
                alert("Please login to view gallery");
                setIsLoginPageOpen(true);
              } else {
                setShowGallery(true);
              }
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md"
          >
            View Gallery
          </button>

          {/* Feedback */}
          <button
            className="bg-black p-2 rounded-3xl"
            onClick={() => setIsFormOpen(true)}
          >
            💬
          </button>

          {/* Upload count */}
          <div className="px-4 py-2 rounded-full font-semibold border-2 border-gray-950 text-black">
            Uploads: {count || 0}
          </div>

          {/* REGISTER BUTTON (ONLY IF LOGGED OUT) */}
          {!user && (
            <button
              onClick={() => {
                setIsLoginPageOpen(false);
                setIsRegisterOpen(true);
              }}
              className="px-3 py-1 bg-green-600 text-white rounded-md text-sm"
            >
              Register
            </button>
          )}

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => {
                if (!user) {
                  setIsRegisterOpen(false);
                  setIsLoginPageOpen(true);
                } else {
                  setProfileMenu(!profileMenu);
                }
              }}
            >
              <CgProfile className="text-3xl cursor-pointer text-black" />
            </button>

            {/* Profile dropdown */}
            {profileMenu && user && (
              <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg p-4 w-48">
                <p className="font-semibold text-gray-800">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="mt-3 text-sm text-red-600 hover:underline"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* POPUPS */}
      {isFormOpen && <Feedback onClose={() => setIsFormOpen(false)} />}

      {showGallery && (
        <GalleryPopup onClose={() => setShowGallery(false)} />
      )}

      {isLoginPageOpen && (
        <LoginPage
          onClose={() => setIsLoginPageOpen(false)}
          onLogin={(user) => setUser(user)}
        />
      )}

      {isRegisterOpen && (
        <RegisterPage
          onClose={() => setIsRegisterOpen(false)}
          onRegistered={() => {
            setIsRegisterOpen(false);
            setIsLoginPageOpen(true);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
