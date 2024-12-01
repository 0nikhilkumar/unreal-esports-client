import React, { useState } from "react";

const Partners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/partners-1.png",
    "/images/partners-1.png",
    "/images/partners-1.png",
    "/images/partners-1.png",
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-60 overflow-hidden" >
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
        onClick={handlePrev}
      >
        &#8592;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
        onClick={handleNext}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Partners;
