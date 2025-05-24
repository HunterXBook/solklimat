import React from 'react';

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
          className="w-full h-56 object-contain bg-gray-50 p-4"
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
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-blue-600">{price.toLocaleString()} ₽</span>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(id);
            }}
          >
            Заказать
          </button>
        </div>

        <div className="text-sm text-gray-600 mt-4 space-y-2">
          <p>Серия INTEGRA Pro Black от MDV — это новое поколение климатических систем, разработанных для профессионального охлаждения и обогрева помещений с использованием современных технологий.</p>
          <p>Полностью инверторная сплит-система оснащена интеллектуальной системой охлаждения CoolFlash, встроенным Wi-Fi-модулем и функцией искусственного интеллекта. Алгоритм AI ECOMASTER анализирует привычки пользователя и параметры среды, автоматически подбирая оптимальные настройки для максимального комфорта при минимальном энергопотреблении.</p>
          <p>Внутренний блок с матовым чёрным покрытием отличается лаконичным и стильным дизайном, гармонично вписываясь в современный интерьер. Система очистки воздуха включает биполярный ионизатор Air Magic, фотокаталитический и комбинированный фильтры, эффективно устраняющие вирусы и вредные микрочастицы.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
