import React, { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/Carousel/Carousel1.png",
  "/Carousel/Carousel2.png",
  "/Carousel/Carousel3.png",
  "/Carousel/Carousel4.png",
  "/Carousel/Carousel5.png",
];

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute w-full transition-opacity duration-1000 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Image ${index + 1}`}
            layout="fill"
            objectFit="cover" // Assuming you want to cover the area of the div
            priority={index === activeIndex}
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
