import React from 'react';
import { motion } from 'framer-motion';

interface EditModeBannerProps {
  onExit: () => void;
}

const EditModeBanner: React.FC<EditModeBannerProps> = ({ onExit }) => {
  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-secondary)] text-[var(--color-background)]"
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center h-[60px]">
        <p className="font-semibold text-sm md:text-base">Edit Mode is ON. Click on any text to change it.</p>
        <button
          onClick={onExit}
          className="px-3 py-1 md:px-4 md:py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-opacity-80 font-semibold transition-colors duration-300 text-sm"
        >
          Exit Edit Mode
        </button>
      </div>
    </motion.div>
  );
};

export default EditModeBanner;