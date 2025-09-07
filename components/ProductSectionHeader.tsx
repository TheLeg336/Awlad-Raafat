import React from 'react';
import { motion, Variants } from 'framer-motion';
import { getTextContent } from '../constants';
import type { TFunction } from '../App';

interface ProductSectionHeaderProps {
  t: TFunction;
}

const ProductSectionHeader: React.FC<ProductSectionHeaderProps> = ({ t }) => {
  const content = getTextContent(t);

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <motion.div
      className="text-center"
      variants={headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">{content.products.title}</h2>
      <p className="text-md sm:text-lg text-[var(--color-text-secondary)] mt-4 max-w-2xl mx-auto">{content.products.subtitle}</p>
    </motion.div>
  );
};

export default ProductSectionHeader;
