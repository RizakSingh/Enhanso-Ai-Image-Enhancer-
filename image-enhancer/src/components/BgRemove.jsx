import React, { useState } from "react";
import axios from "axios";
import Imgpreview from "./Imgpreview";
import Imgupload from "./Imgupload";
import Appear from "./Appear";

const BgRemove = ({ onUpload }) => {
  const [uploadImage, setUploadImage] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;

    setUploadImage(URL.createObjectURL(file));
    setResultImage("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("feature", "removebg");

      const res = await axios.post("http://localhost:5000/api/process", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResultImage(res.data.data.afterUrl);
      if (onUpload) onUpload();

    } catch (err) {
      console.error("Background Remove error:", err);
      alert("Error removing background.");
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
