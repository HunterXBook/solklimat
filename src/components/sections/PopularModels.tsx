import { ArrowRight } from 'lucide-react';

const PopularModels = () => {
  const models = [
    {
      name: "Название",
      area: "",
      type: "Сплит-система",
    },
    {
      name: "Название",
      area: "",
      type: "Сплит-система",
    },
    {
      name: "Название",
      area: "",
      type: "Сплит-система",
    },
    {
      name: "Название",
      area: "",
      type: "Сплит-система",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Популярные модели</h2>
        <p className="text-center text-gray-600 mb-12">Кондиционеры с установкой "под ключ"</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {models.map((model, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Изображение кондиционера</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{model.name}</h3>
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-gray-600">Площадь: </p>
                  <p className="text-sm text-gray-600">{model.type}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xl">Цена по запросу</span>
                  <a 
                    href={`/catalog/${index}`} 
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                  >
                    Подробнее
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/catalog" 
            className="inline-flex items-center bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Перейти в каталог
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularModels;
