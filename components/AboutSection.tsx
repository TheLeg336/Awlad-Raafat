import React from 'react';
import { motion, Variants } from 'framer-motion';
import { LayoutOption } from '../types';
import { getTextContent } from '../constants';
import type { TFunction } from '../App';

interface AboutSectionProps {
  layout: LayoutOption;
  t: TFunction;
}

const AboutSection: React.FC<AboutSectionProps> = ({ layout, t }) => {
  const content = getTextContent(t);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };
  
  return (
    <section className={'bg-[var(--color-text-primary)] text-[var(--color-background)] transition-colors duration-500 overflow-hidden py-16 sm:py-20 md:py-32'}>
      <div className={'container mx-auto px-6'}>
        <motion.div 
          className="text-center max-w-4xl mx-auto" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.5 }} 
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{content.about.title}</motion.h2>
          <motion.div variants={itemVariants} className="space-y-6 text-base sm:text-lg md:text-xl leading-relaxed opacity-80">
            <p>{content.about.p1}</p>
            <p>{content.about.p2}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;