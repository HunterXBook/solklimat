import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Filter, Phone } from 'lucide-react';
import { products, Product } from '../../data/productData';
import OrderModal from '@/components/ui/OrderModal';

// Все товары из всех категорий
const allProducts = [
  ...products['split'] || [],
  ...products['multi-split'] || [],
  ...products['semi-industrial'] || []
];

// Типы фильтров
interface FilterState {
  systemType: string[];
  brand: string[];
  power: string[];
  priceRange: string;
}

// Бренды
const brands = [
  { id: 'MDV', name: 'MDV' },
  { id: 'Mitsubishi Heavy', name: 'Mitsubishi Heavy' },
  { id: 'Daikin', name: 'Daikin' },
  { id: 'Samsung', name: 'Samsung' },
  { id: 'LG', name: 'LG' },
  { id: 'Haier', name: 'Haier' },
  { id: 'Ballu', name: 'Ballu' }
];

const CatalogPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{name: string, model?: string, price?: string | number} | null>(null);
  
  // Состояние фильтров
  const [filters, setFilters] = useState<FilterState>({
    systemType: [],
    brand: [],
    power: [],
    priceRange: 'all'
  });

  // Состояние аккордеона
  const [openAccordion, setOpenAccordion] = useState<string | null>('systemType');

  const getBrand = (seriesName: string): string => {
    if (seriesName.includes('INTEGRA') || seriesName.includes('INFINI') || seriesName.includes('MDV')) {
      return 'MDV';
    }
    if (seriesName.includes('Mitsubishi')) {
      return 'Mitsubishi Heavy';
    }
    return 'MDV';
  };

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

  const getSystemType = (product: Product): string => {
    // Определяем тип по ID или модели
    if (product.id.includes('multi') || product.model.toLowerCase().includes('multi')) {
      return 'multi-split';
    }
    if (product.id.includes('cassette') || product.id.includes('duct') || product.id.includes('floor')) {
      return 'semi-industrial';
    }
    return 'split';
  };

  const getPowerCategory = (power: string): string => {
    const p = parseInt(power);
    if (p <= 9) return '07-09';
    if (p <= 12) return '12';
    if (p <= 18) return '18';
    if (p <= 24) return '24';
    return 'other';
  };

  // Фильтрация продуктов
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const power = getPowerFromModel(product);
      const powerCat = getPowerCategory(power);
      const brand = getBrand(product.name);
      const systemType = getSystemType(product);

      // Фильтр по типу системы
      if (filters.systemType.length > 0 && !filters.systemType.includes(systemType)) {
        return false;
      }

      // Фильтр по бренду
      if (filters.brand.length > 0 && !filters.brand.includes(brand)) {
        return false;
      }

      // Фильтр по мощности
      if (filters.power.length > 0 && !filters.power.includes(powerCat)) {
        return false;
      }

      // Фильтр по цене
      if (filters.priceRange !== 'all') {
        const price = typeof product.price === 'number' ? product.price : 0;
        switch (filters.priceRange) {
          case 'under30':
            if (price >= 30000) return false;
            break;
          case '30to50':
            if (price < 30000 || price >= 50000) return false;
            break;
          case '50to80':
            if (price < 50000 || price >= 80000) return false;
            break;
          case 'over80':
            if (price < 80000) return false;
            break;
        }
      }

      return true;
    });
  }, [filters]);

  // Группировка по сериям
  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce((acc: { [key: string]: Product[] }, product) => {
      const key = product.name;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(product);
      return acc;
    }, {});
  }, [filteredProducts]);

  const handleOrderClick = (e: React.MouseEvent, productName: string, productModel?: string, price?: string | number) => {
    e.stopPropagation();
    setSelectedProduct({ name: productName, model: productModel, price });
    setIsModalOpen(true);
  };

  const handleProductClick = (product: Product) => {
    const systemType = getSystemType(product);
    const seriesSlug = product.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/catalog/${systemType}/${seriesSlug}`);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const toggleFilter = (type: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[type] as string[];
      return {
        ...prev,
        [type]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value]
      };
    });
  };

  const setPriceRange = (range: string) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  const clearFilters = () => {
    setFilters({
      systemType: [],
      brand: [],
      power: [],
      priceRange: 'all'
    });
  };

  // Подсчёты для фильтров
  const systemTypeCounts = {
    'split': allProducts.filter(p => getSystemType(p) === 'split').length,
    'multi-split': allProducts.filter(p => getSystemType(p) === 'multi-split').length,
    'semi-industrial': allProducts.filter(p => getSystemType(p) === 'semi-industrial').length,
  };

  const brandCounts = brands.reduce((acc, brand) => {
    acc[brand.id] = allProducts.filter(p => getBrand(p.name) === brand.id).length;
    return acc;
  }, {} as Record<string, number>);

  const powerCounts = {
    '07-09': allProducts.filter(p => getPowerCategory(getPowerFromModel(p)) === '07-09').length,
    '12': allProducts.filter(p => getPowerCategory(getPowerFromModel(p)) === '12').length,
    '18': allProducts.filter(p => getPowerCategory(getPowerFromModel(p)) === '18').length,
    '24': allProducts.filter(p => getPowerCategory(getPowerFromModel(p)) === '24').length,
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">Каталог кондиционеров</h1>
      <p className="text-gray-600 text-center mb-8">Найдено {filteredProducts.length} товаров</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Боковая панель фильтров */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
            <div className="flex items-center justify-between mb-4 pb-3 border-b">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Фильтры</h3>
              </div>
              {(filters.systemType.length > 0 || filters.brand.length > 0 || filters.power.length > 0 || filters.priceRange !== 'all') && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Сбросить
                </button>
              )}
            </div>

            {/* Тип системы */}
            <div className="mb-4 border-b pb-4">
              <button 
                onClick={() => toggleAccordion('systemType')}
                className="w-full flex items-center justify-between py-2 text-left font-medium"
              >
                <span>Тип системы</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openAccordion === 'systemType' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'systemType' && (
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      checked={filters.systemType.includes('split')}
                      onChange={() => toggleFilter('systemType', 'split')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">Сплит-системы</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{systemTypeCounts['split']}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      checked={filters.systemType.includes('multi-split')}
                      onChange={() => toggleFilter('systemType', 'multi-split')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">Мультисплит-системы</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{systemTypeCounts['multi-split']}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      checked={filters.systemType.includes('semi-industrial')}
                      onChange={() => toggleFilter('systemType', 'semi-industrial')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">Полупромышленные</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{systemTypeCounts['semi-industrial']}</span>
                  </label>
                </div>
              )}
            </div>

            {/* Бренд */}
            <div className="mb-4 border-b pb-4">
              <button 
                onClick={() => toggleAccordion('brand')}
                className="w-full flex items-center justify-between py-2 text-left font-medium"
              >
                <span>Бренд</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openAccordion === 'brand' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'brand' && (
                <div className="mt-2 space-y-2">
                  {brands.map(brand => (
                    <label key={brand.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <input 
                        type="checkbox" 
                        checked={filters.brand.includes(brand.id)}
                        onChange={() => toggleFilter('brand', brand.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm flex-1">{brand.name}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{brandCounts[brand.id] || 0}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Мощность */}
            <div className="mb-4 border-b pb-4">
              <button 
                onClick={() => toggleAccordion('power')}
                className="w-full flex items-center justify-between py-2 text-left font-medium"
              >
                <span>Мощность (BTU)</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openAccordion === 'power' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'power' && (
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      checked={filters.power.includes('07-09')}
                      onChange={() => toggleFilter('power', '07-09')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">7 000 - 9 000</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{powerCounts['07-09']}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      checked={filters.power.includes('12')}
                      onChange={() => toggleFilter('power', '12')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">12 000</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{powerCounts['12']}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      checked={filters.power.includes('18')}
                      onChange={() => toggleFilter('power', '18')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">18 000</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{powerCounts['18']}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      checked={filters.power.includes('24')}
                      onChange={() => toggleFilter('power', '24')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">24 000</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{powerCounts['24']}</span>
                  </label>
                </div>
              )}
            </div>

            {/* Цена */}
            <div>
              <button 
                onClick={() => toggleAccordion('price')}
                className="w-full flex items-center justify-between py-2 text-left font-medium"
              >
                <span>Цена</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openAccordion === 'price' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'price' && (
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="radio" 
                      name="price"
                      checked={filters.priceRange === 'all'}
                      onChange={() => setPriceRange('all')}
                      className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Все цены</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="radio" 
                      name="price"
                      checked={filters.priceRange === 'under30'}
                      onChange={() => setPriceRange('under30')}
                      className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">До 30 000 ₽</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="radio" 
                      name="price"
                      checked={filters.priceRange === '30to50'}
                      onChange={() => setPriceRange('30to50')}
                      className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">30 000 - 50 000 ₽</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="radio" 
                      name="price"
                      checked={filters.priceRange === '50to80'}
                      onChange={() => setPriceRange('50to80')}
                      className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">50 000 - 80 000 ₽</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="radio" 
                      name="price"
                      checked={filters.priceRange === 'over80'}
                      onChange={() => setPriceRange('over80')}
                      className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">От 80 000 ₽</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Сетка товаров */}
        <div className="flex-1">
          {Object.keys(groupedProducts).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Object.entries(groupedProducts).map(([seriesName, seriesProducts]) => {
                const firstProduct = seriesProducts[0];
                const variantsCount = seriesProducts.length;
                const numericPrices = seriesProducts.map(p => p.price).filter(p => typeof p === 'number') as number[];
                const stringPrices = seriesProducts.map(p => p.price).filter(p => typeof p === 'string') as string[];
                let minPrice: number | string = 0;
                let maxPrice: number | string = 0;
                if (stringPrices.length > 0) {
                  minPrice = stringPrices[0];
                  maxPrice = stringPrices[0];
                } else if (numericPrices.length > 0) {
                  minPrice = Math.min(...numericPrices);
                  maxPrice = Math.max(...numericPrices);
                }
                const brand = getBrand(firstProduct.name);
                
                const powers = seriesProducts.map(p => getPowerFromModel(p)).filter(p => p).sort();
                const powerRange = powers.length > 1 ? `${powers[0]}-${powers[powers.length - 1]}` : powers[0] || '';
                
                return (
                  <div
                    key={seriesName}
                    className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div 
                      className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer"
                      onClick={() => handleProductClick(firstProduct)}
                    >
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
                        <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <p>Изображение {firstProduct.name}</p>
                      </div>
                      
                      <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        Инвертор
                      </div>
                      
                      <div className="absolute top-3 right-3 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded">
                        {brand}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {firstProduct.name} {powerRange}
                      </h3>
                      <p className="text-gray-600 mb-3">{variantsCount} вариант{variantsCount > 1 ? (variantsCount < 5 ? 'а' : 'ов') : ''} мощности</p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-500">
                          Цена:
                        </div>
                        <div className="font-bold text-blue-600">
                          {minPrice === maxPrice 
                            ? (typeof minPrice === 'number' ? `${minPrice.toLocaleString()} ₽` : minPrice)
                            : (typeof minPrice === 'number' ? `от ${minPrice.toLocaleString()} ₽` : minPrice)
                          }
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mb-4">
                        <div className="flex justify-between">
                          <span>Цвет корпуса:</span>
                          <span className="font-medium">{firstProduct.color}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={(e) => handleOrderClick(e, `${firstProduct.name} ${powerRange}`, undefined, minPrice === maxPrice ? minPrice : undefined)}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          Заказать
                        </button>
                        <button
                          onClick={() => handleProductClick(firstProduct)}
                          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
                        >
                          Подробнее
                        </button>
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
              <h3 className="text-2xl font-semibold mb-2">Товары не найдены</h3>
              <p className="text-gray-600 mb-4">Попробуйте изменить фильтры</p>
              <button 
                onClick={clearFilters}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно заказа */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={selectedProduct?.name || ''}
        productModel={selectedProduct?.model}
        productPrice={selectedProduct?.price}
      />
    </div>
  );
};

export default CatalogPage;
