import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
  onReset: () => void;
  currentImage: string | undefined;
  defaultImage: string | undefined;
}

const ImageEditModal: React.FC<ImageEditModalProps> = ({ isOpen, onClose, onSave, onReset, currentImage, defaultImage }) => {
  const [preview, setPreview] = useState<string | undefined>(currentImage);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(currentImage);
  }, [currentImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("File is too large. Please select an image under 5MB.");
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
        setError("Invalid file type. Please select a JPG, PNG, WEBP, or GIF.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (preview) {
      onSave(preview);
    }
  };
  
  const handleReset = () => {
    onReset();
  };

  const hasChanges = preview !== currentImage;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10 bg-[var(--color-background)] rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-white/10"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Edit Image</h2>
              <div className="aspect-video bg-[var(--color-secondary)] rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <p className="text-[var(--color-text-secondary)]">No image selected</p>
                )}
              </div>
              
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp, image/gif"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full text-center py-2.5 px-4 rounded-lg bg-[var(--color-secondary)] text-[var(--color-text-primary)] font-semibold hover:bg-opacity-80 transition-colors"
              >
                Choose New Image...
              </button>

            </div>
            <div className="bg-[var(--color-secondary)]/30 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3">
               <button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="w-full sm:w-auto py-2 px-6 rounded-lg bg-[var(--color-primary)] text-white font-semibold transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-opacity-80"
                >
                  Save
                </button>
                <button
                  onClick={handleReset}
                  disabled={currentImage === defaultImage}
                  className="w-full sm:w-auto py-2 px-6 rounded-lg bg-[var(--color-text-secondary)] text-[var(--color-text-primary)] font-semibold transition-all duration-300 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-70"
                >
                  Reset to Default
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto sm:mr-auto py-2 px-6 rounded-lg text-[var(--color-text-secondary)] font-semibold hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ImageEditModal;
