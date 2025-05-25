import { ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../../data/productData';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const getCategoryTitle = (catId: string): string => {
    switch (catId) {
      case 'split': return 'Сплит-системы';
      case 'multi-split': return 'Мультисплит-системы';
      case 'semi-industrial': return 'Полупромышленные системы';
      default: return 'Категория';
    }
  };

  // Получаем все продукты для данной категории
  const categoryProducts = products[categoryId || ''] || [];
  
  // Получаем уникальные модели
  const uniqueModels = Array.from(new Set(categoryProducts.map(product => product.model)));

  // Обработчик выбора модели
  const handleModelSelect = (model: string) => {
    navigate(`/catalog/${categoryId}/${model}`);
  };

  // Обработчик возврата к категориям
  const handleBack = () => {
    navigate('/catalog');
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center mb-8">
        <button 
          onClick={handleBack}
          className="flex items-center text-blue-600 font-medium mr-4"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Назад к категориям
        </button>
        <h1 className="text-3xl font-bold">
          {getCategoryTitle(categoryId || '')}
        </h1>
      </div>
      
      {uniqueModels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {uniqueModels.map((model) => {
            // Находим первый продукт с этой моделью для отображения информации
            const sampleProduct = categoryProducts.find(p => p.model === model);
            if (!sampleProduct) return null;

            return (
              <div 
                key={model}
                onClick={() => handleModelSelect(model)}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              >
                <div className="relative">
                  <img 
                    src={sampleProduct.images[0]} 
                    alt={model} 
                    className="w-full h-56 object-contain bg-gray-50 p-4"
                  />
                  <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {sampleProduct.name.split(' ')[0]}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{sampleProduct.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{model}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Модель:</span>
                    <span className="font-medium">{model}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <h3 className="text-2xl font-semibold mb-2">Каталог пуст</h3>
          <p className="text-gray-600 mb-6">В данной категории пока нет моделей. Скоро здесь появятся новые модели кондиционеров.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
