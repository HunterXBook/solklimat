import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { products, Product } from '../../../data/productData';
import ImageGallery from './ImageGallery';
import OrderModal from '@/components/ui/OrderModal';

export default function ModelPage() {
  const { categoryId, modelId } = useParams<{ categoryId: string; modelId: string }>();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [seriesNameOverride, setSeriesNameOverride] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функция для получения названия серии по slug
  const getSeriesNameFromSlug = (slug: string): string => {
    const slugToNameMap: { [key: string]: string } = {
      'integra-inverter': 'INTEGRA Inverter',
      'integra-pro': 'INTEGRA Pro',
      'integra-pro-black': 'INTEGRA Pro Black',
      'mitsubishi-heavy-deluxe': 'Mitsubishi Heavy Deluxe',
      'infini-uvpro-inverter': 'INFINI UVpro Inverter',
      'mdv-classic-inverter': 'MDV Classic Inverter',
      'infini-standard-inverter': 'INFINI Standard Inverter'
    };
    
    // Прямое совпадение
    if (slugToNameMap[slug]) {
      return slugToNameMap[slug];
    }
    
    // Поиск среди всех продуктов (case-insensitive)
    const allProducts = Object.values(products).flat();
    const matchedProduct = allProducts.find(p => 
      p.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
    );
    
    if (matchedProduct) {
      return matchedProduct.name;
    }
    
    // Возвращаем slug с заглавной буквы как fallback
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  // Функция для определения бренда по названию серии
  const getBrand = (seriesName: string): string => {
    if (seriesName.includes('INTEGRA') || seriesName.includes('INFINI') || seriesName.includes('MDV Classic')) {
      return 'MDV';
    }
    if (seriesName.includes('Mitsubishi')) {
      return 'Mitsubishi Heavy';
    }
    return 'MDV'; // По умолчанию
  };

  // Функция для извлечения мощности из модели
  const getPowerFromModel = (product: Product): string => {
    if (product.name === 'Mitsubishi Heavy Deluxe') {
      const modelNumber = product.model.split('/')[0];
      if (modelNumber.includes('20')) return '07';
      else if (modelNumber.includes('25')) return '09';
      else if (modelNumber.includes('35')) return '12';
      else if (modelNumber.includes('50')) return '18';
      else if (modelNumber.includes('60')) return '24';
    } else {
      const powerMatch = product.model.match(/(\d+)/);
      return powerMatch ? powerMatch[1] : '';
    }
    return '';
  };

  // Функция для обработки заказа
  const handleOrderClick = () => {
    setIsModalOpen(true);
  };

  if (!categoryId || !modelId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Серия не найдена</h1>
      </div>
    );
  }

  // Получаем продукты для текущей категории
  const categoryProducts = products[categoryId] || [];
  
  // Проверяем, является ли modelId id модели
  useEffect(() => {
    const product = categoryProducts.find((p: Product) => p.id === modelId);
    if (product) {
      setSeriesNameOverride(product.name); // product.name — это название серии
      setSelectedProduct(product.id);
    } else {
      setSeriesNameOverride(null);
      setSelectedProduct(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelId, categoryId]);

  // Получаем название серии из slug
  const seriesName = seriesNameOverride || getSeriesNameFromSlug(modelId);
  
  // Фильтруем продукты по названию серии
  const seriesProducts = categoryProducts.filter(
    (product: Product) => product.name === seriesName
  );

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
    // Если пользователь вручную выбирает другую модель, убираем seriesNameOverride
    setSeriesNameOverride(null);
  };

  const handleBack = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
    } else {
      navigate(`/catalog/${categoryId}`);
    }
  };

  const selectedProductData = selectedProduct
    ? seriesProducts.find((p: Product) => p.id === selectedProduct)
    : null;

  const pageTitle = selectedProductData?.name || seriesName;
  const backButtonText = selectedProduct ? 'Назад к сериям' : 'Назад к категории';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {backButtonText}
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8">{pageTitle}</h1>

      {!selectedProduct ? (
        <>
          {seriesProducts.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600 text-lg">
                  Выберите подходящую мощность из {seriesProducts.length} доступных вариантов серии {seriesName}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seriesProducts.map((product: Product) => {
                  // Извлекаем мощность из модели для отображения
                  const power = getPowerFromModel(product);

                  const brand = getBrand(product.name);
                  
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product.id)}
                      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
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
                          {brand}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">
                          {product.name} {power}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{product.model}</p>
                        
                        {/* Основные характеристики */}
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Мощность охлаждения:</span>
                            <span className="font-medium">
                              {product.specs.find(s => s.name.includes('холодопроизводительность'))?.value || 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Энергоэффективность:</span>
                            <span className="font-medium">
                              {product.specs.find(s => s.name.includes('энергоэффективности (охлаждение)'))?.value || 'A'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Уровень шума:</span>
                            <span className="font-medium">
                              {product.specs.find(s => s.name.includes('Уровень шума внутреннего блока, минимальный'))?.value || 
                               product.specs.find(s => s.name.includes('Уровень шума внутреннего блока'))?.value || 'N/A'}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-blue-600">
                            {typeof product.price === 'number' ? `${product.price.toLocaleString()} ₽` : product.price}
                          </span>
                        </div>
                        
                        <div className="flex gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product.id);
                              setTimeout(() => setIsModalOpen(true), 0);
                            }}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                          >
                            Заказать
                          </button>
                          <span className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 text-sm">
                            Подробнее
                            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-10 text-center">
              <h3 className="text-2xl font-semibold mb-2">Продукты серии не найдены</h3>
              <p className="text-gray-600">Возможно, серия временно недоступна или название изменилось.</p>
            </div>
          )}
        </>
      ) : selectedProductData ? (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Изображение и основная информация */}
            <div>
              <div className="mb-6">
                <ImageGallery 
                  images={selectedProductData.images} 
                  alt={selectedProductData.name}
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {selectedProductData.name} {getPowerFromModel(selectedProductData)}
              </h2>
              <p className="text-gray-500 mb-4">{selectedProductData.model}</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Цвет:</span>
                  <span className="font-medium">{selectedProductData.color}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Цена:</span>
                  <span className="text-2xl font-bold text-blue-600">{typeof selectedProductData.price === 'number' ? `${selectedProductData.price.toLocaleString()} ₽` : selectedProductData.price}</span>
                </div>
              </div>
              
              <button 
                onClick={handleOrderClick}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-6"
              >
                Заказать
              </button>

              <div className="text-gray-600 space-y-4">
                {selectedProductData.name === 'INFINI UVpro Inverter' ? (
                  <>
                    <p className="text-justify">
                      Серия инверторных кондиционеров INFINI UVPro разработана для тех, кто ценит не только точный контроль климата, но и заботу о здоровье. Встроенная ультрафиолетовая лампа обеспечивает эффективную стерилизацию воздуха и внутренних элементов, снижая риск распространения вирусов и бактерий.
                    </p>
                    <p className="text-justify">
                      Технология биполярной ионизации Air Magic усиливает обеззараживающее действие: в воздухе образуются положительные и отрицательные ионы, которые нейтрализуют вредные примеси. Дополнительную фильтрацию обеспечивают фотокаталитический и комбинированный фильтры, устраняющие формальдегиды, аммиак и другие неприятные запахи.
                    </p>
                  </>
                ) : selectedProductData.name === 'INFINI Standard Inverter' ? (
                  <>
                    <p className="text-justify">
                      Серия инверторных кондиционеров INFINI Standard создана для тех, кто ценит надежность, функциональность и доступную цену. Система 3D DC-Inverter обеспечивает максимальную энергоэффективность и тихую работу, делая эту серию идеальным выбором для дома и офиса.
                    </p>
                    <p className="text-justify">
                      Биполярный ионизатор Air Magic генерирует до 2 миллионов положительных и отрицательных ионов, эффективно уничтожая вирусы и бактерии в воздухе. Продвинутая 4-ступенчатая система самоочистки и фотокаталитический фильтр с диоксидом титана заботятся о чистоте воздуха и долговечности оборудования.
                    </p>
                  </>
                ) : selectedProductData.name === 'MDV Classic Inverter' ? (
                  <>
                    <p className="text-justify">
                      Серия MDV Classic Inverter — это доступные инверторные сплит-системы с базовым функционалом для бытового использования. Оснащенные надежным компрессором GMCC с технологией DC Inverter, эти кондиционеры обеспечивают стабильную работу и экономное энергопотребление.
                    </p>
                    <p className="text-justify">
                      Система включает фотокаталитический фильтр тонкой очистки с диоксидом титана, функцию Follow Me для точного контроля температуры и продвинутую технологию самоочистки за 4 шага. Защита от замораживания помещения при температуре 8°C и возможность Wi-Fi управления делают эти кондиционеры оптимальным выбором для комфортного климата в доме.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-justify">
                      Серия {selectedProductData.name} от MDV — это современные климатические системы, 
                      разработанные для профессионального охлаждения и обогрева помещений с использованием 
                      современных технологий.
                    </p>
                    <p className="text-justify">
                      Полностью инверторная сплит-система оснащена интеллектуальной системой охлаждения 
                      и функцией энергосбережения. Система автоматически подбирает оптимальные настройки 
                      для максимального комфорта при минимальном энергопотреблении.
                    </p>
                  </>
                )}
              </div>
            </div>
            
            {/* Характеристики */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Ключевые особенности</h3>
                <ul className="space-y-2">
                  {selectedProductData.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Технические характеристики</h3>
                {selectedProductData.specs.length > 0 ? (
                  <div className="border rounded-lg bg-white shadow-sm">
                    <div className="max-h-[500px] overflow-y-auto">
                      {selectedProductData.specs.map((spec, index) => (
                        <div 
                          key={index} 
                          className={`flex justify-between items-start py-3 px-4 border-b border-gray-100 last:border-b-0 ${
                            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          }`}
                        >
                          <span className="text-gray-700 font-medium text-sm leading-5 flex-1 pr-4">
                            {spec.name}:
                          </span>
                          <span className="text-gray-900 font-semibold text-sm text-right flex-1 leading-5">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* Показываем количество характеристик */}
                    <div className="px-4 py-2 bg-gray-50 border-t text-xs text-gray-500 text-center">
                      Всего характеристик: {selectedProductData.specs.length}
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-lg bg-gray-50 p-6 text-center">
                    <p className="text-gray-600">Технические характеристики будут добавлены позже</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Модальное окно заказа */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={selectedProductData ? `${selectedProductData.name} ${getPowerFromModel(selectedProductData)}` : seriesName}
        productModel={selectedProductData?.model}
        productPrice={selectedProductData?.price}
      />
    </div>
  );
}