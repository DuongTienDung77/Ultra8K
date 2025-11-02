import React, { useState } from 'react';

const CloseIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface ApiKeyModalProps {
  onApiKeySelectedFromAIStudio: () => void;
  onApiKeySaved: (key: string) => void;
  isAIStudioAvailable: boolean;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onApiKeySelectedFromAIStudio, onApiKeySaved, isAIStudioAvailable }) => {
  const [manualApiKey, setManualApiKey] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSaveManualKey = async () => {
    if (manualApiKey.trim()) {
      setIsSaving(true);
      await onApiKeySaved(manualApiKey.trim());
      setIsSaving(false);
    }
  };

  const handleAIStudioSelect = async () => {
    if (isAIStudioAvailable && window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success immediately to mitigate race condition as per guidelines
      onApiKeySelectedFromAIStudio(); 
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-key-modal-title"
      aria-describedby="api-key-modal-description"
    >
      <div className="bg-gray-100 rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-md mx-auto relative text-gray-800">
        <h2 id="api-key-modal-title" className="text-2xl font-bold text-center mb-4">
          Yêu cầu khóa API
        </h2>
        <p id="api-key-modal-description" className="text-center text-gray-700 mb-6">
          Vui lòng cung cấp Khóa API Gemini của bạn để sử dụng ứng dụng.
        </p>

        {isAIStudioAvailable && (
          <>
            <button
              onClick={handleAIStudioSelect}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99]"
            >
              Chọn Khóa từ AI Studio
            </button>
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500">hoặc</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </>
        )}

        <div className="mb-6">
          <label htmlFor="manual-api-key" className="sr-only">Dán Khóa API của bạn vào đây</label>
          <input
            id="manual-api-key"
            type="text"
            value={manualApiKey}
            onChange={(e) => setManualApiKey(e.target.value)}
            placeholder="Dán Khóa API của bạn vào đây"
            className="w-full bg-gray-200 border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>

        <button
          onClick={handleSaveManualKey}
          disabled={!manualApiKey.trim() || isSaving}
          className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99] disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang lưu...
            </>
          ) : (
            'Lưu và Sử dụng Khóa'
          )}
        </button>

        <p className="text-center text-xs text-gray-500 mt-6">
          Khóa của bạn được lưu trữ an toàn trong trình duyệt của bạn và không bao giờ được gửi đi nơi khác.
        </p>
        <p className="text-center text-xs mt-2">
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Nhận Khóa API của bạn tại đây
          </a>
        </p>
      </div>
    </div>
  );
};

export default ApiKeyModal;