import { Routes, Route } from 'react-router-dom';
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
import PrivacyPolicyFullPage from './components/pages/PrivacyPolicyFullPage';
import AdminPage from './components/pages/AdminPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:categoryId" element={<CategoryPage />} />
          <Route path="/catalog/:categoryId/:modelId" element={<ModelPage />} />
          <Route path="/installation" element={<InstallationPage />} />
          <Route path="/encyclopedia" element={<EncyclopediaPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy-policy-full" element={<PrivacyPolicyFullPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
