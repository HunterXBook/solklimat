import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, Product } from '../../../data/productData';
import ProductCard from './ProductCard';
import ImageGallery from './ImageGallery';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  
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
  
  // Функция для определения бренда
  const getBrand = (productName: string): string => {
    if (productName.startsWith('INTEGRA')) return 'MDV';
    return productName.split(' ')[0];
  };
  
  // Добавляем фильтры для будущих брендов
  const allBrands = ['MDV', 'Mitsubishi', 'Hisense'];

  // Группируем продукты по моделям
  const groupedProducts = allCategoryProducts.reduce((acc: { [key: string]: Product[] }, product) => {
    if (!acc[product.model]) {
      acc[product.model] = [];
    }
    acc[product.model].push(product);
    return acc;
  }, {});

  // Фильтруем модели по бренду
  const filteredModels = selectedBrand
    ? Object.entries(groupedProducts).filter(([_, products]) => 
        products.some(product => getBrand(product.name) === selectedBrand)
      )
    : Object.entries(groupedProducts);

  // Обработчик выбора продукта
  const handleProductSelect = (productId: string) => {
    const product = allCategoryProducts.find(p => p.id === productId) || null;
    setSelectedProduct(product);
  };

  // Обработчик возврата к списку продуктов
  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  // Обработчик возврата к категориям
  const handleBack = () => {
    navigate('/catalog');
  };

  // Определяем заголовок страницы
  const pageTitle = getCategoryTitle(categoryId || '');

  // Определяем текст для кнопки "Назад"
  const backButtonText = selectedProduct 
    ? 'Назад к списку' 
    : 'Назад к категориям';

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center mb-8">
        <button 
          onClick={selectedProduct ? handleBackToProducts : handleBack}
          className="flex items-center text-blue-600 font-medium mr-4 hover:text-blue-800 transition-colors"
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
                  <span className="text-gray-600">Бренд:</span>
                  <span className="font-medium">{getBrand(selectedProduct.name)}</span>
                </div>
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
                <p className="text-justify">Серия INTEGRA от MDV — это современные климатические системы, разработанные для профессионального охлаждения и обогрева помещений с использованием современных технологий.</p>
                <p className="text-justify">Полностью инверторная сплит-система оснащена интеллектуальной системой охлаждения, встроенным Wi-Fi-модулем и функцией искусственного интеллекта. Алгоритм AI ECOMASTER анализирует привычки пользователя и параметры среды, автоматически подбирая оптимальные настройки для максимального комфорта при минимальном энергопотреблении.</p>
                <p className="text-justify">Внутренний блок с матовым покрытием отличается лаконичным и стильным дизайном, гармонично вписываясь в современный интерьер. Система очистки воздуха включает биполярный ионизатор Air Magic, фотокаталитический и комбинированный фильтры, эффективно устраняющие вирусы и вредные микрочастицы.</p>
              </div>
            </div>
            
            {/* Характеристики */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Ключевые особенности</h3>
                <ul className="space-y-2">
                  {selectedProduct.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
        <>
          {/* Фильтры по бренду */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Фильтр по бренду</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSelectedBrand(null)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  !selectedBrand
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Все бренды ({Object.keys(groupedProducts).length})
              </button>
              {allBrands.map((brand) => {
                const brandCount = Object.entries(groupedProducts).filter(([_, products]) => 
                  products.some(product => getBrand(product.name) === brand)
                ).length;
                const isDisabled = brandCount === 0;
                return (
                  <button
                    key={brand}
                    onClick={() => !isDisabled && setSelectedBrand(brand)}
                    disabled={isDisabled}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedBrand === brand
                        ? 'bg-blue-600 text-white'
                        : isDisabled
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {brand} ({brandCount})
                  </button>
                );
              })}
            </div>
          </div>

          {filteredModels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredModels.map(([model, modelProducts]) => {
                const firstProduct = modelProducts[0];
                return (
                  <ProductCard 
                    key={model}
                    id={firstProduct.id}
                    name={firstProduct.name}
                    model={model}
                    image={firstProduct.images[0]}
                    price={firstProduct.price}
                    color={firstProduct.color}
                    brand={getBrand(firstProduct.name)}
                    onSelect={handleProductSelect}
                  />
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-10 text-center">
              <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <h3 className="text-2xl font-semibold mb-2">Продукты не найдены</h3>
              <p className="text-gray-600 mb-6">По выбранному бренду продукты не найдены.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;