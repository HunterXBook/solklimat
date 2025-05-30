import { Clock, Shield, Award, MapPin, Sparkles, Star, Zap } from 'lucide-react';

const Advantages = () => {
  const advantages = [
    {
      icon: <Clock className="h-12 w-12 text-blue-600 group-hover:text-white transition-colors duration-500" />,
      title: "Современность",
      description: "Использование профессионального монтажного инструмента",
      gradient: "from-blue-500 to-cyan-500",
      hoverGradient: "group-hover:from-blue-600 group-hover:to-cyan-600",
      particles: [
        { size: "w-2 h-2", position: "top-2 right-2", delay: "0s" },
        { size: "w-1 h-1", position: "top-4 right-8", delay: "0.5s" },
        { size: "w-1.5 h-1.5", position: "bottom-3 right-3", delay: "1s" }
      ]
    },
    {
      icon: <Shield className="h-12 w-12 text-green-600 group-hover:text-white transition-colors duration-500" />,
      title: "Гарантия",
      description: "Официальная гарантия на оборудование и монтаж 3 года",
      gradient: "from-green-500 to-emerald-500",
      hoverGradient: "group-hover:from-green-600 group-hover:to-emerald-600",
      particles: [
        { size: "w-2 h-2", position: "top-3 left-3", delay: "0.2s" },
        { size: "w-1 h-1", position: "top-6 left-8", delay: "0.7s" },
        { size: "w-1.5 h-1.5", position: "bottom-2 left-2", delay: "1.2s" }
      ]
    },
    {
      icon: <Award className="h-12 w-12 text-purple-600 group-hover:text-white transition-colors duration-500" />,
      title: "Опыт",
      description: "Успешно работаем на рынке климатической техники с 2011 года",
      gradient: "from-purple-500 to-pink-500",
      hoverGradient: "group-hover:from-purple-600 group-hover:to-pink-600",
      particles: [
        { size: "w-2 h-2", position: "top-2 left-4", delay: "0.4s" },
        { size: "w-1 h-1", position: "top-5 right-4", delay: "0.9s" },
        { size: "w-1.5 h-1.5", position: "bottom-4 left-6", delay: "1.4s" }
      ]
    },
    {
      icon: <MapPin className="h-12 w-12 text-orange-600 group-hover:text-white transition-colors duration-500" />,
      title: "Локальность",
      description: "Работаем в Солнечногорске и ближайших районах",
      gradient: "from-orange-500 to-red-500",
      hoverGradient: "group-hover:from-orange-600 group-hover:to-red-600",
      particles: [
        { size: "w-2 h-2", position: "top-1 right-1", delay: "0.6s" },
        { size: "w-1 h-1", position: "top-7 left-2", delay: "1.1s" },
        { size: "w-1.5 h-1.5", position: "bottom-1 right-5", delay: "1.6s" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Анимированный фон с множественными элементами */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Большие декоративные круги */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-cyan-200/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-green-200/15 to-emerald-200/10 rounded-full blur-2xl animate-pulse"></div>
        
        {/* Средние плавающие элементы */}
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-orange-200/30 rounded-full animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-blue-300/25 rounded-lg rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-purple-300/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Мелкие частицы */}
        <div className="absolute top-1/4 left-1/5 w-4 h-4 bg-cyan-400/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-green-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        
        {/* Движущиеся световые лучи */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-300/30 to-transparent animate-shimmer" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-300/20 to-transparent animate-shimmer" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок секции с продвинутыми эффектами */}
        <div className="text-center mb-16">
          {/* Декоративные иконки над заголовком */}
          <div className="flex justify-center space-x-4 mb-6 opacity-60">
            <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
            <Star className="w-8 h-8 text-purple-500 animate-spin" style={{ animationDuration: '4s' }} />
            <Zap className="w-6 h-6 text-orange-500 animate-bounce" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent hover:from-blue-600 hover:to-purple-600 transition-all duration-1000 cursor-default">
              Наши преимущества
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Почему клиенты выбирают именно нас для установки климатической техники
          </p>
          
          {/* Улучшенная декоративная линия */}
          <div className="relative w-32 h-1 mx-auto mt-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-sm animate-pulse"></div>
          </div>
        </div>
        
        {/* Сетка преимуществ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center transition-all duration-700 transform hover:scale-110 hover:-translate-y-4 hover:rotate-1 animate-fade-in-up cursor-pointer"
              style={{ 
                animationDelay: `${0.6 + index * 0.2}s`,
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            >
              {/* Фоновый градиент при hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${advantage.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl ${advantage.hoverGradient}`}></div>
              
              {/* Светящийся эффект */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              {/* Анимированные частицы */}
              {advantage.particles.map((particle, particleIndex) => (
                <div
                  key={particleIndex}
                  className={`absolute ${particle.size} ${particle.position} bg-white/60 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500`}
                  style={{ animationDelay: particle.delay }}
                ></div>
              ))}
              
              {/* Иконка с контейнером */}
              <div className="relative z-20 mb-6">
                <div className="flex justify-center mb-4">
                  <div className="relative p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                    {advantage.icon}
                    
                    {/* Дополнительные эффекты для иконки */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-md"></div>
                  </div>
                </div>
              </div>
              
              {/* Контент */}
              <div className="relative z-20">
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-white transition-colors duration-500">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-100 transition-colors duration-500 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
              
              {/* Дополнительные декоративные элементы */}
              <div className="absolute top-4 right-4 w-8 h-8 border-2 border-gray-200 rounded-full opacity-20 group-hover:border-white group-hover:opacity-60 transition-all duration-500 transform group-hover:rotate-180"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-gray-200 rounded-lg opacity-20 group-hover:border-white group-hover:opacity-60 transition-all duration-500 transform group-hover:-rotate-90"></div>
              
              {/* Эффект ряби при hover */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Дополнительная информация внизу */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 inline-block">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span>Более 1000 установок</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span>100% довольных клиентов</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span>Работаем 7 дней в неделю</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
