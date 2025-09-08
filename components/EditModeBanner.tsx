import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';

const EditModeBanner: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 text-black shadow-lg"
      style={{paddingTop: 'env(safe-area-inset-top)'}}
    >
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border-2 border-black/50" />
          <div>
            <p className="font-bold text-sm leading-tight">Edit Mode Active</p>
            <p className="text-xs leading-tight">Logged in as {user.name}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="bg-black text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          Exit
        </button>
      </div>
    </motion.div>
  );
};

export default EditModeBanner;
