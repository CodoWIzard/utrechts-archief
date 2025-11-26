import { useState, useEffect } from 'react';

export type Language = 'nl' | 'en';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('nl');

  useEffect(() => {
    const saved = localStorage.getItem('panorama-language') as Language;
    if (saved) setLanguage(saved);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'nl' ? 'en' : 'nl';
    setLanguage(newLang);
    localStorage.setItem('panorama-language', newLang);
  };

  return { language, toggleLanguage };
};