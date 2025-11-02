import React, { useEffect } from 'react';

// --- ICONS (re-defined for standalone use if needed) ---
const CloseIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const DownloadIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);
const TrashIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


interface ImageModalProps {
    src: string;
    onClose: () => void;
    onDelete: (src: string) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, onClose, onDelete }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const downloadImage = () => {
        if (!src) return;
        const link = document.createElement('a');
        link.href = src;
        const extension = src.startsWith('data:image/jpeg') ? 'jpg' : src.startsWith('data:image/webp') ? 'webp' : 'png';
        link.download = `studio-ai-gallery-${Date.now()}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this image from the gallery?')) {
            onDelete(src);
        }
    };
    
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="relative max-w-4xl max-h-[90vh] w-full p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <img src={src} alt="Enlarged view" className="w-full h-full object-contain" />
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-3">
                 <button
                    onClick={downloadImage}
                    className="flex items-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    aria-label="Download image"
                >
                    <DownloadIcon /> Download
                </button>
                 <button
                    onClick={handleDelete}
                    className="p-3 bg-gray-800/80 text-white rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg transform hover:scale-110 active:scale-95"
                    aria-label="Delete image"
                >
                    <TrashIcon />
                </button>
                <button
                    onClick={onClose}
                    className="p-3 bg-gray-800/80 text-white rounded-full hover:bg-gray-700 transition-all duration-200 shadow-lg transform hover:scale-110 active:scale-95"
                    aria-label="Close image viewer"
                >
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
};

export default ImageModal;