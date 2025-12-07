import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = ({ }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      window.location.href = `/#${targetId}`;
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-white" onClick={() => setMobileMenuOpen(false)}>
          <img src="/imagens/liner-white.png" alt="OFFZ. Web Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="#services" 
            onClick={(e) => handleScrollToSection(e, 'services')}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            Serviços
          </a>
          <Link 
            to="/projects" 
            className={`text-sm font-medium ${location.pathname === '/projects' ? 'text-white' : 'text-gray-300'} hover:text-white transition-colors cursor-pointer`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Projetos
          </Link>
          
          <a 
            href="http://wa.me/5551986512816"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Contato
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface border-b border-white/10 p-6 md:hidden flex flex-col gap-4 shadow-2xl">
          <a 
            href="#services" 
            onClick={(e) => handleScrollToSection(e, 'services')}
            className="text-gray-300 hover:text-white py-2 block cursor-pointer"
          >
            Serviços
          </a>
          <Link 
            to="/projects" 
            className="text-gray-300 hover:text-white py-2 block cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projetos
          </Link>
          <a 
            href="http://wa.me/5551986512816"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center w-full px-5 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 block cursor-pointer"
          >
            Contato
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;