import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { LayoutOption, ColorSchemeOption, LanguageOption, TypographyOption, type TFunction } from './types';
import { COLOR_SCHEMES, TEXTS } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import VisitUsSection from './components/VisitUsSection';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

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

const App: React.FC = () => {
  const layout = LayoutOption.ModernSleek;
  const colorScheme = ColorSchemeOption.BlackGold;
  const typography = TypographyOption.LuxeModern;

  const [language, setLanguage] = useState<LanguageOption>(getInitialLanguage);
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);
  const [isShineAnimating, setIsShineAnimating] = useState(true);
  const headerRef = useRef<HTMLElement>(null);

  const texts = TEXTS;

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
    root.style.setProperty('--color-primary-hsl-values', scheme.primaryHsl);
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

    setIsShineAnimating(false);
    const timer = setTimeout(() => {
        setIsShineAnimating(true);
    }, 10);
    return () => clearTimeout(timer);
  }, [language]);
  
  const t: TFunction = useCallback((key: string): string => {
    const langTexts = texts[language] || TEXTS[LanguageOption.English];
    return langTexts[key] || key;
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
      <Header 
        ref={headerRef} 
        layout={layout} 
        language={language} 
        setLanguage={setLanguage} 
        t={t} 
        isShineAnimating={isShineAnimating}
      />
      <main>
        <Hero
          layout={layout}
          t={t}
        />
        <ProductSection
          layout={layout}
          t={t}
        />
        <VisitUsSection 
          t={t}
        />
      </main>
      <Footer 
        layout={layout} 
        t={t}
      />
      <ThemeToggle themeMode={themeMode} setThemeMode={setThemeMode} />
    </div>
  );
};

export default App;