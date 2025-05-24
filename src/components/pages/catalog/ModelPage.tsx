import { ArrowLeft } from 'lucide-react';
import { products } from '../../../data/productData';

// Интерфейс для пропсов
interface ModelPageProps {
  categoryId: string;
  onBack: () => void;
  onModelSelect: (modelName: string) => void;
}

const ModelPage = ({ categoryId, onBack, onModelSelect }: ModelPageProps) => {
  // Получаем все продукты для данной категории
  const categoryProducts = products[categoryId] || [];
  
  // Получаем уникальные модели (по имени)
  const uniqueModels = Array.from(
    new Set(categoryProducts.map(product => product.name))
  );
  
  // Получаем первый продукт для каждой модели (для отображения изображения и описания)
  const modelPreviews = uniqueModels.map(modelName => {
    return categoryProducts.find(product => product.name === modelName);
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
                  <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
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
