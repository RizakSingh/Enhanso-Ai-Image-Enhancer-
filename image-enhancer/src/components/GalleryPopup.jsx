import React, { useEffect, useState } from "react";
import axios from "axios";

const GalleryPopup = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/images");
        setImages(data);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-xl w-11/12 max-w-3xl p-5 overflow-y-auto max-h-[80vh] shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">🖼️ Saved Images</h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-5 text-gray-500 text-lg hover:text-red-600"
        >
          ✕
        </button>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : images.length === 0 ? (
          <p className="text-center text-gray-400">No saved images yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div
                key={img._id}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={img.enhancedUrl}
                  alt="Enhanced"
                  className="w-full h-40 object-cover"
                />
                <div className="p-2 text-sm text-gray-600">
                  <p><strong>Type:</strong> {img.featureType}</p>
                  <p><strong>Date:</strong> {new Date(img.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPopup;
