import React, { useState } from "react";
import axios from "axios";
import Imgpreview from "./Imgpreview";
import Imgupload from "./Imgupload";
import Appear from "./Appear";
import { processImage } from "../utils/picwishAPI";

const Unblur = ({ onUpload }) => {
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
      const unblurred = await processImage(file, "unblur");
      setResultImage(unblurred);

      // ✅ Save to backend
      const beforeBase64 = await fileToBase64(file);
      await axios.post("http://localhost:5000/api/save-image", {
        beforeUrl: beforeBase64,
        afterUrl: unblurred,
        feature: "unblur",
      });

      if (onUpload) onUpload();
    } catch (err) {
      console.error("Unblur error:", err);
      alert("Error removing blur. Please try again.");
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

export default Unblur;
