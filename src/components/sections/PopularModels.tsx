import { ArrowRight, Star, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/productData';
import { Product } from '../../data/productData';

const PopularModels = () => {
  // Выбираем популярные модели из реальных данных
  const splitProducts = products['split'] || [];
  
  // Ищем конкретные модели, если не найдены - берём первые 4
  let popularModels: Product[] = [
    splitProducts.find(p => p.id === 'integra-inverter-07') || splitProducts[0],
    splitProducts.find(p => p.id === 'integra-inverter-09') || splitProducts[1], 
    splitProducts.find(p => p.id === 'integra-inverter-12') || splitProducts[2],
    splitProducts.find(p => p.id === 'integra-pro-09') || splitProducts.find(p => p.name.includes('Pro')) || splitProducts[3],
  ].filter((model): model is Product => Boolean(model) && typeof model === 'object' && 'id' in model && 'name' in model);
  
  // Если моделей меньше 4, дополняем оставшимися
  if (popularModels.length < 4) {
    const remaining = splitProducts
      .filter(p => !popularModels.some(m => m.id === p.id))
      .slice(0, 4 - popularModels.length);
    popularModels = [...popularModels, ...remaining];
  }
  
  popularModels = popularModels.slice(0, 4); // Максимум 4 модели

  // Функция для получения площади охлаждения по мощности
  const getCoolingArea = (productName: string): string => {
    const powerMatch = productName.match(/(\d+)/);
    if (!powerMatch) return "до 25 м²";
    
    const power = parseInt(powerMatch[1]);
    if (power <= 7) return "до 25 м²";
    if (power <= 9) return "до 30 м²";
    if (power <= 12) return "до 35 м²";
    if (power <= 18) return "до 50 м²";
    return "до 60 м²";
  };

  // Функция для определения бейджа модели
  const getModelBadge = (productName: string): { text: string; color: string } => {
    if (productName.includes('Pro')) return { text: 'ПРЕМИУМ', color: 'bg-purple-500' };
    return { text: 'ХИТ', color: 'bg-green-500' };
  };

  // Функция для создания slug серии (не модели!)
  const createSeriesSlug = (name: string): string => {
    // Создаем slug из названия серии
    if (name.includes('Pro Black')) {
      return 'integra-pro-black';
    } else if (name.includes('Pro')) {
      return 'integra-pro';
    } else if (name.includes('Mitsubishi Heavy')) {
      return 'mitsubishi-heavy-deluxe';
    } else {
      return 'integra-inverter';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-100/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-100/20 rounded-full blur-xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок секции с анимацией */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Популярные модели
            </span>
          </h2>
          <p className="text-gray-600 text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Кондиционеры с установкой "под ключ"
          </p>
          
          {/* Декоративная линия */}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full animate-fade-in-up" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        {/* Сетка продуктов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularModels.map((model, index) => {
            // Проверяем что модель существует
            if (!model) return null;
            
            const badge = getModelBadge(model.name);
            const area = getCoolingArea(model.model);
            const seriesSlug = createSeriesSlug(model.name);
            
            return (
              <div 
                key={model.id} 
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${0.6 + index * 0.2}s` }}
              >
                {/* Бейдж модели */}
                <div className={`absolute top-4 left-4 ${badge.color} text-white text-xs font-bold px-3 py-1 rounded-full z-20 animate-pulse`}>
                  {badge.text}
                </div>

                {/* Рейтинг звёзд */}
                <div className="absolute top-4 right-4 flex space-x-1 z-20">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-3 h-3 text-yellow-400 fill-current animate-pulse" 
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                
                {/* Контейнер изображения */}
                <div className="relative h-48 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
                  {/* Декоративные элементы */}
                  <div className="absolute top-2 right-2 w-8 h-8 bg-blue-200/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-cyan-200/40 rounded-full animate-pulse"></div>
                  
                  {/* Основное изображение */}
                  <img 
                    src={model.images?.[0] || '/images/conditioner.png'} 
                    alt={model.name}
                    className="w-full h-full object-contain p-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== '/images/conditioner.png') {
                        target.src = '/images/conditioner.png';
                      }
                      target.onerror = null;
                    }}
                  />

                  {/* Градиентный оверлей при hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Иконки функций при hover */}
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="p-2 bg-white/90 rounded-full shadow-lg">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="p-2 bg-white/90 rounded-full shadow-lg">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </div>
                
                {/* Информация о продукте */}
                <div className="p-6 relative">
                  {/* Фоновый градиент */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      {model.name}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Площадь:</span>
                        <span className="font-medium text-blue-600">{area}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Тип:</span>
                        <span className="font-medium">Сплит-система</span>
                      </div>
                    </div>
                    
                    {/* Цена и кнопка */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">от</p>
                        <span className="font-bold text-xl text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                          {typeof model.price === 'number' ? model.price.toLocaleString() : '0'} ₽
                        </span>
                      </div>
                      
                      <Link 
                        to={`/catalog/split/${seriesSlug}`}
                        className="group/btn flex items-center text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105"
                        onClick={(e) => {
                          if (!seriesSlug) {
                            e.preventDefault();
                            console.error('Invalid series slug');
                          }
                        }}
                      >
                        <span>Подробнее</span>
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Эффект свечения при hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
        
        {/* Кнопка "Перейти в каталог" */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
          <Link 
            to="/catalog" 
            className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Светящийся эффект */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            
            <span className="relative z-10">Перейти в каталог</span>
            <ArrowRight className="relative z-10 ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            
            {/* Shimmer эффект */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularModels;