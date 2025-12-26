import React, { useState } from "react";
import axios from "axios";
import Imgpreview from "./Imgpreview";
import Imgupload from "./Imgupload";
import Appear from "./Appear";

const Colorize = ({ onUpload }) => {
  const [uploadImage, setUploadImage] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;

    setUploadImage(URL.createObjectURL(file));
    setResultImage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", file);
      formData.append("feature", "colorize");

      const res = await axios.post(
        "http://localhost:5000/api/process",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResultImage(res.data.data.afterUrl);
      if (onUpload) onUpload();
    } catch (err) {
      console.error("Colorize error:", err.response?.data || err.message);
      alert("Error colorizing image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Appear />
      <Imgupload UploadImageHandler={handleUpload} />
      <Imgpreview
        loading={loading}
        uploaded={uploadImage}
        enhanced={resultImage}
      />
    </>
  );
};

export default Colorize;
