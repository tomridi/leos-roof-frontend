import { useEffect, useState } from 'react';

export default function GalleryClient({ images, categories, columns }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || 'all';
    setActiveCategory(category);
  }, []);

  const filteredImages =
    activeCategory === 'all'
      ? images
      : images.filter((img) => img.category === activeCategory);

  // ✅ Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (lightboxIndex === null || filteredImages.length === 0) return;

      if (event.key === 'Escape') {
        setLightboxIndex(null);
      } else if (event.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredImages.length]);

  return (
    <section className="bg-primary px-4 md:p-25 pt-30 md:mt-15">
      <div className="container mx-auto text-white font-thin text-sm">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="md:w-65 flex-none">
            <h1 className="leading-[1.4] md:font-thin text-xl md:text-4xl md:max-w-3/4">Gallery</h1>
        </div>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-6">
            {columns.map((column, colIndex) => (
            <div className="md:w-auto" key={colIndex}>
                <ul className="list-none">
                {column.map((category) => (
                    <li key={category.slug}>
                    <button
                        onClick={() => {
                        const newParams = new URLSearchParams(window.location.search);
                        newParams.set('category', category.slug);
                        const newUrl = `${window.location.pathname}?${newParams.toString()}`;
                        window.history.pushState({}, '', newUrl);
                        setActiveCategory(category.slug);
                        }}
                        className={`hover:text-light-brown block py-1 ${
                        activeCategory === category.slug ? 'text-light-brown font-bold' : ''
                        }`}
                    >
                        {category.name}
                    </button>
                    </li>
                ))}
                </ul>
            </div>
            ))}
        </div>
        </div>


        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-4 mt-10 text-2xl">
          {filteredImages.length > 0 ? (
            filteredImages.map((image, index) => (
              <div className="relative overflow-hidden rounded-sm shadow-lg" key={image.id}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-60 object-cover transition-transform hover:scale-105 cursor-pointer"
                  loading="lazy"
                  onClick={() => setLightboxIndex(index)}
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center">No images found in this category</p>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
          >
            ×
          </button>

          <button
            onClick={() =>
              setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1))
            }
            className="absolute left-4 text-white text-4xl"
          >
            ‹
          </button>

          <img
            src={filteredImages[lightboxIndex].src}
            alt={filteredImages[lightboxIndex].alt}
            className="max-w-full max-h-[80vh] rounded-lg"
          />

          <button
            onClick={() =>
              setLightboxIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0))
            }
            className="absolute right-4 text-white text-4xl"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
