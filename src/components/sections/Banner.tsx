import { ArrowRight } from 'lucide-react';

const Banner = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Левая часть: Синий фон с текстом */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16 md:py-24 px-4">
          <div className="flex flex-col items-center justify-center h-full max-w-xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Комфортный климат для вашего дома и офиса
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Профессиональная установка и обслуживание кондиционеров в Солнечногорске
            </p>
            <a 
              href="/catalog" 
              className="inline-flex items-center bg-white text-blue-700 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Выбрать кондиционер
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
        
        {/* Правая часть: Фотография кондиционера */}
        <div className="bg-gray-50">
          <img 
            src="/images/conditioner.png" 
            alt="Кондиционер в современном интерьере" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
