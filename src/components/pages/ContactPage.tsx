import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, Clock, Send, ArrowRight } from 'lucide-react';

interface ContactPageProps {
  onNavigate?: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData);
    alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Связаться с нами</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Отправить сообщение</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Ваше имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Сообщение
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Отправить сообщение
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            
            <p className="text-sm text-gray-600 mt-2 text-center">
              Нажимая на кнопку "Отправить сообщение", Вы соглашаетесь на <a href="#" onClick={(e) => {e.preventDefault(); onNavigate && onNavigate('privacy-policy');}} className="text-blue-600 underline hover:text-blue-800">обработку своих персональных данных</a>.
            </p>
          </form>
        </div>
        
        <div>
          <Tabs defaultValue="contacts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="contacts">Контакты</TabsTrigger>
              <TabsTrigger value="hours">Часы работы</TabsTrigger>
              <TabsTrigger value="social">Соцсети</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contacts" className="p-4 bg-white rounded-lg shadow-md mt-2">
              <h3 className="text-xl font-semibold mb-4">Наши контакты</h3>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-2 pr-4">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3 text-blue-600" />
                        <span className="font-medium">Основной:</span>
                      </div>
                    </td>
                    <td className="py-2">
                      <a href="tel:+79151198706" className="text-blue-600 hover:underline">+7 (915) 119-87-06</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3 text-blue-600" />
                        <span className="font-medium">Дополнительный:</span>
                      </div>
                    </td>
                    <td className="py-2">
                      <a href="tel:+79151198706" className="text-blue-600 hover:underline">+7 (915) 119-87-06</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3 text-blue-600" />
                        <span className="font-medium">Email:</span>
                      </div>
                    </td>
                    <td className="py-2">
                      <a href="mailto:solklimat@yandex.ru" className="text-blue-600 hover:underline">solklimat@yandex.ru</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
            
            <TabsContent value="hours" className="p-4 bg-white rounded-lg shadow-md mt-2">
              <h3 className="text-xl font-semibold mb-4">Часы работы</h3>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-2 pr-4">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-3 text-blue-600" />
                        <span className="font-medium">Понедельник - Пятница:</span>
                      </div>
                    </td>
                    <td className="py-2">9:00 - 18:00</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-3 text-blue-600" />
                        <span className="font-medium">Суббота:</span>
                      </div>
                    </td>
                    <td className="py-2">10:00 - 20:00</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-3 text-blue-600" />
                        <span className="font-medium">Воскресенье:</span>
                      </div>
                    </td>
                    <td className="py-2">10:00 - 20:00</td>
                  </tr>
                </tbody>
              </table>
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
