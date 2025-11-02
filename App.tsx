
import React, { useState, useEffect, useCallback } from 'react';
import ImageGenerator from './components/ImageGenerator';
import ApiKeyModal from './components/ApiKeyModal';
import { getApiKey, saveApiKey, clearApiKey } from './services/apiKeyService';

// Define the AIStudio interface explicitly to avoid type conflicts if declared elsewhere
// or implicitly expected by the TypeScript compiler.
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

declare global {
  interface Window {
    aistudio?: AIStudio;
  }
}

const App: React.FC = () => {
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isCheckingApiKey, setIsCheckingApiKey] = useState<boolean>(true);
  const isAIStudioAvailable = typeof window !== 'undefined' && typeof window.aistudio !== 'undefined';

  const checkAndSetApiKey = useCallback(async () => {
    setIsCheckingApiKey(true);
    let keyIsPresent = false;

    if (isAIStudioAvailable) {
      try {
        keyIsPresent = await window.aistudio!.hasSelectedApiKey();
      } catch (error) {
        console.error("Error checking AI Studio API key:", error);
        // Fallback to local storage or prompt if AI Studio check fails
        keyIsPresent = !!getApiKey();
      }
    } else {
      keyIsPresent = !!getApiKey();
    }
    setHasApiKey(keyIsPresent);
    setIsCheckingApiKey(false);
  }, [isAIStudioAvailable]);

  useEffect(() => {
    checkAndSetApiKey();
  }, [checkAndSetApiKey]);

  const handleApiKeySaved = useCallback(async (key: string) => {
    saveApiKey(key);
    // When a key is manually saved, we assume it's valid for now
    setHasApiKey(true);
  }, []);

  const handleAIStudioKeySelected = useCallback(() => {
    // When AI Studio key is selected, we assume success immediately
    setHasApiKey(true);
  }, []);

  const handleApiKeyInvalid = useCallback(() => {
    // This callback is called from geminiService if key is rejected
    clearApiKey(); // Clear any potentially stale local key
    setHasApiKey(false); // Force modal to reappear
  }, []);

  if (isCheckingApiKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
        <p>Đang kiểm tra khóa API...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-gray-900 text-gray-200">
      {hasApiKey ? (
        <ImageGenerator onApiKeyInvalid={handleApiKeyInvalid} />
      ) : (
        <ApiKeyModal 
          onApiKeySelectedFromAIStudio={handleAIStudioKeySelected} 
          onApiKeySaved={handleApiKeySaved}
          isAIStudioAvailable={isAIStudioAvailable}
        />
      )}
    </div>
  );
};

export default App;