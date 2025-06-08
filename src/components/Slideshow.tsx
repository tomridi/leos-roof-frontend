import React, { useState, useEffect, useRef, useCallback } from 'react';

// 1. Define interfaces for props and image structure
interface Image {
  src: string;
  alt: string;
  caption?: string; // Caption is optional
}

interface SlideshowProps {
  images?: Image[];
  interval?: number; // In milliseconds
  arrows?: boolean;
  custom_arrows?: boolean;
  caption?: boolean;
  bullets?: boolean;
}

const Slideshow: React.FC<SlideshowProps> = ({
  images = [],
  interval = 5000,
  arrows = true,
  custom_arrows = false,
  caption = true,
  bullets = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // To store the interval ID
  const isMounted = useRef(true); // To track if component is mounted

  // Function to show a specific slide
  const showSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Function to advance to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  // Function to go to the previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  // Function to start the automatic slideshow interval
  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Only start interval if there are images and interval is positive
    if (images.length > 0 && interval > 0) {
      intervalRef.current = setInterval(() => {
        // Only advance if component is still mounted
        if (isMounted.current) {
          nextSlide();
        }
      }, interval);
    }
  }, [interval, images.length, nextSlide]);

  // Function to reset the interval (on user interaction)
  const resetInterval = useCallback(() => {
    startInterval(); // Re-starts the interval immediately
  }, [startInterval]);

  // Effect for handling the automatic slideshow interval
  useEffect(() => {
    if (images.length > 0) {
      startInterval();
    }

    // Cleanup function: Clear interval when component unmounts
    return () => {
      isMounted.current = false; // Mark as unmounted
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, startInterval]); // Re-run if images change or startInterval changes

  // Don't render anything if no images are provided
  if (images.length === 0) {
    return null;
  }

  return (
    <div id="slideshow-container" className="relative h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index} // Key for list rendering
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={index !== currentIndex} // For accessibility
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {image.caption && caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
              {image.caption}
            </div>
          )}
        </div>
      ))}

      {/* Navigation dots */}
      {bullets && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index} // Key for list rendering
              onClick={() => {
                showSlide(index);
                resetInterval();
              }}
              className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}

      {/* Previous/Next buttons */}
      {(arrows || custom_arrows) && (
        <>
          {/* Default Arrows */}
          {arrows && !custom_arrows && (
            <>
              <button
                onClick={() => {
                  prevSlide();
                  resetInterval();
                }}
                className="hidden md:block absolute md:left-4 top-1/2 -translate-y-1/2 text-white/80 p-2 rounded-full cursor-pointer hover:text-white/100 w-5 md:w-10 z-10"
                aria-label="Previous slide"
              >
                <svg width="35" height="27" viewBox="0 0 35 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 15.4967L35 0V31L0 15.4967Z" fill="currentColor"/>
                </svg>
              </button>

              <button
                onClick={() => {
                  nextSlide();
                  resetInterval();
                }}
                className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 text-white/80 p-2 rounded-full cursor-pointer hover:text-white/100  w-5 md:w-10 z-10"
                aria-label="Next slide"
              >
                <svg width="35" height="27" viewBox="0 0 35 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 31V0L35 15.4967" fill="currentColor"/>
                </svg>
              </button>
            </>
          )}

          {/* Custom Arrows */}
          {custom_arrows && (
            <>
              <button
                onClick={() => {
                  prevSlide();
                  resetInterval();
                }}
                className="hidden md:block absolute md:left-4 top-1/2 -translate-y-1/2 text-white/60 p-2 rounded-full cursor-pointer hover:text-white/100 w-5 md:w-10
                           transition ease-in-out duration-300 z-10"
                aria-label="Previous slide (custom)"
              >
                <svg className="h-[23px] w-auto" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1024_483)">
                    <path d="M30.1241 23.259L0.124073 8.88403" stroke="currentColor" strokeMiterlimit="10"/>
                    <path d="M0.124073 14.634L30.1241 0.259033" stroke="currentColor" strokeMiterlimit="10"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_1024_483">
                      <rect width="30" height="23" fill="currentColor"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>

              <button
                onClick={() => {
                  nextSlide();
                  resetInterval();
                }}
                className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 text-white/60 p-2 rounded-full cursor-pointer hover:text-white/100  w-5 md:w-10
                           transition ease-in-out duration-300 z-10"
                aria-label="Next slide (custom)"
              >
                <svg className="h-[23px] w-auto" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1024_493)">
                    <path d="M-0.124024 -0.259034L29.876 14.116" stroke="currentColor" strokeMiterlimit="10"/>
                    <path d="M29.876 8.36597L-0.124026 22.741" stroke="currentColor" strokeMiterlimit="10"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_1024_493">
                      <rect width="30" height="23" fill="currentColor" transform="translate(30 23) rotate(-180)"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Slideshow;