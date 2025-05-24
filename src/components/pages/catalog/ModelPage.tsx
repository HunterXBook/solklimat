import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { products } from '../../../data/productData';

// Интерфейс для пропсов
interface ModelPageProps {
  categoryId: string;
  onBack: () => void;
  onModelSelect: (modelName: string) => void;
}

// Типы брендов
type Brand = 'Mitsubishi' | 'MDV' | 'Hisense' | 'all';

const ModelPage = ({ categoryId, onBack, onModelSelect }: ModelPageProps) => {
  const [selectedBrand, setSelectedBrand] = useState<Brand>('all');

  // Получаем все продукты для данной категории
  const categoryProducts = products[categoryId] || [];
  
  // Функция для определения бренда по модели
  const getBrandFromModel = (model: string): Brand => {
    // MDV модели
    if (model.startsWith('MDSI') || model.startsWith('MDOI') || model.startsWith('MDSBI') || 
        model.startsWith('MDSAI') || model.startsWith('MDOAI')) {
      return 'MDV';
    }
    // Mitsubishi модели
    else if (model.startsWith('MDS') && !model.startsWith('MDSI') && !model.startsWith('MDSBI') && !model.startsWith('MDSAI')) {
      return 'Mitsubishi';
    }
    // Hisense модели
    else if (model.startsWith('H')) {
      return 'Hisense';
    }
    return 'all';
  };
  
  // Фильтруем продукты по бренду
  const filteredProducts = categoryProducts.filter(product => {
    if (selectedBrand === 'all') return true;
    const productBrand = getBrandFromModel(product.model);
    return productBrand === selectedBrand;
  });
  
  // Получаем уникальные модели (по имени)
  const uniqueModels = Array.from(
    new Set(filteredProducts.map(product => product.name))
  );
  
  // Получаем первый продукт для каждой модели (для отображения изображения и описания)
  const modelPreviews = uniqueModels.map(modelName => {
    return filteredProducts.find(product => product.name === modelName);
  }).filter(Boolean);

  // Получаем название категории
  const getCategoryTitle = (catId: string): string => {
    switch (catId) {
      case 'split': return 'Сплит-системы';
      case 'multi-split': return 'Мультисплит-системы';
      case 'semi-industrial': return 'Полупромышленные системы';
      default: return 'Категория';
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-600 font-medium mr-4"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Назад к категориям
        </button>
        <h1 className="text-3xl font-bold">
          {getCategoryTitle(categoryId)}
        </h1>
      </div>

      {/* Фильтры по бренду */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Фильтр по бренду</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedBrand('all')}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              selectedBrand === 'all'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
            }`}
          >
            Все бренды
          </button>
          <button
            onClick={() => setSelectedBrand('Mitsubishi')}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              selectedBrand === 'Mitsubishi'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
            }`}
          >
            Mitsubishi
          </button>
          <button
            onClick={() => setSelectedBrand('MDV')}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              selectedBrand === 'MDV'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
            }`}
          >
            MDV
          </button>
          <button
            onClick={() => setSelectedBrand('Hisense')}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              selectedBrand === 'Hisense'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
            }`}
          >
            Hisense
          </button>
        </div>
      </div>
      
      {modelPreviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modelPreviews.map((model) => (
            model && (
              <div 
                key={model.name}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => onModelSelect(model.name)}
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {model.images && model.images.length > 0 ? (
                    <img 
                      src={model.images[0]} 
                      alt={model.name} 
                      className="h-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-500 text-center p-4">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <p>Изображение отсутствует</p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{model.name}</h3>
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {getBrandFromModel(model.model)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {model.keyFeatures && model.keyFeatures.length > 0 
                      ? model.keyFeatures[0] 
                      : 'Нет описания'}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">От {Math.min(...categoryProducts
                      .filter(p => p.name === model.name)
                      .map(p => p.price)).toLocaleString()} ₽</span>
                    <button className="inline-flex items-center text-blue-600 font-medium">
                      Подробнее
                    </button>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <h3 className="text-2xl font-semibold mb-2">Каталог пуст</h3>
          <p className="text-gray-600 mb-6">В данной категории пока нет моделей. Скоро здесь появятся модели кондиционеров.</p>
        </div>
      )}
    </div>
  );
};

export default ModelPage;
