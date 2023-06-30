import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Image from "next/image";

const images = [
  "/Carousel1.png",
  "/Carousel2.png",
  "/Carousel3.png",
  "/Carousel4.png",
  "/Carousel5.png",
];

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={classNames(
            "absolute w-full transition-opacity duration-1000",
            index === activeIndex ? "opacity-100" : "opacity-0"
          )}
          width={3840}
          height={2160}
        />
      ))}
    </div>
  );
};

export default Carousel;
