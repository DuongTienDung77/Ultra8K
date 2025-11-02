const GALLERY_KEY = 'ai-image-gallery-v1';

/**
 * Retrieves image URLs from localStorage.
 * @returns {string[]} An array of image data URLs.
 */
export const getImages = (): string[] => {
  try {
    const stored = localStorage.getItem(GALLERY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse gallery from localStorage", error);
    // In case of parsing error, clear the corrupted data
    localStorage.removeItem(GALLERY_KEY);
    return [];
  }
};

/**
 * Adds a new image URL to localStorage if it doesn't already exist.
 * Images are prepended to the array to show the newest first.
 * @param {string} imageUrl The data URL of the image to add.
 * @returns {boolean} True if the image was added, false if it already existed.
 */
export const addImage = (imageUrl: string): boolean => {
  try {
    const images = getImages();
    if (!images.includes(imageUrl)) {
      const newImages = [imageUrl, ...images];
      localStorage.setItem(GALLERY_KEY, JSON.stringify(newImages));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to add image to localStorage", error);
    // This can happen if localStorage is full
    if (error instanceof DOMException && (error.code === 22 || error.code === 1014)) {
        alert("Could not save image to gallery. Your browser's storage is full.");
    }
    return false;
  }
};


/**
 * Removes an image URL from localStorage.
 * @param {string} imageUrl The data URL of the image to remove.
 */
export const removeImage = (imageUrl: string): void => {
  try {
    const images = getImages();
    const newImages = images.filter(img => img !== imageUrl);
    localStorage.setItem(GALLERY_KEY, JSON.stringify(newImages));
  } catch (error) {
    console.error("Failed to remove image from localStorage", error);
  }
};

/**
 * Clears all images from the gallery in localStorage.
 */
export const clearImages = (): void => {
  try {
    localStorage.removeItem(GALLERY_KEY);
  } catch (error) {
     console.error("Failed to clear gallery from localStorage", error);
  }
};
