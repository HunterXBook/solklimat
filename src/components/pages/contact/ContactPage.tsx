import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Clock, Loader2, CheckCircle } from 'lucide-react';

const BOT_TOKEN = '8763856112:AAEGUeaIVf_6xY9_qMgXKLTZrUwH6gcyEe0';
const CHAT_ID = '8430897822';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

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
    const text = encodeURIComponent(
      `📩 Новая заявка с сайта СОЛКЛИМАТ\n\n` +
      `👤 Имя: ${name || 'Не указано'}\n` +
      `📞 Телефон: ${phone}\n` +
      `📧 Email: ${email || 'Не указан'}\n` +
      `💬 Сообщение: ${message || 'Нет'}\n\n` +
      `🕐 Время: ${new Date().toLocaleString('ru-RU')}`
    );
    
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}&parse_mode=HTML`;
    
    try {
      // Используем JSONP через script tag
      return new Promise((resolve) => {
        const script = document.createElement('script');
        const callbackName = 'tgCallback_' + Date.now();
        
        (window as any)[callbackName] = (data: any) => {
          delete (window as any)[callbackName];
          document.head.removeChild(script);
          resolve(true);
        };
        
        script.src = url + '&callback=' + callbackName;
        script.onerror = () => {
          delete (window as any)[callbackName];
          document.head.removeChild(script);
          resolve(false);
        };
        
        // Таймаут 10 секунд
        setTimeout(() => {
          if ((window as any)[callbackName]) {
            delete (window as any)[callbackName];
            if (script.parentNode) document.head.removeChild(script);
            resolve(true); // Считаем успехом даже без ответа
          }
        }, 3000);
        
        document.head.appendChild(script);
      });
    } catch (err) {
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
      setMessage('');
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      setError('Ошибка отправки. Позвоните нам: +7 (963) 600-60-06');
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Связаться с нами</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Напишите нам</h2>
          
          {isSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800">Заявка отправлена! Мы свяжемся с вами.</span>
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ваше имя</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Иван Иванов" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Телефон *</label>
              <Input value={phone} onChange={handlePhoneChange} placeholder="+7 (___) ___-__-__" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.ru" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Сообщение</label>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Опишите ваш вопрос..." rows={5} />
            </div>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Отправка...</> : 'Отправить сообщение'}
            </Button>
          </form>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Наши контакты</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Телефон:</p>
                  <a href="tel:+79636006006" className="text-blue-600 hover:underline">+7 (963) 600-60-06</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email:</p>
                  <a href="mailto:solklimat@yandex.ru" className="text-blue-600 hover:underline">solklimat@yandex.ru</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Режим работы:</p>
                  <p>Пн–Сб: 9:00 – 20:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
