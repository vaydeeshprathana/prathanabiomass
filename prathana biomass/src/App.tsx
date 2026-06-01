import { useState } from 'react';
import Sidebar, { type Page } from './components/Sidebar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function isAdminPath() {
  return window.location.pathname === '/secure-panel';
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [adminMode] = useState(isAdminPath);

  if (adminMode) {
    return <Admin />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'products': return <Products onNavigate={setCurrentPage} />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-stone-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 lg:ml-72 pt-14 lg:pt-0 overflow-x-hidden">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
