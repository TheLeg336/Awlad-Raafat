import React from 'react';
import { motion, Variants } from 'framer-motion';
import { getTextContent } from '../constants';
import type { TFunction } from '../App';
import EditableText from './EditableText';

interface ProductSectionHeaderProps {
  t: TFunction;
  onUpdateText: (key: string, value: string) => void;
}

const ProductSectionHeader: React.FC<ProductSectionHeaderProps> = ({ t, onUpdateText }) => {
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
      <EditableText textKey="products_title" onUpdate={onUpdateText}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">{content.products.title}</h2>
      </EditableText>
      <EditableText textKey="products_subtitle" onUpdate={onUpdateText}>
        <p className="text-md sm:text-lg text-[var(--color-text-secondary)] mt-4 max-w-2xl mx-auto">{content.products.subtitle}</p>
      </EditableText>
    </motion.div>
  );
};

export default ProductSectionHeader;