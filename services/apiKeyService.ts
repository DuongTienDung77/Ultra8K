const API_KEY_STORAGE_KEY = 'gemini-api-key';

/**
 * Saves the API key to localStorage.
 * @param key The API key string.
 */
export const saveApiKey = (key: string): void => {
  try {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
  } catch (error) {
    console.error("Failed to save API key to localStorage", error);
    if (error instanceof DOMException && (error.code === 22 || error.code === 1014)) {
      alert("Không thể lưu khóa API. Bộ nhớ trình duyệt của bạn đã đầy.");
    }
  }
};

/**
 * Retrieves the API key from localStorage.
 * @returns The API key string, or null if not found.
 */
export const getApiKey = (): string | null => {
  try {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to retrieve API key from localStorage", error);
    return null;
  }
};

/**
 * Clears the API key from localStorage.
 */
export const clearApiKey = (): void => {
  try {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear API key from localStorage", error);
  }
};
