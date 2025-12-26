import React, { useState } from "react";
import api from "../api/axios";
import Imgpreview from "./Imgpreview";
import Imgupload from "./Imgupload";
import Appear from "./Appear";

const Unblur = ({ onUpload }) => {
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
      formData.append("feature", "enhance");

      const res = await api.post("/api/process", formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setResultImage(res.data.data.afterUrl);
      if (onUpload) onUpload();
    } catch (err) {
      console.error("Unblur error:", err.response?.data || err.message);
      alert("Error removing blur.");
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

export default Unblur;
