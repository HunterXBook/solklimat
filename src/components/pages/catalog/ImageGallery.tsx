import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-80 bg-gray-50 rounded-lg overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <img 
          src={images[currentIndex]} 
          alt={`${alt} - изображение ${currentIndex + 1}`} 
          className="max-w-full max-h-full object-contain"
        />
      </div>
      
      {images.length > 1 && (
        <>
          <button 
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors"
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors"
            aria-label="Следующее изображение"
          >
            <ChevronRight size={20} />
          </button>
          
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Перейти к изображению ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageGallery;
