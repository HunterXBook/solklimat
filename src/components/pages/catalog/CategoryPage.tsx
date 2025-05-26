import { ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, Product } from '../../../data/productData';

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
  const allCategoryProducts = products[categoryId || ''] || [];
  
  // Функция для создания slug из названия серии
  const createSeriesSlug = (seriesName: string): string => {
    return seriesName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-') // Заменяем множественные дефисы на один
      .replace(/^-|-$/g, ''); // Удаляем дефисы в начале и конце
  };
  
  // Группируем продукты по сериям (по name)
  const groupedBySeries = allCategoryProducts.reduce((acc: { [key: string]: Product[] }, product) => {
    const seriesSlug = createSeriesSlug(product.name);
    if (!acc[seriesSlug]) {
      acc[seriesSlug] = [];
    }
    acc[seriesSlug].push(product);
    return acc;
  }, {});

  // Обработчик выбора серии
  const handleSeriesSelect = (seriesSlug: string) => {
    navigate(`/catalog/${categoryId}/${seriesSlug}`);
  };

  // Обработчик возврата к категориям
  const handleBack = () => {
    navigate('/catalog');
  };

  const pageTitle = getCategoryTitle(categoryId || '');

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center mb-8">
        <button 
          onClick={handleBack}
          className="flex items-center text-blue-600 font-medium mr-4 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Назад к категориям
        </button>
        <h1 className="text-3xl font-bold">{pageTitle}</h1>
      </div>

      {Object.keys(groupedBySeries).length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedBySeries).map(([seriesSlug, seriesProducts]) => {
            const firstProduct = seriesProducts[0];
            const variantsCount = seriesProducts.length;
            const minPrice = Math.min(...seriesProducts.map(p => p.price));
            const maxPrice = Math.max(...seriesProducts.map(p => p.price));
            
            return (
              <div
                key={seriesSlug}
                onClick={() => handleSeriesSelect(seriesSlug)}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img 
                    src={firstProduct.images[0]} 
                    alt={firstProduct.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (nextElement) {
                        nextElement.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center text-gray-500">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  
                  {/* Плашка "Инвертор" слева сверху */}
                  <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Инвертор
                  </div>
                  
                  {/* Плашка бренда справа сверху */}
                  <div className="absolute top-3 right-3 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded">
                    MDV
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{firstProduct.name}</h3>
                  <p className="text-gray-600 mb-3">{variantsCount} вариант{variantsCount > 1 ? (variantsCount < 5 ? 'а' : 'ов') : ''} мощности</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-500">
                      Цена:
                    </div>
                    <div className="font-bold text-blue-600">
                      {minPrice === maxPrice 
                        ? `${minPrice.toLocaleString()} ₽`
                        : `от ${minPrice.toLocaleString()} ₽`
                      }
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Цвет корпуса:</span>
                      <span className="font-medium">{firstProduct.color}</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <span className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
                      Выбрать модель
                      <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <h3 className="text-2xl font-semibold mb-2">Продукты не найдены</h3>
          <p className="text-gray-600">В данной категории пока нет доступных продуктов.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;