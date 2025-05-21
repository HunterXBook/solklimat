import { ArrowRight } from 'lucide-react';

interface CatalogPageProps {
  onCategorySelect: (categoryId: string) => void;
}

const CatalogPage = ({ onCategorySelect }: CatalogPageProps) => {
  const categories = [
    {
      id: 'split',
      title: 'Сплит-системы',
      description: 'Классические кондиционеры для дома и офиса',
      image: '/images/split-system.jpg'
    },
    {
      id: 'multi-split',
      title: 'Мультисплит-системы',
      description: 'Одновременное кондиционирование нескольких помещений',
      image: '/images/multi-split.jpg'
    },
    {
      id: 'semi-industrial',
      title: 'Полупромышленные системы',
      description: 'Мощные решения для больших помещений',
      image: '/images/semi-industrial.jpg'
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-12">Каталог кондиционеров</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => onCategorySelect(category.id)}
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              {/* Временный плейсхолдер для изображения */}
              <div className="text-gray-500 text-center p-4">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <p>Изображение {category.title}</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex justify-end">
                <button className="inline-flex items-center text-blue-600 font-medium">
                  Перейти
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
