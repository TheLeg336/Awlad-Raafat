import React, { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { LayoutOption } from '../types';
import type { TFunction } from '../types';
import { HERO_IMAGE_URL } from '../constants';


interface HeroProps {
  layout: LayoutOption;
  t: TFunction;
}

const Hero: React.FC<HeroProps> = ({ layout, t }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const defaultBgImage = HERO_IMAGE_URL;

  const currentConfig = {
      bgImage: defaultBgImage,
      contentClass: 'w-full text-[var(--color-text-primary)]',
      titleClass: 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4',
      subtitleClass: 'text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-[var(--color-text-secondary)]',
      ctaClass: 'mt-8 px-8 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-opacity-80 font-semibold transition-colors duration-300 shine-effect',
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section
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
      
      <div className="relative z-[2] h-full container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          className={currentConfig.contentClass}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className={currentConfig.titleClass}>{t('hero_sleek_title')}</motion.h1>
          <motion.button 
            variants={itemVariants} 
            className={currentConfig.ctaClass}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <span>{t('hero_cta_learn_more')}</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;