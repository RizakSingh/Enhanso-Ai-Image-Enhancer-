import React, { useState } from "react";
import axios from "axios";
import Imgpreview from "./Imgpreview";
import Imgupload from "./Imgupload";
import Appear from "./Appear";
import { processImage } from "../utils/picwishAPI";

const BgRemove = ({ onUpload }) => {
  const [uploadImage, setUploadImage] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [loading, setLoading] = useState(false);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleUpload = async (file) => {
    if (!file) return;
    setResultImage("");
    setUploadImage(URL.createObjectURL(file));
    setLoading(true);

    try {
      const bgRemoved = await processImage(file, "removebg");
      setResultImage(bgRemoved);

      // ✅ Save to backend
      const beforeBase64 = await fileToBase64(file);
      await axios.post("http://localhost:5000/api/save-image", {
        beforeUrl: beforeBase64,
        afterUrl: bgRemoved,
        feature: "removebg",
      });

      if (onUpload) onUpload();
    } catch (err) {
      console.error("Background Remove error:", err);
      alert("Error removing background. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Appear />
      <Imgupload UploadImageHandler={handleUpload} />
      <Imgpreview loading={loading} uploaded={uploadImage} enhanced={resultImage} />
    </>
  );
};

export default BgRemove;
