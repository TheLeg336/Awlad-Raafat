import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutOption, ColorSchemeOption, LanguageOption, TypographyOption } from './types';
import { COLOR_SCHEMES, TEXTS } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import Customizer from './components/Customizer';
import ProductSection from './components/ProductSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

export type TFunction = (key: string) => string;
type ThemeMode = 'light' | 'dark';

const App: React.FC = () => {
  const [layout, setLayout] = useState<LayoutOption>(LayoutOption.MonochromaticGallery);
  const [colorScheme, setColorScheme] = useState<ColorSchemeOption>(ColorSchemeOption.IvoryTaupe);
  const [language, setLanguage] = useState<LanguageOption>(LanguageOption.English);
  const [typography, setTypography] = useState<TypographyOption>(TypographyOption.LuxeModern);
  const [themeMode, setThemeMode] = useState<ThemeMode>(COLOR_SCHEMES[colorScheme].defaultMode);

  useEffect(() => {
    const root = document.documentElement;
    const scheme = COLOR_SCHEMES[colorScheme][themeMode];
    root.style.setProperty('--color-primary', scheme.primary);
    root.style.setProperty('--color-secondary', scheme.secondary);
    root.style.setProperty('--color-background', scheme.background);
    root.style.setProperty('--color-text-primary', scheme.textPrimary);
    root.style.setProperty('--color-text-secondary', scheme.textSecondary);
    root.style.setProperty('--color-success', scheme.success);
  }, [colorScheme, themeMode]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === LanguageOption.Arabic ? 'rtl' : 'ltr';
  }, [language]);
  
  const t = useCallback((key: string): string => {
    return TEXTS[language][key] || TEXTS[LanguageOption.English][key] || key;
  }, [language]);
  
  const handleColorSchemeChange = (scheme: ColorSchemeOption) => {
      setColorScheme(scheme);
      setThemeMode(COLOR_SCHEMES[scheme].defaultMode);
  };

  const getFontClasses = () => {
    if (language === 'ar') return 'font-arabic';
    switch (typography) {
      case TypographyOption.Modern:
        return 'font-body-modern font-heading-modern';
      case TypographyOption.Classic:
        return 'font-body-classic font-heading-classic';
      case TypographyOption.Contemporary:
        return 'font-body-contemporary font-heading-contemporary';
      case TypographyOption.LuxeModern:
        return 'font-body-luxe font-heading-luxe';
      case TypographyOption.RefinedSerif:
        return 'font-body-refined font-heading-refined';
      case TypographyOption.ModernSleek:
        return 'font-body-sleek font-heading-sleek';
      default:
        return '';
    }
  };

  return (
    <div className={`${getFontClasses()} bg-[var(--color-background)] text-[var(--color-text-primary)] transition-colors duration-500`}>
      <Customizer 
        layout={layout} 
        setLayout={setLayout} 
        colorScheme={colorScheme}
        onColorSchemeChange={handleColorSchemeChange}
        typography={typography}
        setTypography={setTypography}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={`${layout}-${language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header layout={layout} language={language} setLanguage={setLanguage} t={t} />
          <main>
            <Hero layout={layout} t={t} />
            <ProductSection layout={layout} t={t} />
            <AboutSection layout={layout} t={t} />
          </main>
          <Footer layout={layout} t={t} />
        </motion.div>
      </AnimatePresence>
      <ThemeToggle themeMode={themeMode} setThemeMode={setThemeMode} />
    </div>
  );
};

export default App;