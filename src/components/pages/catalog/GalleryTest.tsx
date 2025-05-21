import React from 'react';
import ImageGallery from './ImageGallery';

const GalleryTest: React.FC = () => {
  // Тестовые изображения
  const testImages = [
    '/images/products/integra-inverter-indoor-new.png',
    '/images/products/integra-inverter-outdoor-new.png'
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Тест галереи изображений</h1>
      <div className="max-w-2xl mx-auto">
        <ImageGallery 
          images={testImages} 
          alt="Тестовая галерея"
        />
      </div>
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Инструкция по тестированию:</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Проверьте, что изображение внутреннего блока отображается по умолчанию</li>
          <li>Нажмите на правую стрелку для переключения на изображение наружного блока</li>
          <li>Нажмите на левую стрелку для возврата к изображению внутреннего блока</li>
          <li>Нажмите на точки внизу для прямого переключения между изображениями</li>
        </ol>
      </div>
    </div>
  );
};

export default GalleryTest;
