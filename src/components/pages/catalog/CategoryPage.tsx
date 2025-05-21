import { ArrowLeft } from 'lucide-react';

// Типы для продуктов
interface Product {
  id: string;
  name: string;
  image: string;
  area: string;
  color: string;
  price: number;
}

// Интерфейс для пропсов
interface CategoryPageProps {
  categoryId: string;
  onBack: () => void;
}

const CategoryPage = ({ categoryId, onBack }: CategoryPageProps) => {
  // Функция для получения продуктов категории
  // Временно возвращает пустой массив, будет заполнена реальными данными позже
  const getCategoryProducts = (_: string): Product[] => {
    // Все категории временно возвращают пустой массив
    return [];
  };

  const getCategoryTitle = (catId: string): string => {
    switch (catId) {
      case 'split': return 'Сплит-системы';
      case 'multi-split': return 'Мультисплит-системы';
      case 'semi-industrial': return 'Полупромышленные системы';
      default: return 'Категория';
    }
  };

  const products = getCategoryProducts(categoryId);

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
        <h1 className="text-3xl font-bold">{getCategoryTitle(categoryId)}</h1>
      </div>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {/* Изображение кондиционера */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{product.name}</h3>
                <div className="space-y-2 mb-4">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Площадь:</span>
                    <span className="font-medium">{product.area}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Цвет:</span>
                    <span className="font-medium">{product.color}</span>
                  </p>
                  <p className="flex justify-between text-lg">
                    <span className="text-gray-600">Цена:</span>
                    <span className="font-bold text-blue-600">{product.price.toLocaleString()} ₽</span>
                  </p>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <h3 className="text-2xl font-semibold mb-2">Каталог пуст</h3>
          <p className="text-gray-600 mb-6">В данной категории пока нет товаров. Скоро здесь появятся модели кондиционеров.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
