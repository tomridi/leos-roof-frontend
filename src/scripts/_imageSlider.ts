// src/scripts/imageSlider.ts

// Define the interface for the properties passed to the Alpine component
interface ImageSliderProps {
  initialSlide?: number;
  totalSlides: number;
  autoplayDelay?: number; // Optional: delay for autoplay in milliseconds
}

// Define the interface for the Alpine.js component's data and methods
// This helps TypeScript understand the 'this' context within Alpine's data object
interface ImageSliderData {
  // Data properties
  activeSlide: number;
  totalSlides: number;
  autoplayInterval: ReturnType<typeof setInterval> | null;
  autoplayDelay: number;

  // Methods
  init: () => void;
  startAutoplay: () => void;
  stopAutoplay: () => void;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
}

// The Alpine.js component function
// This function returns the data object for x-data
export function imageSlider(props: ImageSliderProps): ImageSliderData {
  return {
    activeSlide: props.initialSlide ?? 0,
    totalSlides: props.totalSlides,
    autoplayInterval: null,
    autoplayDelay: props.autoplayDelay ?? 5000, // Default to 5 seconds

    init() {
      // This Alpine.js lifecycle hook runs when the component is initialized
      this.startAutoplay();
    },

    startAutoplay() {
      // Clear any existing interval to prevent multiple autoplays
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
      }
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, this.autoplayDelay);
    },

    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null; // Reset interval ID
      }
    },

    nextSlide() {
      this.activeSlide = (this.activeSlide + 1) % this.totalSlides;
    },

    prevSlide() {
      this.activeSlide = (this.activeSlide - 1 + this.totalSlides) % this.totalSlides;
    },

    goToSlide(index: number) {
      if (index >= 0 && index < this.totalSlides) {
        this.activeSlide = index;
        this.stopAutoplay(); // Stop autoplay when user manually navigates
      }
    },
  };
}