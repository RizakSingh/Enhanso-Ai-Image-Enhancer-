
import React from 'react'

const BelowData = () => {
  return (
    <div className="flex w-min-screen h-min-screen items-center justify-between bg-black text-white p-10 rounded-2xl shadow-lg">
    
      {/* Left Side - Text */}
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Unblur Photos Online Free</h1>
        <p className="text-gray-300 leading-relaxed text-lg">
          Now, there is no need to retake images due to blurriness because now
          by using our AI photo enhancer for blurry pictures, everyone can
          easily unblur their images for free and see a difference in quality.
          Our tool sharpens your images, applies image denoising automatically,
          and enhances overall photo quality by 200%.
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="relative flex items-center justify-center">
        <img
          src="https://static.staticspic.com/_next/static/media/enhance-after-7.49c1996a.png"
          alt="AI Photo Enhancer"
          className="w-[450px] h-auto rounded-xl shadow-2xl"
        />
      </div>
    </div>
  )
}

export default BelowData
