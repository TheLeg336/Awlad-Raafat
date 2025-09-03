import React, { useState, useEffect } from 'react';
import { LayoutOption, LanguageOption } from '../types';
import type { TFunction } from '../App';

interface HeaderProps {
  layout: LayoutOption;
  language: LanguageOption;
  setLanguage: (lang: LanguageOption) => void;
  t: TFunction;
}

const Header: React.FC<HeaderProps> = ({ layout, language, setLanguage, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { key: 'nav_home', href: '#' },
    { key: 'nav_shop', href: '#shop' },
    { key: 'nav_about', href: '#about' },
    { key: 'nav_locations', href: '#' },
    { key: 'nav_contact', href: '#contact' },
  ];
  
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const header = document.querySelector('header');
        // Check if header is sticky
        const isSticky = header && window.getComputedStyle(header).position === 'sticky';
        const headerHeight = isSticky && header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };


  const headerClasses = {
    [LayoutOption.Minimalist]: 'sticky top-0 z-30 bg-[var(--color-background)] bg-opacity-80 backdrop-blur-md shadow-sm',
    [LayoutOption.Classic]: 'relative bg-[var(--color-background)] border-b-2 border-[var(--color-secondary)] border-opacity-20',
    [LayoutOption.Artistic]: 'relative bg-[var(--color-background)]',
    [LayoutOption.MonochromaticGallery]: 'sticky top-0 z-30 bg-[var(--color-background)] bg-opacity-50 backdrop-blur-lg',
    [LayoutOption.ArchitecturalBold]: 'relative bg-[var(--color-background)] border-b border-gray-500 border-opacity-20',
    [LayoutOption.ModernSleek]: 'sticky top-0 z-30 bg-[var(--color-background)] bg-opacity-80 backdrop-blur-xl shadow-sm',
  };

  const navClasses = {
    [LayoutOption.Minimalist]: 'text-sm tracking-wider uppercase',
    [LayoutOption.Classic]: 'text-lg',
    [LayoutOption.Artistic]: 'font-semibold',
    [LayoutOption.MonochromaticGallery]: 'text-md tracking-wide',
    [LayoutOption.ArchitecturalBold]: 'text-sm font-medium uppercase',
    [LayoutOption.ModernSleek]: 'text-sm font-medium tracking-wide',
  };

  const logoClasses = {
    [LayoutOption.Minimalist]: 'text-2xl font-bold tracking-tight',
    [LayoutOption.Classic]: 'text-3xl tracking-wide',
    [LayoutOption.Artistic]: 'text-2xl font-bold uppercase tracking-widest',
    [LayoutOption.MonochromaticGallery]: 'text-3xl font-light tracking-widest',
    [LayoutOption.ArchitecturalBold]: 'text-xl font-extrabold tracking-[0.2em] uppercase',
    [LayoutOption.ModernSleek]: 'text-xl font-semibold tracking-tighter',
  };

  const NavContent: React.FC<{isMobile?: boolean}> = ({ isMobile }) => (
    <>
      <ul className={`flex ${isMobile ? 'flex-col text-xl space-y-6' : `items-center ${navClasses[layout]} space-x-8`}`}>
        {navLinks.map(link => (
          <li key={link.key}>
            <a href={link.href} onClick={(e) => link.href.startsWith('#') ? handleSmoothScroll(e) : (isMobile && setIsMenuOpen(false))} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300">{t(link.key)}</a>
          </li>
        ))}
      </ul>
      <div className={`flex items-center space-x-4 ${isMobile ? 'mt-12 border-t border-[var(--color-text-secondary)]/20 pt-8' : 'ml-8'}`}>
        <button 
          onClick={() => setLanguage(LanguageOption.English)}
          className={`text-sm font-semibold ${language === LanguageOption.English ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'}`}
        >
          {t('lang_toggle_en')}
        </button>
        <span className="text-[var(--color-text-secondary)]">/</span>
        <button 
          onClick={() => setLanguage(LanguageOption.Arabic)}
          className={`text-sm font-semibold ${language === LanguageOption.Arabic ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'}`}
        >
          {t('lang_toggle_ar')}
        </button>
      </div>
    </>
  );

  return (
    <header className={`${headerClasses[layout]} transition-colors duration-500`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className={`${logoClasses[layout]} font-heading text-[var(--color-text-primary)] z-50`}>
          <a href="#">{t('logo')}</a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center">
          <NavContent />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="text-[var(--color-text-primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-40 bg-[var(--color-background)] border-l-2 border-[var(--color-secondary)] transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col items-center justify-center h-full">
            <NavContent isMobile={true}/>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;