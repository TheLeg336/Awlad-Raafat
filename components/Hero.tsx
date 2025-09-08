import React, { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { LayoutOption } from '../types';
import { getTextContent } from '../constants';
import type { TFunction } from '../App';
import EditIcon from './icons/EditIcon';


interface HeroProps {
  layout: LayoutOption;
  t: TFunction;
  isEditMode: boolean;
  customImage: string | undefined;
  onEdit: () => void;
}

const Hero: React.FC<HeroProps> = ({ layout, t, isEditMode, customImage, onEdit }) => {
  const content = getTextContent(t);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const defaultBgImage = 'https://picsum.photos/seed/sleek/1920/1080';

  const currentConfig = {
      bgImage: customImage || defaultBgImage,
      contentClass: 'w-full text-[var(--color-text-primary)]',
      titleClass: 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4',
      subtitleClass: 'text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-[var(--color-text-secondary)]',
      ctaClass: 'mt-8 px-8 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-opacity-80 font-semibold transition-colors duration-300 logo-shine button-shine-onload',
      content: content.hero['modern-sleek'],
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

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
      ref={ref}
      className="relative text-[var(--color-text-primary)] transition-all duration-500 h-[50vh] md:h-screen overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${currentConfig.bgImage})`,
          y: backgroundY
        }}
      />
      <div className="absolute inset-0 z-[1] bg-black/20" /> {/* Optional overlay for text readability */}
      
      {isEditMode && (
          <button
              onClick={onEdit}
              className="absolute top-5 right-5 z-10 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white transition-all duration-300 shadow-lg flex items-center gap-2"
              aria-label="Edit hero background image"
          >
              <EditIcon />
              Edit Background
          </button>
      )}

      <div className="relative z-[2] h-full container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          className={currentConfig.contentClass}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className={currentConfig.titleClass}>{currentConfig.content.title}</motion.h1>
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
  );
};

export default Hero;
