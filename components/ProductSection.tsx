import React from 'react';
import { motion, Variants } from 'framer-motion';
import { LayoutOption, Product } from '../types';
import { PRODUCTS, getTextContent } from '../constants';
import type { TFunction } from '../App';

interface ProductSectionProps {
  layout: LayoutOption;
  t: TFunction;
}

const ProductCardMinimalist: React.FC<{ product: Product; t: TFunction }> = ({ product, t }) => (
    <div className="group relative overflow-hidden bg-white shadow-sm">
        <img src={product.imageUrl} alt={t(product.nameKey)} className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-xl font-semibold">{t(product.nameKey)}</h3>
            <p className="text-sm">{t(product.categoryKey)}</p>
        </div>
    </div>
);

const ProductCardClassic: React.FC<{ product: Product; t: TFunction }> = ({ product, t }) => (
    <div className="border border-[var(--color-primary)] border-opacity-20 p-4 bg-white bg-opacity-50 transition-shadow hover:shadow-xl">
        <img src={product.imageUrl} alt={t(product.nameKey)} className="w-full h-80 object-cover mb-4" />
        <h3 className="text-2xl font-heading text-[var(--color-text-primary)]">{t(product.nameKey)}</h3>
        <p className="text-md text-[var(--color-text-secondary)] mb-4">{t(product.categoryKey)}</p>
        <button className="text-sm font-semibold border border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-all duration-300 transform hover:scale-105">{getTextContent(t).products.cta}</button>
    </div>
);

const ProductCardArtistic: React.FC<{ product: Product; t: TFunction; className?: string }> = ({ product, t, className = '' }) => (
    <div className={`relative group overflow-hidden ${className}`}>
        <img src={product.imageUrl} alt={t(product.nameKey)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-2xl font-bold font-heading transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{t(product.nameKey)}</h3>
            <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{t(product.categoryKey)}</p>
        </div>
    </div>
);

const ProductCardArchitectural: React.FC<{ product: Product; t: TFunction }> = ({ product, t }) => (
    <div className="bg-[var(--color-background)] p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <img src={product.imageUrl} alt={t(product.nameKey)} className="w-full h-64 object-cover" />
        <div className="mt-4">
            <h3 className="text-xl font-bold font-heading text-[var(--color-text-primary)]">{t(product.nameKey)}</h3>
            <p className="text-[var(--color-text-secondary)]">{t(product.categoryKey)}</p>
        </div>
    </div>
);

const ProductCardSleek: React.FC<{ product: Product; t: TFunction }> = ({ product, t }) => (
    <div className="text-center">
        <div className="bg-[var(--color-secondary)] rounded-lg overflow-hidden mb-4 transition-shadow hover:shadow-xl">
            <img src={product.imageUrl} alt={t(product.nameKey)} className="w-full h-80 object-cover" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{t(product.nameKey)}</h3>
        <p className="text-md text-[var(--color-text-secondary)]">{t(product.categoryKey)}</p>
    </div>
);

const ProductSection: React.FC<ProductSectionProps> = ({ layout, t }) => {
    const content = getTextContent(t);

    const sectionHeaderVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    const gridVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };
    
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    const renderLayout = () => {
        switch (layout) {
            case LayoutOption.Minimalist:
                return (
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        {PRODUCTS.slice(0, 3).map(p => <motion.div key={p.id} variants={itemVariants}><ProductCardMinimalist product={p} t={t} /></motion.div>)}
                    </motion.div>
                );
            case LayoutOption.Classic:
                return (
                    <div className="space-y-16">
                      {PRODUCTS.slice(0, 2).map((p, index) => (
                          <motion.div 
                              key={p.id} 
                              className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                              initial={{ opacity: 0, x: index % 2 !== 0 ? 50 : -50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                          >
                              <div className="md:w-1/2">
                                  <img src={p.imageUrl} alt={t(p.nameKey)} className="w-full shadow-lg" />
                              </div>
                              <div className="md:w-1/2">
                                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-primary)]">{t(p.nameKey)}</h3>
                                  <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">{t('about_p1')}</p>
                              </div>
                          </motion.div>
                      ))}
                    </div>
                );
            case LayoutOption.Artistic:
                return (
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[minmax(0,_1fr)] h-auto md:h-[70vh]" variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2"><ProductCardArtistic product={PRODUCTS[0]} t={t} className="w-full h-full" /></motion.div>
                        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1"><ProductCardArtistic product={PRODUCTS[1]} t={t} className="w-full h-full" /></motion.div>
                        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1"><ProductCardArtistic product={PRODUCTS[2]} t={t} className="w-full h-full" /></motion.div>
                        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1"><ProductCardArtistic product={PRODUCTS[3]} t={t} className="w-full h-full" /></motion.div>
                    </motion.div>
                );
            case LayoutOption.MonochromaticGallery:
                 return (
                    <motion.div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center" variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        <motion.div variants={itemVariants} className="md:col-span-3 relative group overflow-hidden">
                            <img src={PRODUCTS[0].imageUrl} alt={t(PRODUCTS[0].nameKey)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-text-primary)]/70 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h3 className="text-3xl text-[var(--color-background)] font-semibold font-heading">{t(PRODUCTS[0].nameKey)}</h3>
                            </div>
                        </motion.div>
                        <div className="md:col-span-2 grid grid-cols-1 gap-8">
                             {PRODUCTS.slice(1, 3).map(p => (
                                 <motion.div key={p.id} variants={itemVariants} className="group relative overflow-hidden">
                                    <img src={p.imageUrl} alt={t(p.nameKey)} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"/>
                                    <div className="absolute inset-0 bg-[var(--color-text-primary)]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <h4 className="text-[var(--color-background)] text-xl">{t(p.nameKey)}</h4>
                                    </div>
                                 </motion.div>
                             ))}
                        </div>
                    </motion.div>
                 );
            case LayoutOption.ArchitecturalBold:
                return (
                    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        <motion.div variants={itemVariants} className="md:col-span-1">
                             <ProductCardArchitectural product={PRODUCTS[0]} t={t} />
                        </motion.div>
                        <motion.div variants={itemVariants} className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {PRODUCTS.slice(1, 5).map(p => <ProductCardArchitectural key={p.id} product={p} t={t} />)}
                        </motion.div>
                    </motion.div>
                );
            case LayoutOption.ModernSleek:
                return (
                    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-12" variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        {PRODUCTS.slice(0, 3).map(p => <motion.div key={p.id} variants={itemVariants}><ProductCardSleek product={p} t={t} /></motion.div>)}
                    </motion.div>
                );
            default:
                return null;
        }
    };
    
    return (
        <section className="py-20 md:py-28 overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div className="text-center mb-12" variants={sectionHeaderVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">{content.products.title}</h2>
                    <p className="text-lg text-[var(--color-text-secondary)] mt-4 max-w-2xl mx-auto">{content.products.subtitle}</p>
                </motion.div>
                {renderLayout()}
            </div>
        </section>
    );
};

export default ProductSection;