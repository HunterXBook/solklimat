import { useParams, Link } from 'react-router-dom';
import { products } from '../../../data/productData';
import { ArrowRight } from 'lucide-react';

const ModelDetailPage = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const allModels = products['split'] || [];
  const model = allModels.find((m) => m.id.toLowerCase() === modelId);

  if (!model) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Модель не найдена</h1>
        <p>Возможно, модель временно недоступна или id неверный.</p>
        <Link to="/catalog" className="inline-flex items-center mt-6 text-blue-600 hover:underline">
          <ArrowRight className="mr-2" /> Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16">
      <Link to="/catalog" className="inline-flex items-center mb-6 text-blue-600 hover:underline">
        <ArrowRight className="mr-2 rotate-180" /> Назад к каталогу
      </Link>
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col items-center">
          <img src={model.images?.[0] || '/images/conditioner.png'} alt={model.name} className="w-64 h-64 object-contain mb-4" />
          <h1 className="text-3xl font-bold mb-2">{model.name}</h1>
          <div className="text-lg text-gray-600 mb-2">Модель: {model.model}</div>
          <div className="text-xl font-semibold text-blue-600 mb-4">{model.price?.toLocaleString() || '0'} ₽</div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Характеристики</h2>
          <ul className="space-y-2">
            {model.specs?.map((spec) => (
              <li key={spec.name} className="flex justify-between border-b pb-1 text-sm">
                <span className="text-gray-500">{spec.name}</span>
                <span className="font-medium">{spec.value}</span>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-8 mb-4">Ключевые особенности</h2>
          <ul className="list-disc list-inside text-gray-700">
            {model.keyFeatures?.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailPage; 