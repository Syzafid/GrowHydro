
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'id';

// Define the context shape
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'id', // Default to Indonesian
  setLanguage: () => {},
  t: (key) => key,
});

// Define props for the provider component
interface LanguageProviderProps {
  children: React.ReactNode;
}

// Create the provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize state from localStorage if available, otherwise use 'id' (Indonesian)
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'id';
  });

  // Import the translation file dynamically based on the selected language
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language);
    
    // Dynamically import translations
    const loadTranslations = async () => {
      try {
        // We've changed the import path here to match our new structure
        const translationsModule = await import(`../translations/${language}.ts`);
        setTranslations(translationsModule.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to empty translations
        setTranslations({});
      }
    };
    
    loadTranslations();
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
