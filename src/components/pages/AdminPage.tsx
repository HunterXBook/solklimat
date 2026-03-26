import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Lock, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ADMIN_PASSWORD = 'solklimatadmin1975';
const API_URL = '/api/upload.php';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [isUploading, setIsUploading] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [commitStatus, setCommitStatus] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['basic', 'variants']);
  
  const indoorFileRef = useRef<HTMLInputElement>(null);
  const outdoorFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('adminAuth');
    if (saved === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const uploadImage = async (file: File, type: 'indoor' | 'outdoor') => {
    setIsUploading(true);
    setUploadStatus(`Загрузка ${type === 'indoor' ? 'внутреннего' : 'наружного'} блока...`);
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('product_name', form.name || 'product');
    
    try {
      const response = await fetch(`${API_URL}?action=upload`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer solklimatadmin1975'
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setForm(prev => ({
          ...prev,
          images: type === 'indoor' 
            ? [data.url, prev.images[1]]
            : [prev.images[0], data.url]
        }));
        setUploadStatus('✓ Фото загружено: ' + data.url);
        return data.url;
      } else {
        setUploadStatus('✗ Ошибка: ' + data.error);
        return null;
      }
    } catch (error) {
      setUploadStatus('✗ Ошибка сети');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'indoor' | 'outdoor') => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadImage(file, type);
    }
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

  const commitToGitHub = async () => {
    setIsCommitting(true);
    setCommitStatus('Создание коммита...');
    
    // Генерируем продукты
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

    try {
      const response = await fetch(`${API_URL}?action=commit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer solklimatadmin1975'
        },
        body: JSON.stringify({
          products: {
            [form.systemType]: products
          }
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCommitStatus('✓ Успешно! Изменения отправлены на сайт. Ожидайте деплоя (~2 минуты)');
        // Очищаем форму
        setForm(initialForm);
      } else {
        setCommitStatus('✗ Ошибка: ' + (data.error || 'Неизвестная ошибка'));
      }
    } catch (error) {
      setCommitStatus('✗ Ошибка сети при коммите');
    } finally {
      setIsCommitting(false);
    }
  };

  const isExpanded = (section: string) => expandedSections.includes(section);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Админ-панель</h1>
          <p className="text-gray-600 text-center mb-6">Введите пароль для доступа</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className="w-full"
            />
            {passwordError && (
              <p className="text-red-500 text-sm text-center">Неверный пароль</p>
            )}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Войти
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Добавление кондиционера</h1>
      <p className="text-gray-600 mb-8">Заполните форму и нажмите «Отправить на сайт»</p>

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

            {/* Загрузка фото */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Фото внутреннего блока</label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={indoorFileRef}
                    onChange={(e) => handleFileChange(e, 'indoor')}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => indoorFileRef.current?.click()}
                    disabled={isUploading}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Выбрать файл
                  </Button>
                </div>
                {form.images[0] && (
                  <p className="text-xs text-green-600 mt-1">✓ {form.images[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Фото наружного блока</label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={outdoorFileRef}
                    onChange={(e) => handleFileChange(e, 'outdoor')}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => outdoorFileRef.current?.click()}
                    disabled={isUploading}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Выбрать файл
                  </Button>
                </div>
                {form.images[1] && (
                  <p className="text-xs text-green-600 mt-1">✓ {form.images[1]}</p>
                )}
              </div>
            </div>

            {uploadStatus && (
              <p className={`text-sm ${uploadStatus.startsWith('✓') ? 'text-green-600' : uploadStatus.startsWith('✗') ? 'text-red-600' : 'text-blue-600'}`}>
                {uploadStatus}
              </p>
            )}

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

      {/* Отправка на сайт */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <Button 
          onClick={commitToGitHub}
          disabled={isCommitting || !form.name || form.variants.some(v => !v.model)}
          className="w-full bg-green-600 hover:bg-green-700 h-14 text-lg"
        >
          {isCommitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Отправка...
            </>
          ) : (
            <>
              <Upload className="h-5 w-5 mr-2" />
              Отправить на сайт
            </>
          )}
        </Button>
        
        {commitStatus && (
          <div className={`mt-4 p-4 rounded-lg ${commitStatus.startsWith('✓') ? 'bg-green-100 text-green-800' : commitStatus.startsWith('✗') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
            {commitStatus}
          </div>
        )}
        
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Что произойдёт:</strong><br/>
            1. Данные отправятся в GitHub<br/>
            2. Запустится автоматический деплой (~2 минуты)<br/>
            3. Кондиционер появится на сайте
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
