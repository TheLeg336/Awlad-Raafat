import React, { useState, useEffect } from 'react';
import { LayoutOption, ColorSchemeOption, TypographyOption } from '../types';
import { LAYOUT_OPTIONS, COLOR_SCHEME_OPTIONS, TYPOGRAPHY_OPTIONS } from '../constants';
import SettingsIcon from './icons/SettingsIcon';

interface CustomizerProps {
  layout: LayoutOption;
  setLayout: (layout: LayoutOption) => void;
  colorScheme: ColorSchemeOption;
  onColorSchemeChange: (scheme: ColorSchemeOption) => void;
  typography: TypographyOption;
  setTypography: (typography: TypographyOption) => void;
}

const Customizer: React.FC<CustomizerProps> = ({ layout, setLayout, colorScheme, onColorSchemeChange, typography, setTypography }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 right-0 z-50 p-3 bg-[var(--color-primary)] text-[var(--color-background)] rounded-l-lg shadow-lg transform transition-transform hover:bg-[var(--color-secondary)]"
        aria-label="Toggle Customizer"
      >
        <SettingsIcon className="w-6 h-6" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ease-in-out"
          aria-hidden="true"
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full bg-[var(--color-background)] shadow-2xl z-40 transition-transform duration-300 ease-in-out border-l border-[var(--color-text-secondary)]/20 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full sm:w-80 p-6 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Customize Website</h2>
          <button onClick={() => setIsOpen(false)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-3xl leading-none">&times;</button>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">Layout Options</h3>
          <div className="space-y-2">
            {LAYOUT_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setLayout(option.id)}
                className={`w-full text-left p-3 rounded-md transition-colors ${
                  layout === option.id
                    ? 'bg-[var(--color-primary)] text-[var(--color-background)] shadow'
                    : 'bg-[var(--color-secondary)]/10 text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)]/20'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">Typography</h3>
          <div className="space-y-2">
            {TYPOGRAPHY_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setTypography(option.id)}
                className={`w-full text-left p-3 rounded-md transition-colors ${
                  typography === option.id
                    ? 'bg-[var(--color-primary)] text-[var(--color-background)] shadow'
                    : 'bg-[var(--color-secondary)]/10 text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)]/20'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">Color Schemes</h3>
          <div className="space-y-2">
            {COLOR_SCHEME_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => onColorSchemeChange(option.id)}
                className={`w-full text-left p-3 rounded-md transition-colors ${
                  colorScheme === option.id
                    ? 'bg-[var(--color-primary)] text-[var(--color-background)] shadow'
                    : 'bg-[var(--color-secondary)]/10 text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)]/20'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Customizer;