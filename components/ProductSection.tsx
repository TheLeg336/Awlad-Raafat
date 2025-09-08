import React from 'react';
import { motion, Variants } from 'framer-motion';
import { LayoutOption, Product } from '../types';
import { PRODUCTS } from '../constants';
import type { TFunction } from '../types';
import ProductSectionHeader from './ProductSectionHeader';

interface ProductSectionProps {
  layout: LayoutOption;
  t: TFunction;
}

const ProductCardSleek: React.FC<{ product: Product; t: TFunction; }> = ({ product, t }) => (
    <div className="relative group text-center">
        <div className="bg-[var(--color-secondary)] rounded-lg overflow-hidden mb-4 transition-shadow duration-300 hover:shadow-xl">
            <img src={product.imageUrl} alt={t(product.nameKey)} className="w-full h-72 sm:h-80 object-cover" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{t(product.nameKey)}</h3>
        <p className="text-md text-[var(--color-text-secondary)]">{t(product.categoryKey)}</p>
    </div>
);

const ProductSection: React.FC<ProductSectionProps> = ({ layout, t }) => {
    const gridVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
    };
    
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
    };
    
    const STICKY_HEADER_OFFSET = 'top-[var(--header-height)]';

    return (
        <section id="shop" className="bg-[var(--color-background)]">
            <div className="relative">
                
                <div className={`sticky ${STICKY_HEADER_OFFSET} z-10 bg-[var(--color-background)]/80 backdrop-blur-xl shadow-sm`}>
                    <div className="container mx-auto px-6 pt-12 pb-6 md:pt-20 md:pb-10">
                        <ProductSectionHeader t={t}/>
                    </div>
                </div>

                <div className="container mx-auto px-6">
                    <motion.div 
                        className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pb-16 sm:pb-20 md:pb-28" 
                        variants={gridVariants} 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {PRODUCTS.slice(0, 6).map((p) => {
                            return (
                                <motion.div 
                                    key={p.id} 
                                    variants={itemVariants} 
                                    whileHover={{ scale: 1.03, y: -8 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <ProductCardSleek 
                                      product={p} 
                                      t={t}
                                    />
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;