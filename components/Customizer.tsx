import React, { useState } from 'react';
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

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 right-0 z-50 p-3 bg-[var(--color-primary)] text-[var(--color-background)] rounded-l-lg shadow-lg transform transition-transform hover:bg-[var(--color-secondary)]"
        aria-label="Toggle Customizer"
      >
        <SettingsIcon className="w-6 h-6" />
      </button>
      <div
        className={`fixed top-0 right-0 h-full bg-gray-100 dark:bg-gray-800 shadow-2xl z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full sm:w-80 p-6 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Customize Website</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">&times;</button>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Layout Options</h3>
          <div className="space-y-2">
            {LAYOUT_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setLayout(option.id)}
                className={`w-full text-left p-3 rounded-md transition-colors ${
                  layout === option.id
                    ? 'bg-blue-500 text-white shadow'
                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Typography</h3>
          <div className="space-y-2">
            {TYPOGRAPHY_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setTypography(option.id)}
                className={`w-full text-left p-3 rounded-md transition-colors ${
                  typography === option.id
                    ? 'bg-blue-500 text-white shadow'
                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Color Schemes</h3>
          <div className="space-y-2">
            {COLOR_SCHEME_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => onColorSchemeChange(option.id)}
                className={`w-full text-left p-3 rounded-md transition-colors ${
                  colorScheme === option.id
                    ? 'bg-blue-500 text-white shadow'
                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
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