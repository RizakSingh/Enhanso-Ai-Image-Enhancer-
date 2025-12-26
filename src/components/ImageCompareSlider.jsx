import { useState, useRef } from "react";
import before from '../assets/before.png'
import after from '../assets/after.png'
export default function ImageCompareSlider({ before, after }) {
  const [position, setPosition] = useState(50); // percentage
  const containerRef = useRef(null);

  const handleMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let newPosition = (x / rect.width) * 100;
    if (newPosition < 0) newPosition = 0;
    if (newPosition > 100) newPosition = 100;
    setPosition(newPosition);
  };

  const handleTouchMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    let newPosition = (x / rect.width) * 100;
    if (newPosition < 0) newPosition = 0;
    if (newPosition > 100) newPosition = 100;
    setPosition(newPosition);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[400px] h-[400px] rounded-xl overflow-hidden shadow-lg cursor-pointer select-none"
      onMouseMove={handleMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Full background) */}
      <img
        src= {after}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before Image (clipped according to slider) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={before}
          alt="Before"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      ></div>

      {/* Slider Button */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-300"
        style={{ left: `${position}%`, transform: "translate(-50%, -50%)" }}
      >
        <span className="text-xl">↔</span>
      </div>
    </div>
  );
}