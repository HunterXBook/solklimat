import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  // Используем локальное состояние для отслеживания текущего изображения
  const [currentImage, setCurrentImage] = useState<string>(images[0] || '');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Обновляем текущее изображение при изменении массива изображений
  useEffect(() => {
    if (images.length > 0) {
      setCurrentImage(images[0]);
      setCurrentIndex(0);
    }
  }, [images]);

  // Функция для переключения на предыдущее изображение
  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (images.length <= 1) return;
    
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setCurrentImage(images[newIndex]);
  };

  // Функция для переключения на следующее изображение
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (images.length <= 1) return;
    
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setCurrentImage(images[newIndex]);
  };

  // Функция для прямого выбора изображения по индексу
  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setCurrentIndex(index);
    setCurrentImage(images[index]);
  };

  return (
    <div className="relative w-full h-96 bg-gray-50 rounded-lg overflow-hidden">
      {/* Контейнер изображения */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4">
        {currentImage && (
          <img 
            src={currentImage} 
            alt={`${alt} - изображение ${currentIndex + 1}`} 
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>
      
      {/* Кнопки навигации и индикаторы, показываем только если есть больше одного изображения */}
      {images.length > 1 && (
        <>
          {/* Кнопка "Предыдущее" */}
          <button 
            onClick={handlePrevious}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors z-20"
            aria-label="Предыдущее изображение"
            type="button"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Кнопка "Следующее" */}
          <button 
            onClick={handleNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors z-20"
            aria-label="Следующее изображение"
            type="button"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Индикаторы (точки) */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => handleDotClick(index, e)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Перейти к изображению ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageGallery;
