import { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import CatalogPage from './components/pages/catalog/CatalogPage';
import CategoryPage from './components/pages/catalog/CategoryPage';
import ModelPage from './components/pages/catalog/ModelPage';
import ContactPage from './components/pages/ContactPage';
import InstallationPage from './components/pages/installation/InstallationPage';
import EncyclopediaPage from './components/pages/encyclopedia/EncyclopediaPage';
import PrivacyPolicyPage from './components/pages/PrivacyPolicyPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    // Сбрасываем выбранную категорию и модель при переходе на другие страницы
    if (page !== 'category' && page !== 'model' && page !== 'model-versions') {
      setSelectedCategory('');
      setSelectedModel('');
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('model');
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setCurrentPage('model-versions');
  };

  const handleBackToCategory = () => {
    setSelectedModel('');
    setCurrentPage('model');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'catalog':
        return <CatalogPage onCategorySelect={handleCategorySelect} />;
      case 'model':
        return <ModelPage 
                 categoryId={selectedCategory} 
                 onBack={() => handleNavigate('catalog')} 
                 onModelSelect={handleModelSelect}
               />;
      case 'model-versions':
        return <CategoryPage 
                 categoryId={selectedCategory} 
                 modelFilter={selectedModel}
                 onBack={handleBackToCategory} 
               />;
      case 'installation':
        return <InstallationPage />;
      case 'encyclopedia':
        return <EncyclopediaPage />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'privacy-policy':
        return <PrivacyPolicyPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow bg-gray-50">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
