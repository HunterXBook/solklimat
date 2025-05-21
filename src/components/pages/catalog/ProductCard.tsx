import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  model: string;
  image: string;
  price: number;
  color: string;
  onSelect: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  model,
  image,
  price,
  color,
  onSelect
}) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={() => onSelect(id)}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={`${name} ${model}`} 
          className="w-full h-48 object-contain bg-gray-50 p-4"
        />
        <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
          Инвертор
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-3">{model}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Цвет:</span>
          <span className="font-medium">{color}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">{price.toLocaleString()} ₽</span>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              // Здесь можно добавить логику для добавления в корзину
              alert('Товар добавлен в корзину');
            }}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
