import React from 'react';
import { motion, Variants } from 'framer-motion';
import { LayoutOption } from '../types';
import type { TFunction } from '../App';

interface FooterProps {
    layout: LayoutOption;
    t: TFunction;
}

const Footer: React.FC<FooterProps> = ({ layout, t }) => {
    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <footer className="bg-[var(--color-text-primary)] text-[var(--color-text-secondary)] border-t border-[var(--color-secondary)]/30 py-12 transition-colors duration-500">
            <motion.div 
                className="container mx-auto px-6 text-sm"
                initial="hidden" 
                whileInView="visible" 
                viewport={{once: true}} 
                variants={containerVariants}
            >
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <motion.p variants={itemVariants}>{t('footer_copyright')}</motion.p>
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
                        <a href="#" className="hover:text-[var(--color-primary)] transition-colors">{t('footer_privacy')}</a>
                        <a href="#" className="hover:text-[var(--color-primary)] transition-colors">{t('footer_terms')}</a>
                        <a href="#" className="hover:text-[var(--color-primary)] transition-colors">{t('nav_contact')}</a>
                    </motion.div>
                </div>
            </motion.div>
        </footer>
    )
};

export default Footer;