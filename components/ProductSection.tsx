import React from 'react';
import { motion, Variants } from 'framer-motion';
import { CustomImages, LayoutOption, Product } from '../types';
import { PRODUCTS } from '../constants';
import type { TFunction } from '../App';
import ProductSectionHeader from './ProductSectionHeader';
import EditIcon from './icons/EditIcon';

interface ProductSectionProps {
  layout: LayoutOption;
  t: TFunction;
  isEditMode: boolean;
  customImages: CustomImages;
  onEdit: (key: string) => void;
}

const ProductCardSleek: React.FC<{ product: Product; t: TFunction; isEditMode: boolean; customImage: string | undefined; onEdit: () => void; }> = ({ product, t, isEditMode, customImage, onEdit }) => (
    <div className="relative group text-center">
        <div className="bg-[var(--color-secondary)] rounded-lg overflow-hidden mb-4 transition-shadow duration-300 hover:shadow-xl">
            <img src={customImage || product.imageUrl} alt={t(product.nameKey)} className="w-full h-72 sm:h-80 object-cover" />
        </div>
        {isEditMode && (
            <button
                onClick={onEdit}
                aria-label={`Edit image for ${t(product.nameKey)}`}
                className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-800 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 hover:bg-white shadow-lg"
            >
                <EditIcon />
            </button>
        )}
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{t(product.nameKey)}</h3>
        <p className="text-md text-[var(--color-text-secondary)]">{t(product.categoryKey)}</p>
    </div>
);

const ProductSection: React.FC<ProductSectionProps> = ({ layout, t, isEditMode, customImages, onEdit }) => {
    const gridVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };
    
    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }
    };
    
    // The main header's height is now dynamically set as a CSS variable for a precise sticky offset.
    const STICKY_HEADER_OFFSET = 'top-[var(--header-height)]';

    return (
        <section id="shop" className="bg-[var(--color-background)]">
            {/* This div establishes the containing block for the sticky element. It's now full-width. */}
            <div className="relative">
                
                {/* Sticky Header Wrapper - This div is full-width */}
                <div className={`sticky ${STICKY_HEADER_OFFSET} z-10 bg-[var(--color-background)]/80 backdrop-blur-xl shadow-sm`}>
                    {/* The content inside the header is contained */}
                    <div className="container mx-auto px-6 pt-12 pb-6 md:pt-20 md:pb-10">
                        <ProductSectionHeader t={t} />
                    </div>
                </div>

                {/* Product Grid - This is now in its own container to keep it centered */}
                <div className="container mx-auto px-6">
                    <motion.div 
                        className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pb-16 sm:pb-20 md:pb-28" 
                        variants={gridVariants} 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {PRODUCTS.slice(0, 6).map((p) => {
                            const imageKey = `product-${p.id}`;
                            return (
                                <motion.div 
                                    key={p.id} 
                                    variants={itemVariants} 
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <ProductCardSleek 
                                      product={p} 
                                      t={t}
                                      isEditMode={isEditMode}
                                      customImage={customImages[imageKey]}
                                      onEdit={() => onEdit(imageKey)}
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
