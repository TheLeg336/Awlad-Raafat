import React from 'react';

const EditModeBanner: React.FC = () => {
    const handleExit = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete('edit');
        window.location.href = url.toString();
    };

    return (
        <div className="fixed top-0 left-0 right-0 bg-[var(--color-primary)] text-white text-center py-2 text-sm z-[100] shadow-lg">
            <span>You are in Edit Mode.</span>
            <button 
                onClick={handleExit}
                className="ml-4 font-semibold underline hover:text-gray-200 transition-colors"
            >
                Exit Edit Mode
            </button>
        </div>
    );
};

export default EditModeBanner;
