import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  // Обработчик ошибки загрузки изображения
  const handleImageError = useCallback((index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  }, []);

  // Переключение на следующее изображение
  const nextImage = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  // Переключение на предыдущее изображение
  const prevImage = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  // Выбор конкретного изображения
  const selectImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Открытие модального окна
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // Закрытие модального окна
  const closeModal = useCallback((e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsModalOpen(false);
  }, []);

  // Обработка клавиш в модальном окне
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  }, [closeModal, prevImage, nextImage]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Изображение недоступно</span>
      </div>
    );
  }

  const currentImage = images[currentIndex];
  const hasError = imageErrors[currentIndex];

  return (
    <>
      {/* Основная галерея */}
      <div className="w-full">
        {/* Главное изображение */}
        <div 
          className="relative w-full h-64 md:h-80 bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
          onClick={openModal}
        >
          {!hasError ? (
            <img
              src={currentImage}
              alt={`${alt} - изображение ${currentIndex + 1}`}
              className="w-full h-full object-contain transition-transform group-hover:scale-105"
              onError={() => handleImageError(currentIndex)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
                <p>Изображение недоступно</p>
              </div>
            </div>
          )}

          {/* Стрелки навигации (показываются только если больше одного изображения) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-opacity-70"
                style={{ zIndex: 20 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-opacity-70"
                style={{ zIndex: 20 }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Индикатор текущего изображения */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Миниатюры (показываются только если больше одного изображения) */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => selectImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {!imageErrors[index] ? (
                  <img
                    src={image}
                    alt={`${alt} - миниатюра ${index + 1}`}
                    className="w-full h-full object-contain bg-gray-50"
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Модальное окно для полноэкранного просмотра */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Кнопка закрытия */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-60"
            style={{ zIndex: 60 }}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Изображение */}
          <div className="relative max-w-7xl max-h-full mx-4" onClick={(e) => e.stopPropagation()}>
            {!hasError ? (
              <img
                src={currentImage}
                alt={`${alt} - полноэкранный просмотр ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="w-96 h-96 flex items-center justify-center text-white">
                <div className="text-center">
                  <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  <p>Изображение недоступно</p>
                </div>
              </div>
            )}

            {/* Стрелки навигации в модальном окне */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-70 z-60"
                  style={{ zIndex: 60 }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-70 z-60"
                  style={{ zIndex: 60 }}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Индикатор в модальном окне */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
                  {currentIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
