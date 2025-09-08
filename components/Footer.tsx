import React from 'react';
import { motion, Variants } from 'framer-motion';
import { LayoutOption } from '../types';
import type { TFunction } from '../App';
import EditableText from './EditableText';

interface FooterProps {
    layout: LayoutOption;
    t: TFunction;
    onUpdateText: (key: string, value: string) => void;
}

const Footer: React.FC<FooterProps> = ({ layout, t, onUpdateText }) => {
    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const titleVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
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
                    <EditableText textKey="footer_locations_title" onUpdate={onUpdateText}>
                        <span>{t('footer_locations_title')}</span>
                    </EditableText>
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">
                            <EditableText textKey="footer_cairo_branch_title" onUpdate={onUpdateText}>
                                <span>{t('footer_cairo_branch_title')}</span>
                            </EditableText>
                        </h3>
                        <EditableText textKey="footer_cairo_branch_address" onUpdate={onUpdateText}>
                             <p className="opacity-80 leading-relaxed">{t('footer_cairo_branch_address')}</p>
                        </EditableText>
                        <p className="opacity-70 text-sm mt-2">{t('footer_hours')}</p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">
                           <EditableText textKey="footer_minya_branch_title" onUpdate={onUpdateText}>
                                <span>{t('footer_minya_branch_title')}</span>
                           </EditableText>
                        </h3>
                        <EditableText textKey="footer_minya_branch_address" onUpdate={onUpdateText}>
                            <p className="opacity-80 leading-relaxed">{t('footer_minya_branch_address')}</p>
                        </EditableText>
                        <p className="opacity-70 text-sm mt-2">{t('footer_hours')}</p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">
                            <EditableText textKey="footer_new_minya_branch_title" onUpdate={onUpdateText}>
                                <span>{t('footer_new_minya_branch_title')}</span>
                            </EditableText>
                        </h3>
                        <EditableText textKey="footer_new_minya_branch_address" onUpdate={onUpdateText}>
                            <p className="opacity-80 leading-relaxed">{t('footer_new_minya_branch_address')}</p>
                        </EditableText>
                        <p className="opacity-70 text-sm mt-2">{t('footer_hours')}</p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">
                            <EditableText textKey="footer_phone_title" onUpdate={onUpdateText}>
                                <span>{t('footer_phone_title')}</span>
                            </EditableText>
                        </h3>
                        <p className="opacity-80 leading-relaxed">
                          {t('footer_phone_label')}{' '}
                          <span className="inline-block" dir="ltr">{t('footer_phone_number')}</span>
                        </p>
                    </motion.div>
                </div>

                <motion.div 
                    variants={itemVariants} 
                    className="text-center text-sm text-[var(--color-text-secondary)] mt-16 pt-8 border-t border-[var(--color-secondary)]/30"
                >
                     <EditableText textKey="footer_copyright" onUpdate={onUpdateText}>
                        <p>{t('footer_copyright')}</p>
                     </EditableText>
                </motion.div>
            </motion.div>
        </footer>
    )
};

export default Footer;