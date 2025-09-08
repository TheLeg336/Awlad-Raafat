import React from 'react';
import { motion, Variants } from 'framer-motion';
import { LayoutOption } from '../types';
import type { TFunction } from '../types';

interface FooterProps {
    layout: LayoutOption;
    t: TFunction;
}

const Footer: React.FC<FooterProps> = ({ layout, t }) => {
    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
    };

    const titleVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
    };


    return (
        <footer id="contact" className="bg-[var(--color-text-primary)] text-[var(--color-background)] py-16 sm:py-20 md:py-24 transition-colors duration-500">
            <motion.div 
                className="container mx-auto px-6"
                initial="hidden" 
                whileInView="visible" 
                viewport={{once: true, amount: 0.3}} 
                variants={containerVariants}
            >
                <motion.h2 
                    variants={titleVariants}
                    className="text-3xl sm:text-4xl text-center font-bold mb-12"
                >
                    <span>{t('footer_locations_title')}</span>
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
                    <motion.section variants={itemVariants} aria-labelledby="footer-cairo-branch-title">
                        <h3 id="footer-cairo-branch-title" className="text-xl font-bold text-[var(--color-primary)] mb-2">{t('footer_cairo_branch_title')}</h3>
                        <p className="text-sm">{t('footer_cairo_branch_address')}</p>
                    </motion.section>
                    
                    <motion.section variants={itemVariants} aria-labelledby="footer-minya-branch-title">
                        <h3 id="footer-minya-branch-title" className="text-xl font-bold text-[var(--color-primary)] mb-2">{t('footer_minya_branch_title')}</h3>
                        <p className="text-sm">{t('footer_minya_branch_address')}</p>
                    </motion.section>
                    
                    <motion.section variants={itemVariants} aria-labelledby="footer-new-minya-branch-title">
                        <h3 id="footer-new-minya-branch-title" className="text-xl font-bold text-[var(--color-primary)] mb-2">{t('footer_new_minya_branch_title')}</h3>
                        <p className="text-sm">{t('footer_new_minya_branch_address')}</p>
                    </motion.section>

                    <motion.section variants={itemVariants} aria-labelledby="footer-phone-title">
                        <h3 id="footer-phone-title" className="text-xl font-bold text-[var(--color-primary)] mb-2">{t('footer_phone_title')}</h3>
                        <p className="text-sm">{t('footer_phone_label')} <a href={`tel:${t('footer_phone_number')}`} className="hover:underline">{t('footer_phone_number')}</a></p>
                        <p className="text-sm mt-1">{t('footer_hours')}</p>
                    </motion.section>
                </div>

                <motion.div 
                    variants={itemVariants}
                    className="mt-16 pt-8 border-t border-[var(--color-background)]/20 text-center text-sm"
                >
                    <p>{t('footer_copyright')}</p>
                </motion.div>
            </motion.div>
        </footer>
    );
};

export default Footer;
