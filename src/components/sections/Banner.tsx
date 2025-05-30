import { ArrowRight, Snowflake, Thermometer, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Плавающие геометрические фигуры */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-lg rotate-45 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Градиентные пятна для современного эффекта */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
        {/* Левая часть: Улучшенный текстовый блок */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 md:py-24 px-4 relative">
          {/* Дополнительные декоративные элементы */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
          
          <div className="flex flex-col items-center justify-center h-full max-w-xl mx-auto text-center relative">
            {/* Иконки климатической техники */}
            <div className="flex space-x-4 mb-6 opacity-80">
              <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm animate-pulse">
                <Snowflake className="w-6 h-6" />
              </div>
              <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm animate-pulse" style={{ animationDelay: '0.5s' }}>
                <Thermometer className="w-6 h-6" />
              </div>
              <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm animate-pulse" style={{ animationDelay: '1s' }}>
                <Zap className="w-6 h-6" />
              </div>
            </div>

            {/* Заголовок с анимацией появления */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight animate-fade-in-up">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                Комфортный климат
              </span>
              <br />
              <span className="text-white">
                для вашего дома и офиса
              </span>
            </h1>
            
            {/* Подзаголовок */}
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Профессиональная установка и обслуживание кондиционеров в Солнечногорске
            </p>
            
            {/* Улучшенная кнопка */}
            <Link 
              to="/catalog" 
              className="group relative inline-flex items-center bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              {/* Светящийся эффект за кнопкой */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              <span className="relative z-10">Выбрать кондиционер</span>
              <ArrowRight className="relative z-10 ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Дополнительная информация */}
            <div className="mt-8 flex items-center space-x-6 text-sm opacity-80">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span>Гарантия 3 года</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span>Работаем с 2011 года</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Правая часть: Улучшенное изображение */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden group">
          {/* Декоративная сетка */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Плавающие элементы */}
          <div className="absolute top-10 right-10 w-8 h-8 bg-blue-500/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-6 h-6 bg-cyan-500/30 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-5 w-4 h-4 bg-blue-400/40 rounded-full animate-ping"></div>

          {/* Основное изображение с эффектами */}
          <div className="relative h-full">
            <img 
              src="/images/conditioner.png" 
              alt="Кондиционер в современном интерьере" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Градиентный оверлей для лучшего контраста */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-blue-600/5"></div>
            
            {/* Информационная плашка */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">INTEGRA Inverter</h3>
                    <p className="text-sm text-gray-600">Энергоэффективность A+++</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">от</p>
                    <p className="text-lg font-bold text-blue-600">44 100 ₽</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
