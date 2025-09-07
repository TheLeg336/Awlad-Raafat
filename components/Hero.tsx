import React, { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { LayoutOption } from '../types';
import { getTextContent } from '../constants';
import type { TFunction } from '../App';


interface HeroProps {
  layout: LayoutOption;
  t: TFunction;
}

const Hero: React.FC<HeroProps> = ({ layout, t }) => {
  const content = getTextContent(t);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);


  const currentConfig = {
      bgImage: 'https://picsum.photos/seed/sleek/1920/1080',
      containerClass: 'h-full flex items-center justify-center text-center',
      contentClass: 'w-full text-[var(--color-text-primary)]',
      titleClass: 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4',
      subtitleClass: 'text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-[var(--color-text-secondary)]',
      ctaClass: 'mt-8 px-8 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-opacity-80 font-semibold transition-colors duration-300 shine-effect',
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

      <div className={`${currentConfig.containerClass} relative z-[2]`}>
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