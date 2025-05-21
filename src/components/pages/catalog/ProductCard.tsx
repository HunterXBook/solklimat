import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface ProductProps {
  id: string;
  name: string;
  model: string;
  image: string;
  price: number;
  type: string;
  color: string;
  onSelect: (id: string) => void;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  model,
  image,
  price,
  type,
  color,
  onSelect
}) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onSelect(id)}
    >
      <div className="relative">
        {/* Изображение товара */}
        <div className="h-64 bg-gray-50 flex items-center justify-center p-4">
          <img 
            src={image} 
            alt={name} 
            className="max-h-full max-w-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/images/placeholder.jpg';
            }}
          />
        </div>
        
        {/* Бейдж инвертор */}
        {type.toLowerCase().includes('инвертор') && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Инвертор
          </div>
        )}
      </div>
      
      <div className="p-6">
        {/* Название и модель */}
        <h3 className="text-xl font-bold mb-1 text-gray-800">{name}</h3>
        <p className="text-gray-500 mb-4">{model}</p>
        
        {/* Основные характеристики */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Тип:</span>
            <span className="font-medium text-gray-800">{type}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Цвет:</span>
            <span className="font-medium text-gray-800">{color}</span>
          </div>
        </div>
        
        {/* Цена и кнопка */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Цена:</span>
            <span className="text-2xl font-bold text-blue-600">{price.toLocaleString()} ₽</span>
          </div>
          <div className="flex items-center justify-end">
            <button className="inline-flex items-center text-blue-600 font-medium">
              Подробнее
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
