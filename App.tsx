import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutOption, ColorSchemeOption, LanguageOption, TypographyOption, CustomImages } from './types';
import { COLOR_SCHEMES, TEXTS, PRODUCTS } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import VisitUsSection from './components/VisitUsSection';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import EditModeBanner from './components/EditModeBanner';
import ImageEditModal from './components/ImageEditModal';

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

const getInitialLanguage = (): LanguageOption => {
  if (typeof window !== 'undefined') {
    const storedLang = localStorage.getItem('language');
    if (storedLang === LanguageOption.English || storedLang === LanguageOption.Arabic) {
      return storedLang;
    }
    // Check browser preference if no language is stored
    if (navigator.language.startsWith('ar')) {
      return LanguageOption.Arabic;
    }
  }
  return LanguageOption.English; // Default to English
};

const getInitialCustomImages = (): CustomImages => {
  if (typeof window !== 'undefined') {
    const storedImages = localStorage.getItem('customImages');
    if (storedImages) {
      try {
        return JSON.parse(storedImages);
      } catch (e) {
        console.error("Failed to parse custom images from localStorage", e);
        return {};
      }
    }
  }
  return {};
}


const App: React.FC = () => {
  const layout = LayoutOption.ModernSleek;
  const colorScheme = ColorSchemeOption.BlackGold;
  const typography = TypographyOption.LuxeModern;

  const [language, setLanguage] = useState<LanguageOption>(getInitialLanguage);
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);
  const [isEditMode, setIsEditMode] = useState(false);
  const [customImages, setCustomImages] = useState<CustomImages>(getInitialCustomImages);
  const [editingImageKey, setEditingImageKey] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsEditMode(params.get('edit') === 'true');
  }, []);

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

  const handleUpdateImage = (key: string, dataUrl: string) => {
    const newImages = { ...customImages, [key]: dataUrl };
    setCustomImages(newImages);
    localStorage.setItem('customImages', JSON.stringify(newImages));
  };
  
  const handleResetImage = (key: string) => {
    const newImages = { ...customImages };
    delete newImages[key];
    setCustomImages(newImages);
    localStorage.setItem('customImages', JSON.stringify(newImages));
  };

  const findDefaultImage = (key: string | null): string | undefined => {
    if (!key) return undefined;
    if (key === 'heroBg') {
        return 'https://picsum.photos/seed/sleek/1920/1080';
    }
    if (key.startsWith('product-')) {
        const productId = parseInt(key.split('-')[1]);
        return PRODUCTS.find(p => p.id === productId)?.imageUrl;
    }
    return undefined;
  }

  const currentEditingImage = findDefaultImage(editingImageKey);
  const currentCustomImage = editingImageKey ? customImages[editingImageKey] : undefined;

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
          {isEditMode && <EditModeBanner />}
          <Header ref={headerRef} layout={layout} language={language} setLanguage={setLanguage} t={t} />
          <main>
            <Hero
              layout={layout}
              t={t}
              isEditMode={isEditMode}
              customImage={customImages['heroBg']}
              onEdit={() => setEditingImageKey('heroBg')}
            />
            <ProductSection
              layout={layout}
              t={t}
              isEditMode={isEditMode}
              customImages={customImages}
              onEdit={(key) => setEditingImageKey(key)}
            />
            <VisitUsSection t={t} />
          </main>
          <Footer layout={layout} t={t} />
        </motion.div>
      </AnimatePresence>
      <ThemeToggle themeMode={themeMode} setThemeMode={setThemeMode} />
      <ImageEditModal
        isOpen={!!editingImageKey}
        onClose={() => setEditingImageKey(null)}
        onSave={(dataUrl) => {
            if (editingImageKey) handleUpdateImage(editingImageKey, dataUrl);
            setEditingImageKey(null);
        }}
        onReset={() => {
            if (editingImageKey) handleResetImage(editingImageKey);
            setEditingImageKey(null);
        }}
        currentImage={currentCustomImage || currentEditingImage}
        defaultImage={currentEditingImage}
      />
    </div>
  );
};

export default App;
