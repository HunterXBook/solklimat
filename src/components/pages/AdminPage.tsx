import { useState } from 'react';
import { Plus, Trash2, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ProductVariant {
  id: string;
  model: string;
  power: string;
  coolingCapacity: string;
  efficiency: string;
  noiseLevel: string;
  price: string;
}

interface ProductForm {
  name: string;
  systemType: 'split' | 'multi-split' | 'semi-industrial';
  brand: string;
  color: string;
  images: string[];
  variants: ProductVariant[];
  keyFeatures: string[];
  specs: { name: string; value: string }[];
}

const initialVariant: ProductVariant = {
  id: '1',
  model: '',
  power: '',
  coolingCapacity: '',
  efficiency: 'A',
  noiseLevel: '',
  price: ''
};

const initialForm: ProductForm = {
  name: '',
  systemType: 'split',
  brand: 'MDV',
  color: 'Белый',
  images: ['', ''],
  variants: [{ ...initialVariant }],
  keyFeatures: [
    'Инверторное управление компрессором',
    'Низкий уровень шума',
    'Класс энергоэффективности A'
  ],
  specs: []
};

const AdminPage = () => {
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [generatedJson, setGeneratedJson] = useState('');
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['basic', 'variants']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const addVariant = () => {
    setForm(prev => ({
      ...prev,
      variants: [...prev.variants, { ...initialVariant, id: String(prev.variants.length + 1) }]
    }));
  };

  const removeVariant = (index: number) => {
    if (form.variants.length <= 1) return;
    setForm(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: string) => {
    setForm(prev => ({
      ...prev,
      variants: prev.variants.map((v, i) => 
        i === index ? { ...v, [field]: value } : v
      )
    }));
  };

  const generateJson = () => {
    const products = form.variants.map((variant, idx) => ({
      id: `${form.name.toLowerCase().replace(/\s+/g, '-')}-${variant.power || idx}`,
      name: form.name,
      model: variant.model,
      images: form.images.filter(img => img),
      price: parseInt(variant.price) || 0,
      color: form.color,
      keyFeatures: form.keyFeatures.filter(f => f),
      specs: [
        { name: 'Модель внутреннего блока', value: variant.model.split('/')[0] || '' },
        { name: 'Модель наружного блока', value: variant.model.split('/')[1] || '' },
        { name: 'Мощность охлаждения', value: variant.coolingCapacity },
        { name: 'Энергоэффективность', value: variant.efficiency },
        { name: 'Уровень шума', value: variant.noiseLevel },
        ...form.specs
      ].filter(s => s.value)
    }));

    const output = {
      [form.systemType]: products
    };

    setGeneratedJson(JSON.stringify(output, null, 2));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isExpanded = (section: string) => expandedSections.includes(section);

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Админ-панель: Добавление кондиционера</h1>
      <p className="text-gray-600 mb-8">Заполните форму и скопируйте JSON для добавления в каталог</p>

      {/* Основная информация */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <button 
          onClick={() => toggleSection('basic')}
          className="w-full flex items-center justify-between p-4 border-b hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">1. Основная информация</h2>
          {isExpanded('basic') ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        {isExpanded('basic') && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Название серии *</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Например: INTEGRA Inverter"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Бренд *</label>
                <select 
                  value={form.brand}
                  onChange={(e) => setForm(prev => ({ ...prev, brand: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="MDV">MDV</option>
                  <option value="Mitsubishi Heavy">Mitsubishi Heavy</option>
                  <option value="Daikin">Daikin</option>
                  <option value="Samsung">Samsung</option>
                  <option value="LG">LG</option>
                  <option value="Haier">Haier</option>
                  <option value="Ballu">Ballu</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Тип системы *</label>
                <select 
                  value={form.systemType}
                  onChange={(e) => setForm(prev => ({ ...prev, systemType: e.target.value as any }))}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="split">Сплит-система</option>
                  <option value="multi-split">Мультисплит-система</option>
                  <option value="semi-industrial">Полупромышленная</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Цвет корпуса</label>
                <Input
                  value={form.color}
                  onChange={(e) => setForm(prev => ({ ...prev, color: e.target.value }))}
                  placeholder="Белый"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">URL фото внутреннего блока</label>
              <Input
                value={form.images[0]}
                onChange={(e) => setForm(prev => ({ 
                  ...prev, 
                  images: [e.target.value, prev.images[1]] 
                }))}
                placeholder="/images/products/model-indoor.png"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">URL фото наружного блока</label>
              <Input
                value={form.images[1]}
                onChange={(e) => setForm(prev => ({ 
                  ...prev, 
                  images: [prev.images[0], e.target.value] 
                }))}
                placeholder="/images/products/model-outdoor.png"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ключевые особенности (по одной на строку)</label>
              <Textarea
                value={form.keyFeatures.join('\n')}
                onChange={(e) => setForm(prev => ({ 
                  ...prev, 
                  keyFeatures: e.target.value.split('\n').filter(f => f) 
                }))}
                rows={3}
                placeholder="Инверторное управление&#10;Низкий уровень шума&#10;Класс энергоэффективности A"
              />
            </div>
          </div>
        )}
      </div>

      {/* Варианты мощности */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <button 
          onClick={() => toggleSection('variants')}
          className="w-full flex items-center justify-between p-4 border-b hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">2. Варианты мощности ({form.variants.length})</h2>
          {isExpanded('variants') ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        {isExpanded('variants') && (
          <div className="p-4 space-y-4">
            {form.variants.map((variant, index) => (
              <div key={variant.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Вариант {index + 1}</h3>
                  {form.variants.length > 1 && (
                    <button 
                      onClick={() => removeVariant(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Модель (внутр/наруж)</label>
                    <Input
                      value={variant.model}
                      onChange={(e) => updateVariant(index, 'model', e.target.value)}
                      placeholder="MDSI-07/MDOI-07"
                      className="text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium mb-1">Мощность (BTU)</label>
                    <Input
                      value={variant.power}
                      onChange={(e) => updateVariant(index, 'power', e.target.value)}
                      placeholder="07"
                      className="text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium mb-1">Цена (₽)</label>
                    <Input
                      value={variant.price}
                      onChange={(e) => updateVariant(index, 'price', e.target.value)}
                      placeholder="45000"
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Холодопроизводительность</label>
                    <Input
                      value={variant.coolingCapacity}
                      onChange={(e) => updateVariant(index, 'coolingCapacity', e.target.value)}
                      placeholder="2,05 кВт"
                      className="text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium mb-1">Энергоэффективность</label>
                    <select
                      value={variant.efficiency}
                      onChange={(e) => updateVariant(index, 'efficiency', e.target.value)}
                      className="w-full border rounded px-2 py-1.5 text-sm"
                    >
                      <option value="A">A</option>
                      <option value="A+">A+</option>
                      <option value="A++">A++</option>
                      <option value="A+++">A+++</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium mb-1">Уровень шума</label>
                    <Input
                      value={variant.noiseLevel}
                      onChange={(e) => updateVariant(index, 'noiseLevel', e.target.value)}
                      placeholder="22 дБ"
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              onClick={addVariant}
              variant="outline"
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Добавить вариант мощности
            </Button>
          </div>
        )}
      </div>

      {/* Генерация JSON */}
      <div className="bg-white rounded-lg shadow-md mb-6 p-4">
        <Button 
          onClick={generateJson}
          className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
        >
          Сгенерировать JSON
        </Button>
      </div>

      {/* Результат */}
      {generatedJson && (
        <div className="bg-gray-900 rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">Скопируйте этот код:</h3>
            <Button 
              onClick={copyToClipboard}
              variant="outline"
              className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
            >
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? 'Скопировано!' : 'Копировать'}
            </Button>
          </div>
          <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
            {generatedJson}
          </pre>
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Что делать дальше:</strong><br/>
              1. Скопируйте код выше<br/>
              2. Откройте файл <code>src/data/productData.ts</code><br/>
              3. Добавьте содержимое в объект <code>products</code><br/>
              4. Сохраните и отправьте изменения
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
