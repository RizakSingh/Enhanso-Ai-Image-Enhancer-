import React, { useEffect, useState } from "react";

import api from "../api/axios";



const GalleryPopup = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setImages([]);
        setLoading(false);
        return;
      }

      const { data } = await api.get(
        "/api/images",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImages(data);
    } catch (err) {
      console.error("Error fetching images:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchImages();
}, []);


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
      <div className="relative bg-white rounded-xl w-11/12 max-w-4xl p-6 overflow-y-auto max-h-[85vh] shadow-xl">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-700 hover:text-red-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">
          🖼️ Saved Images
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : images.length === 0 ? (
          <p className="text-center text-gray-500">No saved images yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {images.map((img) => (
              <div key={img._id} className="border rounded-lg shadow-md p-3 bg-gray-50">

                <div className="grid grid-cols-2 gap-3">

                  {/* BEFORE */}
                  <div>
                    <p className="text-sm font-semibold mb-1">Before</p>
                    <img
                      src={img.beforeUrl}
                      alt="Before"
                      className="w-full h-40 object-contain rounded-lg bg-gray-200"
                    />
                  </div>

                  {/* AFTER */}
                  <div>
                    <p className="text-sm font-semibold mb-1">After</p>
                    <img
                      src={img.afterUrl}
                      alt="After"
                      onError={(e) => { e.target.src = ""; }}
                      className="w-full h-40 object-contain rounded-lg bg-gray-200"
                    />
                  </div>

                </div>

                <div className="mt-3 text-xs text-gray-600">
                  <p><strong>Feature:</strong> {img.featureUsed}</p>
                  <p><strong>Date:</strong> {new Date(img.createdAt).toLocaleString()}</p>
                </div>

                <a
                  href={img.afterUrl}
                  download={`enhanced-${img._id}.png`}
                  className="mt-3 inline-block text-blue-600 text-xs font-semibold hover:underline"
                >
                  ⬇ Download Final Image
                </a>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPopup;
