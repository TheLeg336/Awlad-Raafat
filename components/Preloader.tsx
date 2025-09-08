import React from 'react';
import { motion } from 'framer-motion';
import type { TFunction } from '../types';

interface PreloaderProps {
  t: TFunction;
}

const Preloader: React.FC<PreloaderProps> = ({ t }) => {
  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-background)]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="text-2xl font-semibold tracking-tighter font-heading text-[var(--color-text-primary)]"
      >
        {t('logo')}
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
