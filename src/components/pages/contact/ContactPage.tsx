import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Send, Clock } from 'lucide-react';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном проекте здесь был бы код для отправки формы
    alert('Сообщение отправлено!');
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Связаться с нами</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Контактная форма - занимает 3/5 на десктопе */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Напишите нам</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Ваше имя
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван Иванов"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Телефон
              </label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.ru"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Сообщение
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Опишите ваш вопрос или запрос..."
                rows={5}
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Отправить сообщение
            </Button>
            
            <p className="text-sm text-gray-600 mt-2 text-center">
              Нажимая на кнопку "Отправить сообщение", Вы соглашаетесь на <a href="#" onClick={(e) => {e.preventDefault(); window.location.href = '/privacy-policy';}} className="text-blue-600 underline hover:text-blue-800">обработку своих персональных данных</a>.
            </p>
          </form>
        </div>
        
        {/* Вкладки с информацией - занимают 2/5 на десктопе */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="contacts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="contacts">Контакты</TabsTrigger>
              <TabsTrigger value="hours">Часы работы</TabsTrigger>
              <TabsTrigger value="social">Соцсети</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contacts" className="p-4 bg-white rounded-lg shadow-md mt-2">
              <h3 className="text-xl font-semibold mb-4">Наши контакты</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <p className="font-medium">Телефон:</p>
                    <a href="tel:+79636006006" className="text-blue-600 hover:underline">+7 (963) 600-60-06</a>
                  </div>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <p className="font-medium">Дополнительный телефон:</p>
                    <a href="tel:+79151198706" className="text-blue-600 hover:underline">+7 (915) 119-87-06</a>
                  </div>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <p className="font-medium">Email:</p>
                    <a href="mailto:solklimat@yandex.ru" className="text-blue-600 hover:underline">solklimat@yandex.ru</a>
                  </div>
                </li>
              </ul>
            </TabsContent>
            
            <TabsContent value="hours" className="p-4 bg-white rounded-lg shadow-md mt-2">
              <h3 className="text-xl font-semibold mb-4">Часы работы</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Понедельник - Пятница:</p>
                    <p>9:00 - 18:00</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Суббота:</p>
                    <p>9:00 - 18:00</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Воскресенье:</p>
                    <p>9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="social" className="p-4 bg-white rounded-lg shadow-md mt-2">
              <h3 className="text-xl font-semibold mb-4">Мы в социальных сетях</h3>
              <div className="space-y-4">
                <a 
                  href="https://t.me" 
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Send className="h-6 w-6 mr-3 text-blue-600" />
                  <span>Telegram</span>
                </a>
                <a 
                  href="https://vk.com" 
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <svg className="h-6 w-6 mr-3 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93V15.07C2 20.67 3.33 22 8.93 22H15.07C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2ZM18.15 16.27H16.69C16.14 16.27 15.97 15.82 14.86 14.72C13.86 13.77 13.49 13.67 13.27 13.67C12.95 13.67 12.87 13.76 12.87 14.18V15.77C12.87 16.1 12.75 16.27 11.81 16.27C10.22 16.27 8.47 15.35 7.23 13.7C5.36 11.27 4.78 9.36 4.78 8.99C4.78 8.74 4.86 8.5 5.36 8.5H6.82C7.16 8.5 7.3 8.71 7.44 9.08C8.23 11.18 9.56 13 10.06 13C10.25 13 10.33 12.92 10.33 12.45V10.28C10.27 9.33 9.73 9.25 9.73 8.92C9.73 8.72 9.9 8.5 10.17 8.5H12.39C12.68 8.5 12.8 8.72 12.8 9.08V11.9C12.8 12.19 12.94 12.31 13.04 12.31C13.23 12.31 13.39 12.19 13.73 11.85C14.85 10.62 15.64 8.77 15.64 8.77C15.75 8.58 15.91 8.5 16.24 8.5H17.7C18.11 8.5 18.21 8.79 18.11 9.08C17.91 9.9 16.14 12.44 16.14 12.44C16 12.67 15.96 12.79 16.14 13.04C16.27 13.23 16.69 13.61 16.97 13.94C17.54 14.57 17.98 15.1 18.11 15.44C18.23 15.78 18.03 16.27 18.15 16.27Z" />
                  </svg>
                  <span>ВКонтакте</span>
                </a>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">ООО "СОЛКЛИМАТ"</h4>
                <p className="text-sm text-gray-600">ИНН: 5044079695</p>
                <p className="text-sm text-gray-600">КПП: 504401001</p>
                <p className="text-sm text-gray-600">ОГРН: 1115044002204</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
