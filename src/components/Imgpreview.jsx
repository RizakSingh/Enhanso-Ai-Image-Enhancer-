import React from 'react';
import Loader from './loader';

const Imgpreview = ({ uploaded, enhanced, loading }) => {
  return (
    <div className="h-100 w-180 flex justify-center items-center gap-10 mt-6">
      
      {/* Original Image Box */}
      <div className="w-full h-full bg-white text-center rounded-xl border border-white overflow-hidden hover:w-150 hover:h-93 transition-all">
        <h1 className="text-white bg-black font-semibold p-1">Original Pic</h1>
        {uploaded ? (
          <img
            src={uploaded}
            alt="Original"
         className="w-full h-full object-contain bg-black"

          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-300 text-black">
            No Image Uploaded
          </div>
        )}
      </div>

      {/* Processed / Enhanced Image Box */}
      <div className="w-full h-full bg-black text-center rounded-xl border border-white overflow-hidden hover:w-150 hover:h-93 transition-all">
        <h1 className="text-black bg-white font-semibold p-1">
          Processed Image
        </h1>

        {loading ? (
          <Loader />
        ) : enhanced ? (
          <img
            src={enhanced}
            alt="Processed"
         className="w-full h-full object-contain bg-black"

          />
        ) : (
          <div className="flex items-center justify-center h-full text-white bg-gray-800">
            No Processed Image
          </div>
        )}
      </div>
    </div>
  );
};

export default Imgpreview;
