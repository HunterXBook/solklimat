import { Phone, Mail, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white w-full">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <ul className="space-y-3 inline-block">
              <li className="flex items-center">
                <div className="w-5 mr-2 flex justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                <a href="tel:+79636006006" className="hover:text-blue-300">+7 (963) 600-60-06</a>
              </li>
              <li className="flex items-center">
                <div className="w-5 mr-2 flex justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                <a href="tel:+79151198706" className="hover:text-blue-300">+7 (915) 119-87-06</a>
              </li>
              <li className="flex items-center">
                <div className="w-5 mr-2 flex justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <a href="mailto:solklimat@yandex.ru" className="hover:text-blue-300">solklimat@yandex.ru</a>
              </li>
            </ul>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">ООО "СОЛКЛИМАТ"</h3>
            <div className="text-gray-300">
              <p>ИНН: 5044079695</p>
              <p>КПП: 504401001</p>
              <p>ОГРН: 1115044002204</p>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Мы в соцсетях</h3>
            <div className="flex justify-center space-x-4 mb-6">
              <a href="https://t.me" className="hover:text-blue-300" target="_blank" rel="noopener noreferrer">
                <Send className="h-6 w-6" />
              </a>
              <a href="https://vk.com" className="hover:text-blue-300" target="_blank" rel="noopener noreferrer">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93V15.07C2 20.67 3.33 22 8.93 22H15.07C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2ZM18.15 16.27H16.69C16.14 16.27 15.97 15.82 14.86 14.72C13.86 13.77 13.49 13.67 13.27 13.67C12.95 13.67 12.87 13.76 12.87 14.18V15.77C12.87 16.1 12.75 16.27 11.81 16.27C10.22 16.27 8.47 15.35 7.23 13.7C5.36 11.27 4.78 9.36 4.78 8.99C4.78 8.74 4.86 8.5 5.36 8.5H6.82C7.16 8.5 7.3 8.71 7.44 9.08C8.23 11.18 9.56 13 10.06 13C10.25 13 10.33 12.92 10.33 12.45V10.28C10.27 9.33 9.73 9.25 9.73 8.92C9.73 8.72 9.9 8.5 10.17 8.5H12.39C12.68 8.5 12.8 8.72 12.8 9.08V11.9C12.8 12.19 12.94 12.31 13.04 12.31C13.23 12.31 13.39 12.19 13.73 11.85C14.85 10.62 15.64 8.77 15.64 8.77C15.75 8.58 15.91 8.5 16.24 8.5H17.7C18.11 8.5 18.21 8.79 18.11 9.08C17.91 9.9 16.14 12.44 16.14 12.44C16 12.67 15.96 12.79 16.14 13.04C16.27 13.23 16.69 13.61 16.97 13.94C17.54 14.57 17.98 15.1 18.11 15.44C18.23 15.78 18.03 16.27 18.15 16.27Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} ООО "СОЛКЛИМАТ". Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
