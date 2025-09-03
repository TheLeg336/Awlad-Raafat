import React from 'react';
import { motion, Variants } from 'framer-motion';
import { LayoutOption } from '../types';
import { getTextContent } from '../constants';
import type { TFunction } from '../App';

interface AboutSectionProps {
  layout: LayoutOption;
  t: TFunction;
}

const AboutSection: React.FC<AboutSectionProps> = ({ layout, t }) => {
  const content = getTextContent(t);

  const containerClasses = {
    [LayoutOption.Minimalist]: 'bg-[var(--color-background)]',
    [LayoutOption.Classic]: 'bg-white',
    [LayoutOption.Artistic]: 'bg-[var(--color-secondary)] text-[var(--color-background)]',
    [LayoutOption.MonochromaticGallery]: 'bg-white',
    [LayoutOption.ArchitecturalBold]: 'bg-[var(--color-background)]',
    [LayoutOption.ModernSleek]: 'bg-[var(--color-text-primary)] text-[var(--color-background)]',
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };
  
  const staggeredContainer: Variants = {
      hidden: {},
      visible: { transition: { staggerChildren: 0.2 } }
  }

  const renderLayout = () => {
    switch (layout) {
      case LayoutOption.Minimalist:
      case LayoutOption.Classic:
        return (
          <motion.div className="flex flex-col md:flex-row items-center gap-12" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
            <div className="md:w-1/2">
              <h2 className={`text-4xl font-bold mb-6 ${layout === LayoutOption.Classic ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)]'}`}>{content.about.title}</h2>
              <div className={`space-y-4 text-lg leading-relaxed ${layout === LayoutOption.Classic ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-secondary)]'}`}>
                <p>{content.about.p1}</p>
                <p>{content.about.p2}</p>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src="https://picsum.photos/seed/craft/800/600" alt="Craftsmanship" className="w-full shadow-xl" />
            </div>
          </motion.div>
        );
      case LayoutOption.Artistic:
        return (
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggeredContainer}>
            <motion.h2 variants={sectionVariants} className="text-4xl md:text-5xl font-bold mb-6">{content.about.title}</motion.h2>
            <motion.p variants={sectionVariants} className="max-w-3xl mx-auto text-lg leading-relaxed opacity-80">{content.about.p1}</motion.p>
            <motion.div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggeredContainer}>
              <motion.div variants={sectionVariants} className="border border-[var(--color-background)]/20 p-6">
                <h3 className="text-3xl font-bold text-[var(--color-primary)]">50+</h3>
                <p>Years of Heritage</p>
              </motion.div>
              <motion.div variants={sectionVariants} className="border border-[var(--color-background)]/20 p-6">
                <h3 className="text-3xl font-bold text-[var(--color-primary)]">100%</h3>
                <p>Egyptian Cotton & Wood</p>
              </motion.div>
              <motion.div variants={sectionVariants} className="border border-[var(--color-background)]/20 p-6">
                <h3 className="text-3xl font-bold text-[var(--color-primary)]">2</h3>
                <p>Continents Served</p>
              </motion.div>
            </motion.div>
          </motion.div>
        );
        case LayoutOption.MonochromaticGallery:
            return (
                <motion.div className="flex flex-col md:flex-row min-h-[60vh]" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
                    <div className="md:w-1/2 bg-cover bg-center min-h-[400px]" style={{ backgroundImage: 'url(https://picsum.photos/seed/craft/800/1200)' }}>
                    </div>
                    <div className="md:w-1/2 flex items-center p-8 md:p-16">
                        <div>
                            <h2 className="text-4xl font-light mb-6 text-[var(--color-text-primary)]">{content.about.title}</h2>
                            <div className="space-y-4 text-md leading-relaxed text-[var(--color-text-secondary)]">
                                <p>{content.about.p1}</p>
                                <p>{content.about.p2}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            );
        case LayoutOption.ArchitecturalBold:
            return (
                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggeredContainer}>
                    <motion.div variants={sectionVariants}>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[var(--color-text-primary)] tracking-tighter">{content.about.title}</h2>
                         <div className="space-y-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
                            <p>{content.about.p1}</p>
                            <p>{content.about.p2}</p>
                        </div>
                    </motion.div>
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={staggeredContainer}>
                        <motion.img variants={sectionVariants} src="https://picsum.photos/seed/craft1/400/400" alt="Detail 1" className="w-full object-cover shadow-lg"/>
                        <motion.img variants={sectionVariants} src="https://picsum.photos/seed/craft2/400/400" alt="Detail 2" className="w-full object-cover mt-0 sm:mt-8 shadow-lg"/>
                    </motion.div>
                </motion.div>
            );
      case LayoutOption.ModernSleek:
          return (
            <motion.div className="text-center max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">{content.about.title}</h2>
              <div className="space-y-6 text-lg md:text-xl leading-relaxed opacity-80">
                <p>{content.about.p1}</p>
                <p>{content.about.p2}</p>
              </div>
            </motion.div>
          );
      default:
        return null;
    }
  };

  return (
    <section className={`${containerClasses[layout]} transition-colors duration-500 overflow-hidden ${layout === LayoutOption.MonochromaticGallery ? '' : 'py-20 md:py-28'} ${layout === LayoutOption.ModernSleek ? '!py-20 md:!py-32' : ''}`}>
      <div className={`${layout === LayoutOption.MonochromaticGallery ? 'max-w-full' : 'container'} mx-auto ${layout === LayoutOption.MonochromaticGallery ? '' : 'px-6'}`}>
        {renderLayout()}
      </div>
    </section>
  );
};

export default AboutSection;