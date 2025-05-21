import { useState } from 'react';
import { Menu, X } from 'lucide-react';
interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}
const Header = ({ onNavigate, currentPage }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Логотип */}
          <div className="flex items-center">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}
              className="text-2xl font-bold text-blue-600"
            >
              СОЛКЛИМАТ
            </a>
          </div>
          
          {/* Навигация для десктопа - центрированная */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-4">
            <div className="flex space-x-8">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}
                className={`text-gray-700 hover:text-blue-600 ${currentPage === 'home' ? 'font-semibold text-blue-600' : ''}`}
              >
                Главная
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavigation('catalog'); }}
                className={`text-gray-700 hover:text-blue-600 ${currentPage === 'catalog' ? 'font-semibold text-blue-600' : ''}`}
              >
                Каталог
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavigation('installation'); }}
                className={`text-gray-700 hover:text-blue-600 ${currentPage === 'installation' ? 'font-semibold text-blue-600' : ''}`}
              >
                Монтаж
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavigation('encyclopedia'); }}
                className={`text-gray-700 hover:text-blue-600 ${currentPage === 'encyclopedia' ? 'font-semibold text-blue-600' : ''}`}
              >
                Энциклопедия климата
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavigation('contact'); }}
                className={`text-gray-700 hover:text-blue-600 ${currentPage === 'contact' ? 'font-semibold text-blue-600' : ''}`}
              >
                Связаться с нами
              </a>
            </div>
          </nav>
          
          {/* Телефон */}
          <div className="hidden md:block">
            <a href="tel:+79636006006" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              +7 (963) 600-60-06
            </a>
          </div>
          
          {/* Кнопка меню для мобильных устройств */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}
                className={`text-gray-700 hover:text-blue-600 ${currentPage === 'home' ? 'font-semibold text-blue-600' : ''}`}
              >
                Главная
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavigation('catalog'); }}
                className={`text-gray-700 hover:text-blue-600 ${currentPage === 'catalog' ? 'font-semibold text-blue-600' : ''}`}
              >
                Каталог
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavigation('installation'); }}
                className={`text-gray-700 hover:text-blue-600 ${currentPage === 'installation' ? 'font-semibold text-blue-600' : ''}`}
              >
                Монтаж
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavigation('encyclopedia'); }}
                className={`text-gray-700 hover:text-blue-600 ${currentPage === 'encyclopedia' ? 'font-semibold text-blue-600' : ''}`}
              >
                Энциклопедия климата
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavigation('contact'); }}
                className={`text-gray-700 hover:text-blue-600 ${currentPage === 'contact' ? 'font-semibold text-blue-600' : ''}`}
              >
                Связаться с нами
              </a>
              <a href="tel:+79636006006" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-block w-fit">
                +7 (963) 600-60-06
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
