import { ArrowRight, Snowflake, Thermometer, Zap, Wind, Star, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Анимированный фон с частицами */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Множество плавающих элементов */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-lg rotate-45 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-20 w-8 h-8 bg-cyan-300/40 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-60 right-40 w-6 h-6 bg-purple-400/30 rotate-12 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-blue-500/10 rounded-lg animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Анимированные частицы */}
        <div className="absolute top-32 left-1/3 w-3 h-3 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}></div>
        <div className="absolute top-80 left-1/2 w-2 h-2 bg-blue-400/50 rounded-full animate-ping" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-32 left-16 w-4 h-4 bg-cyan-300/30 rounded-full animate-bounce" style={{ animationDelay: '4s' }}></div>
        
        {/* Градиентные пятна с анимацией */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDuration: '10s' }}></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-float" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
        
        {/* Движущиеся линии */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-shimmer"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-shimmer" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
        {/* Левая часть: Ультра-улучшенный текстовый блок */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 md:py-24 px-4 relative overflow-hidden">
          {/* Анимированные декоративные линии */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-500 animate-shimmer"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-shimmer" style={{ animationDelay: '1s' }}></div>
          
          {/* Движущиеся декоративные элементы */}
          <div className="absolute top-10 right-10 w-32 h-32 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 border border-white/20 rounded-lg rotate-45 animate-pulse"></div>
          
          <div className="flex flex-col items-center justify-center h-full max-w-xl mx-auto text-center relative z-10">
            {/* Анимированные иконки климатической техники */}
            <div className="flex space-x-4 mb-6 opacity-80">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm animate-float hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <Snowflake className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
              </div>
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm animate-float hover:bg-white/20 transition-all duration-300 cursor-pointer group" style={{ animationDelay: '0.5s' }}>
                <Thermometer className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm animate-float hover:bg-white/20 transition-all duration-300 cursor-pointer group" style={{ animationDelay: '1s' }}>
                <Wind className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm animate-float hover:bg-white/20 transition-all duration-300 cursor-pointer group" style={{ animationDelay: '1.5s' }}>
                <Zap className="w-6 h-6 group-hover:scale-125 transition-transform duration-300" />
              </div>
            </div>

            {/* Заголовок с продвинутыми анимациями */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="inline-block animate-fade-in-up bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent hover:from-cyan-200 hover:to-white transition-all duration-1000">
                Комфортный климат
              </span>
              <br />
              <span className="inline-block text-white animate-fade-in-up hover:text-blue-100 transition-colors duration-500" style={{ animationDelay: '0.2s' }}>
                для вашего дома и офиса
              </span>
            </h1>
            
            {/* Подзаголовок с типографическими эффектами */}
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in-up hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.4s' }}>
              Профессиональная установка и обслуживание кондиционеров в 
              <span className="text-cyan-300 font-semibold hover:text-white transition-colors duration-300 cursor-default"> Солнечногорске</span>
            </p>
            
            {/* Супер-улучшенная кнопка */}
            <Link 
              to="/catalog" 
              className="group relative inline-flex items-center bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-110 hover:shadow-2xl animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              {/* Множественные светящиеся эффекты */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              
              {/* Анимированный shimmer эффект */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
              
              <span className="relative z-10 group-hover:text-blue-800 transition-colors duration-300">Выбрать кондиционер</span>
              <ArrowRight className="relative z-10 ml-3 h-5 w-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
              
              {/* Дополнительные декоративные элементы */}
              <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transitionDelay: '0.1s' }}></div>
            </Link>

            {/* Расширенная дополнительная информация */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm opacity-80">
              <div className="flex items-center group cursor-default">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse group-hover:animate-bounce"></div>
                <span className="group-hover:text-green-300 transition-colors duration-300">Гарантия 3 года</span>
              </div>
              <div className="flex items-center group cursor-default">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse group-hover:animate-bounce" style={{ animationDelay: '1s' }}></div>
                <span className="group-hover:text-yellow-300 transition-colors duration-300">Работаем с 2011 года</span>
              </div>
              <div className="flex items-center group cursor-default">
                <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2 animate-pulse group-hover:animate-bounce" style={{ animationDelay: '2s' }}></div>
                <span className="group-hover:text-cyan-300 transition-colors duration-300">Установка за 1 день</span>
              </div>
            </div>

            {/* Анимированные звёздочки */}
            <div className="absolute top-20 left-5 opacity-30">
              <Star className="w-4 h-4 text-white animate-ping" style={{ animationDelay: '2s' }} />
            </div>
            <div className="absolute bottom-20 right-5 opacity-20">
              <Star className="w-3 h-3 text-cyan-300 animate-pulse" style={{ animationDelay: '4s' }} />
            </div>
            <div className="absolute top-1/2 left-2 opacity-40">
              <Circle className="w-2 h-2 text-blue-300 animate-bounce" style={{ animationDelay: '3s' }} />
            </div>
          </div>
        </div>
        
        {/* Правая часть: Максимально улучшенное изображение */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden group">
          {/* Анимированная декоративная сетка */}
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
            <div className="w-full h-full animate-pulse" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Множество плавающих интерактивных элементов */}
          <div className="absolute top-10 right-10 w-8 h-8 bg-blue-500/20 rounded-full animate-bounce-gentle hover:bg-blue-500/40 transition-colors duration-300"></div>
          <div className="absolute bottom-20 right-20 w-6 h-6 bg-cyan-500/30 rounded-full animate-float hover:bg-cyan-500/50 transition-colors duration-300"></div>
          <div className="absolute top-1/2 right-5 w-4 h-4 bg-blue-400/40 rounded-full animate-ping hover:bg-blue-400/60 transition-colors duration-300"></div>
          <div className="absolute top-1/3 left-10 w-5 h-5 bg-purple-400/30 rotate-45 animate-spin hover:bg-purple-400/50 transition-colors duration-300" style={{ animationDuration: '6s' }}></div>
          <div className="absolute bottom-1/3 left-20 w-7 h-7 bg-cyan-300/25 rounded-lg animate-pulse hover:bg-cyan-300/45 transition-colors duration-300"></div>
          
          {/* Движущиеся световые лучи */}
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-blue-300/30 to-transparent animate-shimmer" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent animate-shimmer" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>

          {/* Основное изображение с продвинутыми эффектами */}
          <div className="relative h-full">
            <img 
              src="/images/conditioner.png" 
              alt="Кондиционер в современном интерьере" 
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110 filter group-hover:contrast-110"
            />
            
            {/* Множественные градиентные оверлеи */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-blue-600/5 group-hover:from-blue-900/20 transition-all duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cyan-500/5 group-hover:to-cyan-500/10 transition-all duration-700"></div>
            
            {/* Анимированные частицы поверх изображения */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-400/50 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-cyan-300/70 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDelay: '1.5s' }}></div>
            
            {/* Интерактивные точки-хотспоты */}
            <div className="absolute top-1/3 right-1/3 group/hotspot">
              <div className="w-4 h-4 bg-blue-500/60 rounded-full animate-ping cursor-pointer"></div>
              <div className="absolute -top-8 -left-12 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Современный дизайн
              </div>
            </div>
            
            <div className="absolute bottom-1/3 left-1/4 group/hotspot">
              <div className="w-4 h-4 bg-green-500/60 rounded-full animate-pulse cursor-pointer"></div>
              <div className="absolute -top-8 -left-8 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Тихая работа
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
