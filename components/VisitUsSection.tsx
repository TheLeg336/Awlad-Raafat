import React from 'react';
import { motion, Variants } from 'framer-motion';
import type { TFunction } from '../App';
import EditableText from './EditableText';

interface VisitUsSectionProps {
  t: TFunction;
  onUpdateText: (key: string, value: string) => void;
}

const VisitUsSection: React.FC<VisitUsSectionProps> = ({ t, onUpdateText }) => {
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
    <section id="visit-us" className="bg-[var(--color-background)] py-16 sm:py-20 md:py-28">
      <motion.div
        className="container mx-auto px-6 text-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
          <EditableText textKey="visit_us_title" onUpdate={onUpdateText}>
              <span>{t('visit_us_title')}</span>
          </EditableText>
        </motion.h2>
        <motion.p variants={itemVariants} className="text-md sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
          <EditableText textKey="visit_us_p1" onUpdate={onUpdateText}>
              <span>{t('visit_us_p1')}</span>
          </EditableText>
        </motion.p>
      </motion.div>
    </section>
  );
};

export default VisitUsSection;