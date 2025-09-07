import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutOption, ColorSchemeOption, LanguageOption, TypographyOption } from './types';
import { COLOR_SCHEMES, TEXTS } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import VisitUsSection from './components/VisitUsSection';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

export type TFunction = (key: string) => string;
type ThemeMode = 'light' | 'dark';

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


const App: React.FC = () => {
  const layout = LayoutOption.ModernSleek;
  const colorScheme = ColorSchemeOption.BlackGold;
  const typography = TypographyOption.LuxeModern;

  const [language, setLanguage] = useState<LanguageOption>(LanguageOption.English);
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);
  const headerRef = useRef<HTMLElement>(null);

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

    // Apply smooth scrolling to the html element
    root.style.scrollBehavior = 'smooth';
    
    return () => {
      // Cleanup scroll behavior on component unmount
      root.style.scrollBehavior = 'auto';
    };
  }, [colorScheme, themeMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
        setThemeMode(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === LanguageOption.Arabic ? 'rtl' : 'ltr';
  }, [language]);
  
  const t = useCallback((key: string): string => {
    return TEXTS[language][key] || TEXTS[LanguageOption.English][key] || key;
  }, [language]);
  
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
          <Header ref={headerRef} layout={layout} language={language} setLanguage={setLanguage} t={t} />
          <main>
            <Hero layout={layout} t={t} />
            <ProductSection layout={layout} t={t} />
            <VisitUsSection t={t} />
          </main>
          <Footer layout={layout} t={t} />
        </motion.div>
      </AnimatePresence>
      <ThemeToggle themeMode={themeMode} setThemeMode={setThemeMode} />
    </div>
  );
};

export default App;