import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { products, Product } from '../../../data/productData';
import ProductCard from './ProductCard';
import ImageGallery from './ImageGallery';

// Интерфейс для пропсов
interface CategoryPageProps {
  categoryId: string;
  modelFilter?: string;
  onBack: () => void;
}

const CategoryPage = ({ categoryId, modelFilter, onBack }: CategoryPageProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const getCategoryTitle = (catId: string): string => {
    switch (catId) {
      case 'split': return 'Сплит-системы';
      case 'multi-split': return 'Мультисплит-системы';
      case 'semi-industrial': return 'Полупромышленные системы';
      default: return 'Категория';
    }
  };

  // Получаем все продукты для данной категории
  const allCategoryProducts = products[categoryId] || [];
  
  // Фильтруем продукты по модели, если указан modelFilter
  const categoryProducts = modelFilter 
    ? allCategoryProducts.filter(product => product.name === modelFilter)
    : allCategoryProducts;

  // Обработчик выбора продукта
  const handleProductSelect = (productId: string) => {
    const product = categoryProducts.find(p => p.id === productId) || null;
    setSelectedProduct(product);
  };

  // Обработчик возврата к списку продуктов
  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  // Определяем заголовок страницы
  const pageTitle = modelFilter 
    ? modelFilter 
    : getCategoryTitle(categoryId);

  // Определяем текст для кнопки "Назад"
  const backButtonText = selectedProduct 
    ? 'Назад к списку' 
    : (modelFilter ? `Назад к ${getCategoryTitle(categoryId)}` : 'Назад к категориям');

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center mb-8">
        <button 
          onClick={selectedProduct ? handleBackToProducts : onBack}
          className="flex items-center text-blue-600 font-medium mr-4"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          {backButtonText}
        </button>
        <h1 className="text-3xl font-bold">
          {selectedProduct ? selectedProduct.name : pageTitle}
          {selectedProduct && <span className="ml-2 text-gray-500 text-xl">{selectedProduct.model}</span>}
        </h1>
      </div>
      
      {selectedProduct ? (
        // Детальная страница продукта
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Изображение и основная информация */}
            <div>
              <div className="mb-6">
                <ImageGallery 
                  images={selectedProduct.images} 
                  alt={selectedProduct.name}
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
              <p className="text-gray-500 mb-4">{selectedProduct.model}</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Цвет:</span>
                  <span className="font-medium">{selectedProduct.color}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Цена:</span>
                  <span className="text-2xl font-bold text-blue-600">{selectedProduct.price.toLocaleString()} ₽</span>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-6">
                Заказать
              </button>

              <div className="text-gray-600 space-y-4">
                <p>Серия INTEGRA Pro Black от MDV — это новое поколение климатических систем, разработанных для профессионального охлаждения и обогрева помещений с использованием современных технологий.</p>
                <p>Полностью инверторная сплит-система оснащена интеллектуальной системой охлаждения CoolFlash, встроенным Wi-Fi-модулем и функцией искусственного интеллекта. Алгоритм AI ECOMASTER анализирует привычки пользователя и параметры среды, автоматически подбирая оптимальные настройки для максимального комфорта при минимальном энергопотреблении.</p>
                <p>Внутренний блок с матовым чёрным покрытием отличается лаконичным и стильным дизайном, гармонично вписываясь в современный интерьер. Система очистки воздуха включает биполярный ионизатор Air Magic, фотокаталитический и комбинированный фильтры, эффективно устраняющие вирусы и вредные микрочастицы.</p>
              </div>
            </div>
            
            {/* Характеристики */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Ключевые особенности</h3>
                <ul className="space-y-2">
                  {selectedProduct.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Технические характеристики</h3>
                <div className="space-y-2">
                  {selectedProduct.specs.map((spec, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between py-2 ${index % 2 === 0 ? 'bg-gray-50' : ''} px-2 rounded`}
                    >
                      <span className="text-gray-600">{spec.name}:</span>
                      <span className="font-medium text-gray-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Список продуктов категории
        categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryProducts.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                model={product.model}
                image={product.images[0]}
                price={product.price}
                color={product.color}
                onSelect={handleProductSelect}
              />
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
        )
      )}
    </div>
  );
};

export default CategoryPage;
