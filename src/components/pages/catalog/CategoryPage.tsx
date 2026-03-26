import { ArrowLeft, ChevronDown, Filter } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { products, Product } from '../../../data/productData';
import OrderModal from '@/components/ui/OrderModal';

// Типы фильтров
interface FilterState {
  category: string;
  power: string[];
  brand: string[];
  priceRange: string;
}

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{name: string, model?: string, price?: string | number} | null>(null);
  
  // Состояние фильтров
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    power: [],
    brand: [],
    priceRange: 'all'
  });

  // Состояние аккордеона
  const [openAccordion, setOpenAccordion] = useState<string | null>('power');

  const getCategoryTitle = (catId: string): string => {
    switch (catId) {
      case 'split': return 'Сплит-системы';
      case 'multi-split': return 'Мультисплит-системы';
      case 'semi-industrial': return 'Полупромышленные системы';
      default: return 'Категория';
    }
  };

  const getBrand = (seriesName: string): string => {
    if (seriesName.includes('INTEGRA') || seriesName.includes('INFINI')) {
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

  const getPowerCategory = (power: string): string => {
    const p = parseInt(power);
    if (p <= 9) return '07-09';
    if (p <= 12) return '12';
    if (p <= 18) return '18';
    if (p <= 24) return '24';
    return 'other';
  };

  const allCategoryProducts = products[categoryId || ''] || [];

  // Фильтрация продуктов
  const filteredProducts = allCategoryProducts.filter(product => {
    const power = getPowerFromModel(product);
    const powerCat = getPowerCategory(power);
    const brand = getBrand(product.name);

    // Фильтр по мощности
    if (filters.power.length > 0 && !filters.power.includes(powerCat)) {
      return false;
    }

    // Фильтр по бренду
    if (filters.brand.length > 0 && !filters.brand.includes(brand)) {
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

  const createSeriesSlug = (seriesName: string): string => {
    return seriesName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };
  
  const groupedBySeries = filteredProducts.reduce((acc: { [key: string]: Product[] }, product) => {
    const seriesSlug = createSeriesSlug(product.name);
    if (!acc[seriesSlug]) {
      acc[seriesSlug] = [];
    }
    acc[seriesSlug].push(product);
    return acc;
  }, {});

  const handleSeriesSelect = (seriesSlug: string) => {
    navigate(`/catalog/${categoryId}/${seriesSlug}`);
  };

  const handleBack = () => {
    navigate('/catalog');
  };

  const handleOrderClick = (e: React.MouseEvent, productName: string, productModel?: string, price?: string | number) => {
    e.stopPropagation();
    setSelectedProduct({ name: productName, model: productModel, price });
    setIsModalOpen(true);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const togglePowerFilter = (power: string) => {
    setFilters(prev => ({
      ...prev,
      power: prev.power.includes(power)
        ? prev.power.filter(p => p !== power)
        : [...prev.power, power]
    }));
  };

  const toggleBrandFilter = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brand: prev.brand.includes(brand)
        ? prev.brand.filter(b => b !== brand)
        : [...prev.brand, brand]
    }));
  };

  const setPriceRange = (range: string) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      power: [],
      brand: [],
      priceRange: 'all'
    });
  };

  const pageTitle = getCategoryTitle(categoryId || '');

  // Подсчёт товаров по фильтрам
  const powerCounts = {
    '07-09': allCategoryProducts.filter(p => getPowerCategory(getPowerFromModel(p)) === '07-09').length,
    '12': allCategoryProducts.filter(p => getPowerCategory(getPowerFromModel(p)) === '12').length,
    '18': allCategoryProducts.filter(p => getPowerCategory(getPowerFromModel(p)) === '18').length,
    '24': allCategoryProducts.filter(p => getPowerCategory(getPowerFromModel(p)) === '24').length,
  };

  const brandCounts = {
    'MDV': allCategoryProducts.filter(p => getBrand(p.name) === 'MDV').length,
    'Mitsubishi Heavy': allCategoryProducts.filter(p => getBrand(p.name) === 'Mitsubishi Heavy').length,
  };

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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Боковая панель фильтров */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
            <div className="flex items-center justify-between mb-4 pb-3 border-b">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Фильтры</h3>
              </div>
              {(filters.power.length > 0 || filters.brand.length > 0 || filters.priceRange !== 'all') && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Сбросить
                </button>
              )}
            </div>

            {/* Фильтр по мощности */}
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
                      onChange={() => togglePowerFilter('07-09')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">7 000 - 9 000</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{powerCounts['07-09']}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      checked={filters.power.includes('12')}
                      onChange={() => togglePowerFilter('12')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">12 000</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{powerCounts['12']}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      checked={filters.power.includes('18')}
                      onChange={() => togglePowerFilter('18')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">18 000</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{powerCounts['18']}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      checked={filters.power.includes('24')}
                      onChange={() => togglePowerFilter('24')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">24 000</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{powerCounts['24']}</span>
                  </label>
                </div>
              )}
            </div>

            {/* Фильтр по бренду */}
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
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      checked={filters.brand.includes('MDV')}
                      onChange={() => toggleBrandFilter('MDV')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">MDV</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{brandCounts['MDV']}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      checked={filters.brand.includes('Mitsubishi Heavy')}
                      onChange={() => toggleBrandFilter('Mitsubishi Heavy')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">Mitsubishi Heavy</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{brandCounts['Mitsubishi Heavy']}</span>
                  </label>
                </div>
              )}
            </div>

            {/* Фильтр по цене */}
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
          {Object.keys(groupedBySeries).length > 0 ? (
            <>
              <p className="text-gray-600 mb-6">Найдено {filteredProducts.length} товаров</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Object.entries(groupedBySeries).map(([seriesSlug, seriesProducts]) => {
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

export default CategoryPage;
