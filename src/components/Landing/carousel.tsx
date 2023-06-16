import { RefObject, useEffect, useRef, useState } from "react";

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const carouselRef: RefObject<HTMLDivElement> = useRef(null);

  const images = ["Impresora.png", "Impresora.png", "Impresora.png"];

  const nextSlide = (): void => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const prevSlide = (): void => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${
        currentIndex * carouselRef.current.clientWidth
      }px)`;
      carouselRef.current.addEventListener("transitionend", () =>
        setIsTransitioning(false)
      );
    }
  }, [currentIndex]);

  return (
    <div className="relative">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        ref={carouselRef}
      >
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className="h-64 w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${imageUrl})`,
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          />
        ))}
      </div>

      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
        onClick={prevSlide}
      >
        Prev
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
