import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { LayoutOption, Product } from '../types';
import { PRODUCTS, getTextContent } from '../constants';
import type { TFunction } from '../App';

interface ProductSectionProps {
  layout: LayoutOption;
  t: TFunction;
}

const ProductCardSleek: React.FC<{ product: Product; t: TFunction }> = ({ product, t }) => (
    <div className="text-center">
        <div className="bg-[var(--color-secondary)] rounded-lg overflow-hidden mb-4 transition-shadow duration-300 hover:shadow-xl">
            <img src={product.imageUrl} alt={t(product.nameKey)} className="w-full h-72 sm:h-80 object-cover" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{t(product.nameKey)}</h3>
        <p className="text-md text-[var(--color-text-secondary)]">{t(product.categoryKey)}</p>
    </div>
);

const ProductSection: React.FC<ProductSectionProps> = ({ layout, t }) => {
    const content = getTextContent(t);
    const ref = useRef(null);

    const sectionHeaderVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    const gridVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };
    
    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }
    };

    return (
        <section ref={ref} className="py-16 sm:py-20 md:py-28 overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div className="text-center mb-16 md:mb-20" variants={sectionHeaderVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">{content.products.title}</h2>
                    <p className="text-md sm:text-lg text-[var(--color-text-secondary)] mt-4 max-w-2xl mx-auto">{content.products.subtitle}</p>
                </motion.div>
                <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12" variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    {PRODUCTS.slice(0, 6).map((p) => {
                        return (
                            <motion.div 
                                key={p.id} 
                                variants={itemVariants} 
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <ProductCardSleek product={p} t={t} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default ProductSection;