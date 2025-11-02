import React, { useState } from 'react';
import ImageModal from './ImageModal';

const TrashIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

interface GalleryProps {
    images: string[];
    onDeleteImage: (src: string) => void;
    onClearGallery: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, onDeleteImage, onClearGallery }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleClear = () => {
        if (window.confirm(`Are you sure you want to delete all ${images.length} images from your gallery? This action cannot be undone.`)) {
            onClearGallery();
        }
    };
    
    const handleDeleteFromModal = (src: string) => {
        onDeleteImage(src);
        setSelectedImage(null); // Close modal after deletion
    };

    if (images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <h2 className="mt-2 text-xl font-medium">Your Gallery is Empty</h2>
                <p className="mt-1 text-sm">Generated images will appear here for you to review and download.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-100">Image Gallery</h2>
                <button
                    onClick={handleClear}
                    className="flex items-center gap-2 px-4 py-2 bg-red-800 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                    <TrashIcon className="h-4 w-4" />
                    Clear All
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((src, index) => (
                    <div
                        key={`${src.substring(20, 50)}-${index}`}
                        className="relative group aspect-square bg-gray-900 rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                        onClick={() => setSelectedImage(src)}
                    >
                        <img
                            src={src}
                            alt={`Generated image ${index + 1}`}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <ImageModal
                    src={selectedImage}
                    onClose={() => setSelectedImage(null)}
                    onDelete={handleDeleteFromModal}
                />
            )}
        </div>
    );
};

export default Gallery;