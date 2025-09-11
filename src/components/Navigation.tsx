'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavigationProps {
  navigation: {
    companyName: string;
    items: Array<{ name: string; href: string }>;
    ctaText: string;
  };
}

const Navigation = ({ navigation }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add safety check for navigation items
  const navItems = navigation?.items || [];
  const companyName = navigation?.companyName || 'Keller Law Firm';
  const ctaText = navigation?.ctaText || 'Get Started';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg backdrop-blur-sm'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-playfair font-bold text-navy">
              {companyName}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item: any) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-navy font-medium hover:text-gold transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
              className="flex items-center gap-2 px-3 py-1 border border-gold rounded-md hover:bg-gold hover:text-white transition-colors"
              title="Switch language"
            >
              <Globe size={16} />
              <span className="font-medium">{language === 'de' ? 'EN' : 'DE'}</span>
            </button>
            
            <Link
              href="/contact"
              className="btn-primary ml-4"
            >
              {ctaText}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-navy"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item: any) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-navy font-medium hover:text-gold transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Language Switcher Mobile */}
              <button
                onClick={() => {
                  setLanguage(language === 'de' ? 'en' : 'de');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gold rounded-md hover:bg-gold hover:text-white transition-colors"
              >
                <Globe size={16} />
                <span className="font-medium">Switch to {language === 'de' ? 'English' : 'Deutsch'}</span>
              </button>
              
              <Link
                href="/contact"
                className="block w-full text-center btn-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {ctaText}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;