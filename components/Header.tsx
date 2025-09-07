import React, { useState, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutOption, LanguageOption } from '../types';
import type { TFunction } from '../App';

interface HeaderProps {
  layout: LayoutOption;
  language: LanguageOption;
  setLanguage: (lang: LanguageOption) => void;
  t: TFunction;
}

const Header = forwardRef<HTMLElement, HeaderProps>(({ layout, language, setLanguage, t }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isRtl = language === LanguageOption.Arabic;

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { key: 'nav_home', href: '#' },
    { key: 'nav_shop', href: '#shop' },
    { key: 'nav_about', href: '#visit-us' },
    { key: 'nav_contact', href: '#contact' },
  ];
  
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close menu on link click
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const header = document.querySelector('header');
        const isSticky = header && window.getComputedStyle(header).position === 'sticky';
        const headerHeight = isSticky && header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const headerClass = 'sticky top-0 z-20 bg-[var(--color-background)] bg-opacity-80 backdrop-blur-xl shadow-sm';
  const navClass = 'text-sm font-medium tracking-wide';
  const logoClass = 'text-xl font-semibold tracking-tighter';

  const NavContent: React.FC<{isMobile?: boolean}> = ({ isMobile }) => (
    <>
      <ul className={`flex ${isMobile ? 'flex-col text-xl space-y-10 items-center' : `items-center ${navClass} space-x-8`}`}>
        {navLinks.map(link => (
          <li key={link.key}>
            <a href={link.href} onClick={(e) => link.href.startsWith('#') ? handleSmoothScroll(e) : setIsMenuOpen(false)} className={`nav-link text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 ${isMobile ? 'leading-loose' : ''}`}>{t(link.key)}</a>
          </li>
        ))}
      </ul>
      <div className={`flex items-center ${isMobile ? 'mt-12 border-t border-[var(--color-text-secondary)]/20 pt-8' : 'md:ml-8'}`}>
        <motion.button 
          onClick={() => setLanguage(LanguageOption.English)}
          className={`text-sm font-semibold ${language === LanguageOption.English ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('lang_toggle_en')}
        </motion.button>
        <span className="text-[var(--color-text-secondary)] mx-2">/</span>
        <motion.button 
          onClick={() => setLanguage(LanguageOption.Arabic)}
          className={`text-sm font-semibold ${language === LanguageOption.Arabic ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('lang_toggle_ar')}
        </motion.button>
      </div>
    </>
  );

  return (
    <>
      <header ref={ref} className={`${headerClass} transition-colors duration-500`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className={`${logoClass} font-heading text-[var(--color-text-primary)]`}>
            <a href="#" className="logo-shine logo-shine-onload">{t('logo')}</a>
          </div>

          <nav className="hidden md:flex items-center">
            <NavContent />
          </nav>

          <div className="md:hidden z-50">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu" className="text-[var(--color-text-primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              aria-hidden="true"
            />
            <motion.div
              className={`fixed top-0 h-full w-full max-w-xs z-40 bg-[var(--color-background)] shadow-2xl ${isRtl ? 'left-0 border-l-2' : 'right-0 border-r-2'} border-[var(--color-secondary)]`}
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-10">
                  <div className={`${logoClass} font-heading text-[var(--color-text-primary)]`}>
                    <a href="#" onClick={() => setIsMenuOpen(false)}>{t('logo')}</a>
                  </div>
                  <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="text-[var(--color-text-primary)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="flex-grow flex flex-col items-center justify-center">
                  <NavContent isMobile={true}/>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

export default Header;