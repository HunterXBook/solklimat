import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { products, Product } from '../../../data/productData';
import ProductCard from './ProductCard';
import ImageGallery from './ImageGallery';

export default function ModelPage() {
  const { categoryId, modelId } = useParams<{ categoryId: string; modelId: string }>();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  if (!categoryId || !modelId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Модель не найдена</h1>
      </div>
    );
  }

  // Get products for the current category
  const categoryProducts = products[categoryId] || [];

  // Filter products by model
  const modelProducts = categoryProducts.filter(
    (product: Product) => product.model === modelId
  );

  // Get unique brands from model products
  const brands = Array.from(new Set(modelProducts.map((product: Product) => product.name.split(' ')[0])));

  const filteredProducts = selectedBrand
    ? modelProducts.filter((product: Product) => product.name.startsWith(selectedBrand))
    : modelProducts;

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
  };

  const handleBack = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
    } else {
      navigate(`/catalog/${categoryId}`);
    }
  };

  const selectedProductData = selectedProduct
    ? modelProducts.find((p: Product) => p.id === selectedProduct)
    : null;

  const pageTitle = selectedProductData?.name || 'Выберите модель';
  const backButtonText = selectedProduct ? 'Назад к моделям' : 'Назад к категориям';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {backButtonText}
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8">{pageTitle}</h1>

      {!selectedProduct ? (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Фильтр по бренду</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSelectedBrand(null)}
                className={`px-4 py-2 rounded-full ${
                  !selectedBrand
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Все бренды
              </button>
              {brands.map((brand: string) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 rounded-full ${
                    selectedBrand === brand
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product: Product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                model={product.model}
                image={product.images[0]}
                price={product.price}
                color={product.color}
                onSelect={handleProductSelect}
              />
            ))}
          </div>
        </>
      ) : selectedProductData ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ImageGallery
              images={selectedProductData.images}
              alt={selectedProductData.name}
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {selectedProductData.name}
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Характеристики</h3>
              <ul className="space-y-2">
                {selectedProductData.specs.map((spec: { name: string; value: string }, index: number) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-600">{spec.name}</span>
                    <span className="font-medium">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Ключевые особенности</h3>
              <ul className="list-disc list-inside space-y-2">
                {selectedProductData.keyFeatures.map((feature: string, index: number) => (
                  <li key={index} className="text-gray-600">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {selectedProductData.price.toLocaleString()} ₽
              </span>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Заказать
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
