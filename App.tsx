import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutOption, ColorSchemeOption, LanguageOption, TypographyOption, User } from './types';
import { COLOR_SCHEMES, TEXTS } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import VisitUsSection from './components/VisitUsSection';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import { useAuth } from './AuthContext';
import LoginPage from './components/LoginPage';
import EditModeBanner from './components/EditModeBanner';
import EditableText from './components/EditableText';

export type TFunction = (key: string) => string;
type ThemeMode = 'light' | 'dark';
type UpdateTextFunction = (key: string, value: string) => void;

const STORED_TEXTS_KEY = 'awlad-raafat-texts';

const getInitialTexts = (): Record<string, Record<string, string>> => {
  try {
    const stored = localStorage.getItem(STORED_TEXTS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // A simple merge, stored values override defaults
      return {
        en: { ...TEXTS.en, ...parsed.en },
        ar: { ...TEXTS.ar, ...parsed.ar },
      };
    }
  } catch (e) {
    console.error("Could not parse stored texts", e);
    localStorage.removeItem(STORED_TEXTS_KEY);
  }
  return TEXTS;
};


const getInitialThemeMode = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('themeMode');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return COLOR_SCHEMES[ColorSchemeOption.BlackGold].defaultMode;
};

const getInitialLanguage = (): LanguageOption => {
  if (typeof window !== 'undefined') {
    const storedLang = localStorage.getItem('language');
    if (storedLang === LanguageOption.English || storedLang === LanguageOption.Arabic) {
      return storedLang;
    }
    if (navigator.language.startsWith('ar')) {
      return LanguageOption.Arabic;
    }
  }
  return LanguageOption.English;
};


const AppContent: React.FC = () => {
  const layout = LayoutOption.ModernSleek;
  const colorScheme = ColorSchemeOption.BlackGold;
  const typography = TypographyOption.LuxeModern;

  const [language, setLanguage] = useState<LanguageOption>(getInitialLanguage);
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);
  const [texts, setTexts] = useState(getInitialTexts);
  const headerRef = useRef<HTMLElement>(null);

  const updateText = useCallback((key: string, value: string) => {
      setTexts(currentTexts => {
          const newTextsForLang = {
              ...currentTexts[language],
              [key]: value
          };
          const newTexts = {
              ...currentTexts,
              [language]: newTextsForLang
          };
          
          try {
            const stored = JSON.parse(localStorage.getItem(STORED_TEXTS_KEY) || '{}');
            const updatedStored = {
                ...stored,
                [language]: {
                    ...stored[language],
                    [key]: value
                }
            };
            localStorage.setItem(STORED_TEXTS_KEY, JSON.stringify(updatedStored));
          } catch(e) {
            console.error("Could not update stored texts", e);
          }

          return newTexts;
      });
  }, [language]);

  useLayoutEffect(() => {
    const headerElement = headerRef.current;
    if (!headerElement) return;

    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-height', `${headerElement.offsetHeight}px`);
    });

    observer.observe(headerElement);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
    const root = document.documentElement;
    const scheme = COLOR_SCHEMES[colorScheme][themeMode];
    root.style.setProperty('--color-primary', scheme.primary);
    root.style.setProperty('--color-secondary', scheme.secondary);
    root.style.setProperty('--color-background', scheme.background);
    root.style.setProperty('--color-text-primary', scheme.textPrimary);
    root.style.setProperty('--color-text-secondary', scheme.textSecondary);
    root.style.setProperty('--color-success', scheme.success);

    root.style.scrollBehavior = 'smooth';
    
    return () => {
      root.style.scrollBehavior = 'auto';
    };
  }, [colorScheme, themeMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('themeMode')) {
            setThemeMode(e.matches ? 'dark' : 'light');
        }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === LanguageOption.Arabic ? 'rtl' : 'ltr';
  }, [language]);
  
  const t = useCallback((key: string): string => {
    return texts[language]?.[key] || TEXTS[LanguageOption.English][key] || key;
  }, [language, texts]);
  
  const getFontClasses = () => {
    if (language === 'ar') return 'font-arabic';
    switch (typography) {
      case TypographyOption.LuxeModern:
        return 'font-body-luxe font-heading-luxe';
      default:
        return '';
    }
  };

  return (
    <div className={`${getFontClasses()} bg-[var(--color-background)] text-[var(--color-text-primary)] transition-colors duration-500`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${layout}-${language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header ref={headerRef} layout={layout} language={language} setLanguage={setLanguage} t={t} onUpdateText={updateText} />
          <main>
            <Hero
              layout={layout}
              t={t}
              onUpdateText={updateText}
            />
            <ProductSection
              layout={layout}
              t={t}
              onUpdateText={updateText}
            />
            <VisitUsSection t={t} onUpdateText={updateText}/>
          </main>
          <Footer layout={layout} t={t} onUpdateText={updateText} />
        </motion.div>
      </AnimatePresence>
      <ThemeToggle themeMode={themeMode} setThemeMode={setThemeMode} />
    </div>
  );
};

const App: React.FC = () => {
  const { user, isEditMode } = useAuth();
  
  if (isEditMode && !user) {
      return <LoginPage />;
  }
  
  return (
      <>
          {isEditMode && <EditModeBanner />}
          <AppContent />
      </>
  );
};


export default App;
