import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Логотип */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-blue-600"
            >
              СОЛКЛИМАТ
            </Link>
          </div>
          
          {/* Навигация для десктопа - центрированная */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-4">
            <div className="flex space-x-8">
              <Link 
                to="/" 
                className={`text-gray-700 hover:text-blue-600 ${isActive('/') ? 'font-semibold text-blue-600' : ''}`}
              >
                Главная
              </Link>
              <Link 
                to="/catalog" 
                className={`text-gray-700 hover:text-blue-600 ${isActive('/catalog') ? 'font-semibold text-blue-600' : ''}`}
              >
                Каталог
              </Link>
              <Link 
                to="/installation" 
                className={`text-gray-700 hover:text-blue-600 ${isActive('/installation') ? 'font-semibold text-blue-600' : ''}`}
              >
                Монтаж
              </Link>
              <Link 
                to="/encyclopedia" 
                className={`text-gray-700 hover:text-blue-600 ${isActive('/encyclopedia') ? 'font-semibold text-blue-600' : ''}`}
              >
                Энциклопедия климата
              </Link>
              <Link 
                to="/contact" 
                className={`text-gray-700 hover:text-blue-600 ${isActive('/contact') ? 'font-semibold text-blue-600' : ''}`}
              >
                Связаться с нами
              </Link>
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
              <Link 
                to="/" 
                className={`text-gray-700 hover:text-blue-600 ${isActive('/') ? 'font-semibold text-blue-600' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Главная
              </Link>
              <Link 
                to="/catalog" 
                className={`text-gray-700 hover:text-blue-600 ${isActive('/catalog') ? 'font-semibold text-blue-600' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Каталог
              </Link>
              <Link 
                to="/installation" 
                className={`text-gray-700 hover:text-blue-600 ${isActive('/installation') ? 'font-semibold text-blue-600' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Монтаж
              </Link>
              <Link 
                to="/encyclopedia" 
                className={`text-gray-700 hover:text-blue-600 ${isActive('/encyclopedia') ? 'font-semibold text-blue-600' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Энциклопедия климата
              </Link>
              <Link 
                to="/contact" 
                className={`text-gray-700 hover:text-blue-600 ${isActive('/contact') ? 'font-semibold text-blue-600' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Связаться с нами
              </Link>
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
