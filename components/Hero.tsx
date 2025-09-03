import React from 'react';
// FIX: Import Variants from framer-motion to correctly type animation variants.
import { motion, Variants } from 'framer-motion';
import { LayoutOption } from '../types';
import { getTextContent } from '../constants';
import type { TFunction } from '../App';


interface HeroProps {
  layout: LayoutOption;
  t: TFunction;
}

const Hero: React.FC<HeroProps> = ({ layout, t }) => {
  const content = getTextContent(t);

  const heroConfig = {
    [LayoutOption.Minimalist]: {
      bgImage: 'https://picsum.photos/seed/minimalist/1920/1080',
      containerClass: 'min-h-[70vh] lg:min-h-[80vh] flex items-center',
      contentClass: 'text-center w-full',
      titleClass: 'text-4xl sm:text-5xl md:text-7xl font-bold mb-4',
      subtitleClass: 'text-lg md:text-xl max-w-2xl mx-auto',
      ctaClass: 'mt-8 px-8 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-secondary)] transition-all duration-300 transform hover:scale-105',
      content: content.hero.minimalist,
    },
    [LayoutOption.Classic]: {
      bgImage: 'https://picsum.photos/seed/classic/1920/1080',
      containerClass: 'min-h-[60vh] lg:min-h-[70vh] flex items-center',
      contentClass: 'bg-[var(--color-background)] bg-opacity-70 p-8 md:p-16 w-full md:w-1/2',
      titleClass: 'text-4xl md:text-6xl mb-4',
      subtitleClass: 'text-lg md:text-xl',
      ctaClass: 'mt-8 px-10 py-4 border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-all duration-300 transform hover:scale-105',
      content: content.hero.classic,
    },
    [LayoutOption.Artistic]: {
      bgImage: 'https://picsum.photos/seed/artistic/1920/1080',
      containerClass: 'min-h-screen flex items-end',
      contentClass: 'text-left p-8 md:p-20 w-full',
      titleClass: 'text-4xl sm:text-5xl md:text-8xl font-extrabold mb-2',
      subtitleClass: 'text-md md:text-lg max-w-xl',
      ctaClass: 'mt-8 px-8 py-3 bg-[var(--color-secondary)] text-[var(--color-background)] font-bold tracking-widest uppercase hover:bg-[var(--color-primary)] transition-all duration-300 transform hover:scale-105',
      content: content.hero.artistic,
    },
    [LayoutOption.MonochromaticGallery]: {
        bgImage: 'https://picsum.photos/seed/gallery/1920/1080',
        containerClass: 'min-h-screen flex items-center justify-center',
        contentClass: 'text-center w-full max-w-4xl mx-auto backdrop-blur-sm bg-black/20 p-8',
        titleClass: 'text-4xl sm:text-5xl md:text-8xl font-light tracking-wider text-white',
        subtitleClass: 'text-base md:text-xl text-gray-200 mt-4',
        ctaClass: 'mt-10 text-lg text-white border-b border-white pb-1 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-300',
        content: content.hero['monochromatic-gallery'],
    },
    [LayoutOption.ArchitecturalBold]: {
        bgImage: 'https://picsum.photos/seed/architect/1920/1080',
        containerClass: 'min-h-[70vh] lg:min-h-[90vh] flex items-center',
        contentClass: 'text-left w-full md:w-3/5 lg:w-1/2',
        titleClass: 'text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter text-[var(--color-text-primary)]',
        subtitleClass: 'text-lg md:text-2xl text-[var(--color-text-secondary)] mt-4 max-w-lg',
        ctaClass: 'mt-8 px-12 py-4 bg-[var(--color-primary)] text-[var(--color-background)] font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-lg',
        content: content.hero['architectural-bold'],
    },
    [LayoutOption.ModernSleek]: {
      bgImage: 'https://picsum.photos/seed/sleek/1920/1080',
      containerClass: 'min-h-screen flex items-center justify-center text-center',
      contentClass: 'w-full text-[var(--color-text-primary)]',
      titleClass: 'text-5xl md:text-8xl font-extrabold tracking-tighter mb-4',
      subtitleClass: 'text-lg md:text-2xl max-w-2xl mx-auto text-[var(--color-text-secondary)]',
      ctaClass: 'mt-8 px-8 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-opacity-80 font-semibold transition-colors duration-300',
      content: content.hero['modern-sleek'],
  },
  };

  const currentConfig = heroConfig[layout];

  // FIX: Explicitly type animation variants with the 'Variants' type from framer-motion.
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  // FIX: Explicitly type animation variants with the 'Variants' type from framer-motion.
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div
      className="bg-cover bg-center text-[var(--color-text-primary)] transition-all duration-500"
      style={{ backgroundImage: `url(${currentConfig.bgImage})` }}
    >
      <div className={currentConfig.containerClass}>
        <div className="container mx-auto px-6">
          <motion.div
            className={currentConfig.contentClass}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className={currentConfig.titleClass}>{currentConfig.content.title}</motion.h1>
            <motion.p variants={itemVariants} className={currentConfig.subtitleClass}>{currentConfig.content.subtitle}</motion.p>
            <motion.button 
              variants={itemVariants} 
              className={currentConfig.ctaClass}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {currentConfig.content.cta}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
