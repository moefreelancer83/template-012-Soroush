'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
  showCookieBannerTrigger: boolean;
  triggerCookieBanner: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  templateData: any;  // Now required, not optional
}

export function LanguageProvider({ children, templateData }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('de');
  const [showCookieBannerTrigger, setShowCookieBannerTrigger] = useState(false);
  
  // Use provided templateData with fallback
  const data = templateData || { de: {}, en: {} };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'de' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const triggerCookieBanner = () => {
    setShowCookieBannerTrigger(true);
    // Reset trigger after a brief moment
    setTimeout(() => setShowCookieBannerTrigger(false), 100);
  };

  const t = data[language] || {};

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t, 
      showCookieBannerTrigger, 
      triggerCookieBanner 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}