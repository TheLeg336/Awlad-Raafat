
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { LayoutOption } from '../types';
import type { TFunction } from '../App';

interface FooterProps {
    layout: LayoutOption;
    t: TFunction;
}

const SocialIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-secondary)] text-[var(--color-background)] flex items-center justify-center transition-transform hover:scale-110">
        {children}
    </a>
);

const Footer: React.FC<FooterProps> = ({ layout, t }) => {
    const footerClasses = {
        [LayoutOption.Minimalist]: 'bg-gray-100 text-[var(--color-text-secondary)]',
        [LayoutOption.Classic]: 'bg-[var(--color-text-primary)] text-gray-300',
        [LayoutOption.Artistic]: 'bg-[#111] text-gray-400',
        [LayoutOption.MonochromaticGallery]: 'bg-[var(--color-background)] text-[var(--color-text-secondary)] border-t border-gray-200',
        [LayoutOption.ArchitecturalBold]: 'bg-[var(--color-text-primary)] text-gray-400',
        [LayoutOption.ModernSleek]: 'bg-black text-gray-400 border-t border-gray-800',
    };

    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    if (layout === LayoutOption.MonochromaticGallery) {
        return (
            <footer className={`${footerClasses[layout]} py-8 transition-colors duration-500`}>
                <motion.div className="container mx-auto px-6 text-center" initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} transition={{duration: 0.8}}>
                    <p className="text-sm">{t('footer_copyright')}</p>
                </motion.div>
            </footer>
        )
    }

    if (layout === LayoutOption.ModernSleek) {
        return (
            <footer className={`${footerClasses[layout]} py-12 transition-colors duration-500`}>
                <motion.div 
                    className="container mx-auto px-6 text-sm"
                    initial={{opacity: 0}} 
                    whileInView={{opacity: 1}} 
                    viewport={{once: true}} 
                    transition={{duration: 0.8}}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p>{t('footer_copyright')}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
                            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">{t('footer_privacy')}</a>
                            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">{t('footer_terms')}</a>
                            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">{t('nav_contact')}</a>
                        </div>
                    </div>
                </motion.div>
            </footer>
        )
    }

    return (
        <footer className={`${footerClasses[layout]} pt-16 pb-8 transition-colors duration-500`}>
            <div className="container mx-auto px-6">
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    {/* About/Logo */}
                    <motion.div className="lg:col-span-1" variants={itemVariants}>
                        <h3 className={`text-2xl font-bold mb-4 ${layout === LayoutOption.Classic || layout === LayoutOption.ArchitecturalBold ? 'text-white' : 'text-[var(--color-text-primary)]'}`}>{t('logo')}</h3>
                        <p className="text-sm leading-relaxed">{t('about_p1').substring(0, 150)}...</p>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-base sm:text-lg font-semibold mb-4">{t('footer_contact_header')}</h4>
                        <ul className="space-y-2 text-sm">
                            <li><strong>{t('footer_egypt_office')}:</strong> +20 123 456 7890</li>
                            <li><strong>{t('footer_us_office')}:</strong> +1 123 456 7890</li>
                            <li>info@awladraafat.com</li>
                        </ul>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-base sm:text-lg font-semibold mb-4">{t('footer_quick_links')}</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#about" className="hover:text-[var(--color-primary)]">{t('nav_about')}</a></li>
                            <li><a href="#contact" className="hover:text-[var(--color-primary)]">{t('nav_contact')}</a></li>
                        </ul>
                    </motion.div>
                    
                    {/* Social Media */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-base sm:text-lg font-semibold mb-4">{t('footer_social_header')}</h4>
                        <div className="flex space-x-4">
                           <SocialIcon>
                               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                           </SocialIcon>
                           <SocialIcon>
                               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                           </SocialIcon>
                           <SocialIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                           </SocialIcon>
                        </div>
                    </motion.div>
                </motion.div>
                <div className="border-t border-gray-500 border-opacity-30 pt-6 text-center text-sm">
                    <p>{t('footer_copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;