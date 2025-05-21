import { Clock, Shield, Award, MapPin } from 'lucide-react';

const Advantages = () => {
  const advantages = [
    {
      icon: <Clock className="h-10 w-10 text-blue-600" />,
      title: "Современность",
      description: "Использование профессионального монтажного инструмента"
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-600" />,
      title: "Гарантия",
      description: "Официальная гарантия на оборудование и монтаж 3 года"
    },
    {
      icon: <Award className="h-10 w-10 text-blue-600" />,
      title: "Опыт",
      description: "Успешно работаем на рынке климатической техники с 2011 года"
    },
    {
      icon: <MapPin className="h-10 w-10 text-blue-600" />,
      title: "Локальность",
      description: "Работаем в Солнечногорске и ближайших районах"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Наши преимущества</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
              {advantage.description && <p className="text-gray-600">{advantage.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
