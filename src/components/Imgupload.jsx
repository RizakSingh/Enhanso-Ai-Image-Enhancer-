import React from "react";
import { useLocation } from "react-router-dom";
import { resizeImage } from "../utils/resize";

const Imgupload = ({ UploadImageHandler }) => {
  const location = useLocation();

  // 🔹 Detect feature type based on current route
  const getFeatureType = () => {
    if (location.pathname.includes("remove-bg")) return "removebg";
    if (location.pathname.includes("unblur")) return "unblur";
    if (location.pathname.includes("colorize")) return "colorize";
    return "enhance"; // default for home page
  };

  // 🔹 Handle image selection
  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const featureType = getFeatureType();

    try {
      // Resize based on current feature type
      const resizedFile = await resizeImage(file, featureType);
      UploadImageHandler(resizedFile);
    } catch (err) {
      console.error("Resize error:", err);
      // Fallback: send original file if resizing fails
      UploadImageHandler(file);
    }
  };

  return (
    <div className="w-40 sm:w-43 bg-gradient-to-r from-teal-400 to-purple-500 text-black py-2 px-2 font-semibold flex flex-col justify-center items-center m-auto rounded-xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
      <label
        htmlFor="fileInput"
        className="border-2 border-dashed border-white rounded-xl px-5 py-3 text-center hover:bg-white hover:text-black transition-all duration-300"
      >
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
        Upload Image
      </label>
    </div>
  );
};

export default Imgupload;
