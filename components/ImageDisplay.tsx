import React from 'react';
import Spinner from './Spinner';
import { POST_PROCESS_PRESETS } from '../constants';

// --- ICONS ---

const UndoIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 6 6v3" />
    </svg>
);

const MagicWandIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09ZM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035-.259a3.375 3.375 0 00-2.456-2.456ZM18.259 15.715L18 14.75l-.259 1.035a3.375 3.375 0 00-2.455 2.456L14.25 18l1.036.259a3.375 3.375 0 002.455 2.456L18 21.75l.259-1.035a3.375 3.375 0 002.456-2.456L21.75 18l-1.035-.259a3.375 3.375 0 00-2.456-2.456Z" />
    </svg>
);

const PersonIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const ThumbUpIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333V17a1 1 0 001 1h6.758a1 1 0 00.97-1.226l-1.581-6.324a1 1 0 00-.97-1.226H12V6a1 1 0 00-1-1h-1a1 1 0 00-1 1v1.333H6z" />
    </svg>
);
  
const ThumbDownIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667V3a1 1 0 00-1-1h-6.758a1 1 0 00-.97 1.226l1.581 6.324a1 1 0 00.97 1.226H12V14a1 1 0 001 1h1a1 1 0 001-1v-1.333h.008z" />
    </svg>
);

// --- UI COMPONENTS ---

const IconButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode; 'aria-label': string; tooltip?: string }> = ({ onClick, disabled, children, 'aria-label': ariaLabel, tooltip }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className="relative group p-3 bg-gray-700/80 border border-gray-600/50 rounded-lg text-gray-300 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-all duration-200 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
    >
        {children}
        {tooltip && (
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-900 text-white text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
              {tooltip}
              <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></span>
          </span>
        )}
    </button>
);

const PrimaryButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode; icon?: React.ReactNode; }> = ({ onClick, disabled, children, icon }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="flex items-center justify-center px-4 py-2.5 bg-blue-600 border border-transparent rounded-lg font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-all duration-200 disabled:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
    >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
    </button>
);


const PostProcessSelector: React.FC<{ onApply: (prompt: string) => void; disabled: boolean }> = ({ onApply, disabled }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPreset = POST_PROCESS_PRESETS.find(p => p.id === event.target.value);
    if (selectedPreset) {
      onApply(selectedPreset.prompt);
    }
     // Reset dropdown after applying for better UX
    event.target.value = '';
  };

  return (
    <div className="mt-4 flex justify-center">
      <div className="relative w-full max-w-xs">
        <select
          onChange={handleChange}
          disabled={disabled}
          defaultValue=""
          aria-label="Apply post-processing preset"
          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2.5 px-4 text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-center shadow-inner"
        >
          <option value="" disabled>-- Áp dụng Preset --</option>
          {POST_PROCESS_PRESETS.map(preset => (
            <option key={preset.id} value={preset.id}>{preset.name}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
};


const ImageCard: React.FC<{ src: string, isLoading: boolean, loadingText: string }> = ({ src, isLoading, loadingText }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-gray-900/50 aspect-[9/16]">
      <img src={src} alt="Generated" className="w-full h-full object-contain" />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
            <Spinner />
            <p className="mt-2 text-white font-semibold">{loadingText}</p>
        </div>
      )}
    </div>
  );
};


// --- MAIN COMPONENT ---

