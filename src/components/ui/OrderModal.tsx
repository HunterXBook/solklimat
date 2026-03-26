import { useState } from 'react';
import { X, Loader2, CheckCircle, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// Telegram Bot Config
const BOT_TOKEN = '8763856112:AAEGUeaIVf_6xY9_qMgXKLTZrUwH6gcyEe0';
const CHAT_ID = '8430897822';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productModel?: string;
  productPrice?: string | number;
}

const OrderModal = ({ isOpen, onClose, productName, productModel, productPrice }: OrderModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Phone mask
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0 && value[0] === '7') value = value.slice(1);
    if (value.length > 10) value = value.slice(0, 10);
    
    let formatted = '+7';
    if (value.length > 0) formatted += ' (' + value.slice(0, 3);
    if (value.length >= 3) formatted += ') ' + value.slice(3, 6);
    if (value.length >= 6) formatted += '-' + value.slice(6, 8);
    if (value.length >= 8) formatted += '-' + value.slice(8, 10);
    
    setPhone(formatted);
  };

  const sendToTelegram = async () => {
    const priceText = productPrice 
      ? (typeof productPrice === 'number' ? `${productPrice.toLocaleString()} ₽` : productPrice)
      : 'Не указана';

    const text = `📩 <b>Новая заявка с сайта СОЛКЛИМАТ</b>

👤 <b>Имя:</b> ${name || 'Не указано'}
📞 <b>Телефон:</b> ${phone}
📧 <b>Email:</b> ${email || 'Не указан'}
📦 <b>Товар:</b> ${productName}${productModel ? ` (${productModel})` : ''}
💰 <b>Цена:</b> ${priceText}
💬 <b>Комментарий:</b> ${comment || 'Нет'}

🌐 <b>Источник:</b> solclimate.ru
🕐 <b>Время:</b> ${new Date().toLocaleString('ru-RU')}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: 'HTML'
        })
      });
      return response.ok;
    } catch (error) {
      console.error('Telegram error:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!phone || phone.length < 10) {
      setError('Пожалуйста, введите корректный номер телефона');
      return;
    }

    setIsLoading(true);
    
    const success = await sendToTelegram();
    
    setIsLoading(false);
    
    if (success) {
      setIsSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setComment('');
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } else {
      setError('Ошибка отправки. Пожалуйста, позвоните нам напрямую.');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Заказать консультацию</h2>
            <p className="text-sm text-gray-500 mt-1">{productName}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Контактная информация */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-900 font-medium mb-1">
                  Позвоните нам напрямую
                </p>
                <p className="text-sm text-blue-700 mb-2">
                  Или оставьте данные — мы свяжемся с вами
                </p>
                <a 
                  href="tel:+79636006006" 
                  className="text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  +7 (963) 600-60-06
                </a>
              </div>
            </div>
          </div>

          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Заявка отправлена!</h3>
              <p className="text-gray-600">Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ваше имя
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон *
                </label>
                <Input
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 (___) ___-__-__"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.ru"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Комментарий
                </label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Удобное время для звонка, вопросы по товару..."
                  rows={3}
                  className="w-full"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  'Заказать'
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Нажимая кнопку, вы соглашаетесь на{' '}
                <a 
                  href="/privacy-policy" 
                  className="text-blue-600 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/privacy-policy';
                  }}
                >
                  обработку персональных данных
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
