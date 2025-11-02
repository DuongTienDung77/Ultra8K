import React, { useRef } from 'react';
import { AspectRatio, OutputFormat, Preset, ResolutionTier } from '../types';
import { 
  ASPECT_RATIOS, 
  SHOT_TYPES,
  TEXT_TO_IMAGE_MODELS, 
  IMAGE_TO_IMAGE_MODELS,
  PRESETS,
  RESOLUTION_TIERS,
  getTargetDimensions
} from '../constants';
import { ImageModel } from '../constants';

// Icons
const PaintBrushIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

const RefreshIcon: React.FC = () => (
 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691L7.985 5.989m12.038 0l-3.181 3.183a8.25 8.25 0 01-11.667 0L2.985 5.989" />
</svg>
);

const LockClosedIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

const ImageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const XCircleIcon: React.FC<{onClick: () => void}> = ({ onClick }) => (
    <button onClick={onClick} className="absolute -top-3 -right-3 bg-gray-800 rounded-full p-1 shadow-lg hover:bg-red-500 hover:text-white transition-all duration-200 transform hover:scale-110 text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
    </button>
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
    <div className="relative">
        <select
            {...props}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-3 text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
    </div>
);


interface ControlPanelProps {
  mainPrompt: string;
  setMainPrompt: (value: string) => void;
  shotType: string;
  setShotType: (value: string) => void;
  positivePrompt: string;
  setPositivePrompt: (value: string) => void;
  negativePrompt: string;
  setNegativePrompt: (value: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (value: AspectRatio) => void;
  outputFormat: OutputFormat;
  setOutputFormat: (value: OutputFormat) => void;
  referenceImage: string | null;
  onImageUpload: (file: File) => void;
  onRemoveImage: () => void;
  dnaLock: boolean;
  setDnaLock: (value: boolean) => void;
  model: ImageModel;
  setModel: (value: ImageModel) => void;
  preset: Preset;
  setPreset: (value: string) => void;
  resolution: ResolutionTier;
  setResolution: (value: ResolutionTier) => void;
  onGenerate: () => void;
  onReset: () => void;
  isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  mainPrompt, setMainPrompt,
  shotType, setShotType,
  positivePrompt, setPositivePrompt,
  negativePrompt, setNegativePrompt,
  aspectRatio, setAspectRatio,
  outputFormat, setOutputFormat,
  referenceImage, onImageUpload, onRemoveImage,
  dnaLock, setDnaLock,
  model, setModel,
  preset, setPreset,
  resolution, setResolution,
  onGenerate, onReset, isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const hasPrompt = mainPrompt.trim().length > 0 || referenceImage;
  const isTextGenMode = !referenceImage;

  const availableModels = isTextGenMode ? TEXT_TO_IMAGE_MODELS : IMAGE_TO_IMAGE_MODELS;
  const masterV2Disabled = !isTextGenMode || !!preset.positivePromptTemplate;

  return (
    <div className="space-y-6 flex flex-col h-full text-gray-200">
      <h1 className="text-2xl font-bold text-gray-100">Công cụ Tạo ảnh bằng AI</h1>
      
      <div className="flex-grow space-y-6">
        <div>
          <label htmlFor="main-prompt" className="block text-lg font-semibold text-gray-300 mb-2">
            1. Mô tả nhân vật & bối cảnh
          </label>
          <textarea
            id="main-prompt"
            rows={5}
            value={mainPrompt}
            onChange={(e) => setMainPrompt(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y placeholder-gray-500"
            placeholder="VD: A beautiful Vietnamese woman, age 25, long black hair, wearing a traditional ao dai, standing in a field of flowers at sunset."
          />
          <div className="flex items-center mt-3 text-sm">
            <input
              type="checkbox"
              id="dna-lock"
              checked={dnaLock}
              onChange={(e) => setDnaLock(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="dna-lock" className="ml-2 flex items-center text-gray-400 cursor-pointer">
              <LockClosedIcon />
              Khóa DNA để giữ nguyên nhân vật cho các lần tạo sau.
            </label>
          </div>
        </div>

        <fieldset className="space-y-4" disabled={!isTextGenMode}>
          <legend className="block text-lg font-semibold text-gray-300 mb-2 border-b border-gray-700 w-full pb-2">
              2. Góc chụp & Khung hình
          </legend>
          <div className={`${!isTextGenMode ? 'opacity-50' : ''}`}>
             <label htmlFor="shot-type-select" className="block text-sm font-medium text-gray-400 mb-2">
                Góc chụp
             </label>
             <Select id="shot-type-select" value={shotType} onChange={(e) => setShotType(e.target.value)}>
                 <option value="">-- Không chọn --</option>
                 {SHOT_TYPES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
             </Select>
           </div>
           <div className={`${!isTextGenMode ? 'opacity-50' : ''}`}>
             <label htmlFor="aspect-ratio-select" className="block text-sm font-medium text-gray-400 mb-2">
                Tỷ lệ khung hình
             </label>
             <Select 
                id="aspect-ratio-select" 
                value={aspectRatio} 
                onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
             >
                 {ASPECT_RATIOS.map(r => <option key={r} value={r}>{r}</option>)}
             </Select>
           </div>
        </fieldset>
        
        <fieldset className="space-y-4" disabled={!isTextGenMode}>
           <div className={`${!isTextGenMode ? 'opacity-50' : ''}`}>
             <label htmlFor="preset-select" className="block text-sm font-medium text-gray-400 mb-2">
                Preset (Phong cách)
             </label>
             <Select id="preset-select" value={preset.id} onChange={(e) => setPreset(e.target.value)}>
                 {PRESETS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
             </Select>
           </div>
           <div className={`${!isTextGenMode ? 'opacity-50' : ''}`}>
             <label htmlFor="resolution-select" className="block text-sm font-medium text-gray-400 mb-2">
                Chất lượng đầu ra
             </label>
             <Select 
                id="resolution-select" 
                value={resolution.name} 
                onChange={(e) => setResolution(RESOLUTION_TIERS.find(r => r.name === e.target.value) || RESOLUTION_TIERS[0])}
             >
                {RESOLUTION_TIERS.map(r => {
                   const { width, height } = getTargetDimensions(r.name, aspectRatio);
                   return <option key={r.name} value={r.name}>{r.name} ({width}x{height})</option>
                 })}
             </Select>
           </div>
        </fieldset>

        <div className={masterV2Disabled ? 'opacity-50' : ''}>
          <label htmlFor="positive-prompt" className="block text-sm font-medium text-gray-400 mb-2">
            Prompt Tích cực (Master V2)
          </label>
          <textarea
            id="positive-prompt"
            rows={5}
            value={positivePrompt}
            onChange={(e) => setPositivePrompt(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y placeholder-gray-500 disabled:cursor-not-allowed"
            disabled={masterV2Disabled}
          />
        </div>

        <div className={masterV2Disabled ? 'opacity-50' : ''}>
          <label htmlFor="negative-prompt" className="block text-sm font-medium text-gray-400 mb-2">
            Prompt Tiêu cực (Master V2)
          </label>
          <textarea
            id="negative-prompt"
            rows={5}
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y placeholder-gray-500 disabled:cursor-not-allowed"
            disabled={masterV2Disabled}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Ảnh tham chiếu <span className="text-gray-500">(Tùy chọn, sẽ vô hiệu hóa Master preset)</span>
          </label>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          {referenceImage ? (
             <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-gray-700 shadow-inner bg-gray-900/50">
                <img src={referenceImage} alt="Reference" className="w-full h-full object-contain" />
                <XCircleIcon onClick={onRemoveImage} />
             </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative block w-full border-2 border-gray-600 border-dashed rounded-lg p-6 text-center hover:border-blue-500 cursor-pointer transition-colors"
            >
              <ImageIcon />
              <span className="mt-2 block text-sm font-medium text-gray-400">Thả tệp hoặc nhấp để tải lên</span>
            </div>
          )}
        </div>
         {!isTextGenMode && <p className="text-xs text-gray-500 text-center -mt-4">Chế độ Master v2 không áp dụng khi dùng ảnh tham chiếu.</p>}
      </div>

      <div className="space-y-4 pt-4">
        <div className="bg-slate-800/50 rounded-lg p-4">
            <label htmlFor="model-select" className="block text-xs font-semibold uppercase text-gray-400 mb-2">
                Model
            </label>
            <Select
                id="model-select"
                value={model}
                onChange={(e) => setModel(e.target.value as ImageModel)}
            >
                {availableModels.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </Select>
             <p className="text-xs text-gray-500 mt-2">
                Sử dụng Gemini API để tạo ảnh. Vui lòng đảm bảo bạn đã cung cấp Khóa API.
            </p>
        </div>

        <div className="flex items-center space-x-2">
            <button
            onClick={onGenerate}
            disabled={isLoading || !hasPrompt}
            className="flex-grow bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center text-base shadow-lg hover:shadow-xl transform hover:scale-[1.03] active:scale-[0.99]"
            >
            {isLoading ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang tạo...
                </>
            ) : (
                <>
                <PaintBrushIcon />
                Tạo ảnh
                </>
            )}
            </button>
            <button
            onClick={onReset}
            disabled={isLoading}
            className="shrink-0 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-300 font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center border border-gray-600 shadow-md hover:shadow-lg transform hover:scale-[1.03] active:scale-[0.99]"
            >
            <RefreshIcon />
            Làm mới
            </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;