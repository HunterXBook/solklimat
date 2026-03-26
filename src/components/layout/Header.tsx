import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Голубые цвета для меню
  const menuItemClass = (path: string) => `
    px-4 py-2 rounded-lg transition-all duration-200
    ${isActive(path) 
      ? 'bg-sky-100 text-sky-700 font-semibold' 
      : 'text-sky-600 hover:bg-sky-50 hover:text-sky-700'
    }
  `;

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
            <div className="flex space-x-2">
              <Link 
                to="/" 
                className={menuItemClass('/')}
              >
                Главная
              </Link>
              <Link 
                to="/catalog" 
                className={menuItemClass('/catalog')}
              >
                Каталог
              </Link>
              <Link 
                to="/installation" 
                className={menuItemClass('/installation')}
              >
                Монтаж
              </Link>
              <Link 
                to="/encyclopedia" 
                className={menuItemClass('/encyclopedia')}
              >
                Энциклопедия
              </Link>
            </div>
          </nav>
          
          {/* Кнопка связаться */}
          <div className="hidden md:block">
            <Link 
              to="/contact"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Связаться с нами
            </Link>
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
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg ${isActive('/') ? 'bg-sky-100 text-sky-700 font-semibold' : 'text-sky-600 hover:bg-sky-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Главная
              </Link>
              <Link 
                to="/catalog" 
                className={`px-4 py-2 rounded-lg ${isActive('/catalog') ? 'bg-sky-100 text-sky-700 font-semibold' : 'text-sky-600 hover:bg-sky-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Каталог
              </Link>
              <Link 
                to="/installation" 
                className={`px-4 py-2 rounded-lg ${isActive('/installation') ? 'bg-sky-100 text-sky-700 font-semibold' : 'text-sky-600 hover:bg-sky-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Монтаж
              </Link>
              <Link 
                to="/encyclopedia" 
                className={`px-4 py-2 rounded-lg ${isActive('/encyclopedia') ? 'bg-sky-100 text-sky-700 font-semibold' : 'text-sky-600 hover:bg-sky-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Энциклопедия
              </Link>
              <Link 
                to="/contact" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center gap-2 w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-4 w-4" />
                Связаться с нами
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
