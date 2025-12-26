import React from 'react'
import ImageCompareSlider from './ImageCompareSlider';
import before from '../assets/before.png';
import after from '../assets/after.png';
const BelowData2 = () => {
   return (
<div className='flex flex-col items-center min-h-screen w-min-screen justify-center bg-black text-white'>
       <hr className=" w-full m-0 p-4" />
    <div className="flex items-center bg-blue-50 p-6 rounded-xl shadow-md max-w-5xl mx-auto">
      {/* Left Side - Before/After Images */}
      <div className="flex items-center bg-orange-50 rounded-2xl w-180 overflow-hidden">
       
   <ImageCompareSlider before={before} after={after} />
      </div>

      {/* Right Side - Text and Button */}
      <div className="ml-8">
        <h2 className="text-2xl font-bold text-gray-900">
          100% Free AI Image Enhancer to Create 4K Watermark-Free Images
        </h2>
        <p className="text-gray-600 mt-4 leading-relaxed">
          Enhanso now provides 100% free access to instantly enhance images online. 
          Thanks to the best image enhancer, you don't need to sign up or pay any fees. 
          Get highly-enhanced images with no watermark in just one click.
        </p>

        {/* Hidden Input for File Upload */}
        <label className="inline-block mt-6">
          <input type="file" className="hidden" />
          <span className="bg-black text-white px-5 py-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-800 transition">
            Enhance Image With AI
          </span>
        </label>
      </div>
    </div>
       <hr className=" w-full m-9 p-4" />
    </div>
  );
}

export default BelowData2