interface ImageDisplayProps {
  isLoading: boolean;
  loadingAction: string | null;
  sourceImages: string[];
  portraitImages: string[];
  error: string | null;
  onRetry: () => void;
  onBeautify: () => void;
  onPortrait: () => void;
  onApplyPresetToSource: (prompt: string) => void;
  onApplyPresetToPortrait: (prompt: string) => void;
  onDeletePortrait: () => void;
  sourceImageRating: 'up' | 'down' | null;
  onRateSourceImage: (rating: 'up' | 'down') => void;
  portraitImageRating: 'up' | 'down' | null;
  onRatePortraitImage: (rating: 'up' | 'down') => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ 
    isLoading, loadingAction, sourceImages, portraitImages, error, 
    onRetry, onBeautify, onPortrait, onApplyPresetToSource, 
    onApplyPresetToPortrait, onDeletePortrait,
    sourceImageRating, onRateSourceImage,
    portraitImageRating, onRatePortraitImage
}) => {

  const downloadImage = (src: string) => {
    if (!src) return;
    const link = document.createElement('a');
    link.href = src;
    const extension = src.startsWith('data:image/jpeg') ? 'jpg' : src.startsWith('data:image/webp') ? 'webp' : 'png';
    link.download = `studio-ai-image-${Date.now()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading && loadingAction === 'generate') {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Spinner />
        <p className="mt-4 text-lg text-gray-400">Đang tạo hình ảnh, vui lòng chờ...</p>
        <p className="text-sm text-gray-500">Quá trình này có thể mất một chút thời gian.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center max-w-md">
          <strong className="font-bold">Lỗi!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      </div>
    );
  }

  if (sourceImages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
           <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h2 className="mt-2 text-xl font-medium">Kết quả sẽ hiện ở đây</h2>
          <p className="mt-1 text-sm">Nhập mô tả, chọn preset và nhấn "Tạo ảnh" để bắt đầu.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto space-y-8">
        {/* --- SOURCE IMAGE PANEL --- */}
        <div className="bg-gray-900 p-4 rounded-xl shadow-2xl">
            <ImageCard 
                src={sourceImages[0]} 
                isLoading={isLoading && ['beautify', 'portrait', 'preset-source'].includes(loadingAction || '')}
                loadingText='Đang xử lý...'
            />
            <p className="text-center text-sm text-gray-500 mt-3 mb-4">Thương mại</p>
            <div className="grid grid-cols-4 gap-2">
                <IconButton onClick={onRetry} disabled={isLoading} aria-label="Hoàn tác" tooltip="Hoàn tác"><UndoIcon /></IconButton>
                <IconButton onClick={onBeautify} disabled={isLoading} aria-label="Làm đẹp" tooltip="Làm đẹp"><MagicWandIcon /></IconButton>
                <PrimaryButton onClick={onPortrait} disabled={isLoading} icon={<PersonIcon />}>Chân dung</PrimaryButton>
                <IconButton onClick={() => downloadImage(sourceImages[0])} disabled={isLoading} aria-label="Tải xuống" tooltip="Tải xuống"><DownloadIcon /></IconButton>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-center items-center gap-4">
              <span className="text-sm text-gray-400 mr-2">Đánh giá:</span>
              <button
                  onClick={() => onRateSourceImage('up')}
                  disabled={isLoading}
                  aria-label="Good image"
                  className={`p-3 rounded-full border transition-all duration-200 disabled:opacity-50 transform hover:scale-110 active:scale-95 ${
                      sourceImageRating === 'up'
                          ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                  <ThumbUpIcon />
              </button>
              <button
                  onClick={() => onRateSourceImage('down')}
                  disabled={isLoading}
                  aria-label="Bad image"
                  className={`p-3 rounded-full border transition-all duration-200 disabled:opacity-50 transform hover:scale-110 active:scale-95 ${
                      sourceImageRating === 'down'
                          ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-500/30'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                  <ThumbDownIcon />
              </button>
            </div>
            <PostProcessSelector onApply={onApplyPresetToSource} disabled={isLoading} />
        </div>
        
        {/* --- GENERATED PORTRAIT PANEL --- */}
        {portraitImages.length > 0 && (
            <div>
                <h2 className="text-xl font-bold text-gray-200 mb-4">Chân dung đã tạo</h2>
                <div className="bg-gray-900 p-4 rounded-xl shadow-2xl">
                     <ImageCard 
                        src={portraitImages[0]} 
                        isLoading={isLoading && loadingAction === 'preset-portrait'}
                        loadingText='Đang áp dụng...'
                    />
                    <p className="text-center text-sm text-gray-500 mt-3 mb-4">Chân dung từ Thương mại</p>
                    <div className="grid grid-cols-2 gap-2">
                         <IconButton onClick={onDeletePortrait} disabled={isLoading} aria-label="Xóa chân dung" tooltip="Xóa chân dung"><TrashIcon /></IconButton>
                         <PrimaryButton onClick={() => downloadImage(portraitImages[0])} disabled={isLoading} icon={<DownloadIcon />}>Tải xuống</PrimaryButton>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-center items-center gap-4">
                        <span className="text-sm text-gray-400 mr-2">Đánh giá:</span>
                        <button
                            onClick={() => onRatePortraitImage('up')}
                            disabled={isLoading}
                            aria-label="Good portrait"
                            className={`p-3 rounded-full border transition-all duration-200 disabled:opacity-50 transform hover:scale-110 active:scale-95 ${
                                portraitImageRating === 'up'
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            <ThumbUpIcon />
                        </button>
                        <button
                            onClick={() => onRatePortraitImage('down')}
                            disabled={isLoading}
                            aria-label="Bad portrait"
                            className={`p-3 rounded-full border transition-all duration-200 disabled:opacity-50 transform hover:scale-110 active:scale-95 ${
                                portraitImageRating === 'down'
                                    ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-500/30'
                                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            <ThumbDownIcon />
                        </button>
                    </div>
                    <PostProcessSelector onApply={onApplyPresetToPortrait} disabled={isLoading} />
                </div>
            </div>
        )}
    </div>
  );
};
export default ImageDisplay;