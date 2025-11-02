import React, { useState, useCallback } from 'react';
import ControlPanel from './ControlPanel';
import ImageDisplay from './ImageDisplay';
import { AspectRatio, OutputFormat, Preset, ResolutionTier } from '../types';
import { generateImages } from '../services/geminiService';
import { 
  TEXT_TO_IMAGE_MODELS, 
  IMAGE_TO_IMAGE_MODELS,
  FIXED_POSITIVE_PROMPT,
  FIXED_NEGATIVE_PROMPT,
  PRESETS,
  RESOLUTION_TIERS,
  getTargetDimensions
} from '../constants';
import { ImageModel } from '../constants';

interface ImageGeneratorProps {
  onApiKeyInvalid: () => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onApiKeyInvalid }) => {
  // --- Generator State ---
  const [mainPrompt, setMainPrompt] = useState<string>('');
  const [shotType, setShotType] = useState<string>('');
  const [positivePrompt, setPositivePrompt] = useState<string>(FIXED_POSITIVE_PROMPT);
  const [negativePrompt, setNegativePrompt] = useState<string>(FIXED_NEGATIVE_PROMPT);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('PNG');
  const [referenceImage, setReferenceImage] = useState<{ file: File, dataUrl: string } | null>(null);
  const [dnaLock, setDnaLock] = useState<boolean>(false);
  const [model, setModel] = useState<ImageModel>(TEXT_TO_IMAGE_MODELS[0].id);
  const [preset, setPreset] = useState<Preset>(PRESETS[0]);
  const [resolution, setResolution] = useState<ResolutionTier>(RESOLUTION_TIERS[0]);
  
  // --- UI & Loading State ---
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [sourceImages, setSourceImages] = useState<string[]>([]);
  const [portraitImages, setPortraitImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // --- Rating State ---
  const [sourceImageRating, setSourceImageRating] = useState<'up' | 'down' | null>(null);
  const [portraitImageRating, setPortraitImageRating] = useState<'up' | 'down' | null>(null);
  
  const handleSetPreset = (presetId: string) => {
    const newPreset = PRESETS.find(p => p.id === presetId) || PRESETS[0];
    setPreset(newPreset);

    if (newPreset.overrides?.aspectRatio) {
        setAspectRatio(newPreset.overrides.aspectRatio);
    }
    if (newPreset.overrides?.resolutionName) {
        const newResolution = RESOLUTION_TIERS.find(r => r.name === newPreset.overrides.resolutionName);
        if (newResolution) {
            setResolution(newResolution);
        }
    }
    
    if (newPreset.negativePrompt) {
        setNegativePrompt(newPreset.negativePrompt);
    } else {
        setNegativePrompt(FIXED_NEGATIVE_PROMPT);
    }
  };

  const processImage = useCallback((base64Image: string, targetWidth: number, targetHeight: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                return reject(new Error("Could not create canvas context"));
            }

            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, targetWidth, targetHeight);

            const scale = Math.min(targetWidth / img.naturalWidth, targetHeight / img.naturalHeight);
            const drawWidth = img.naturalWidth * scale;
            const drawHeight = img.naturalHeight * scale;
            const x = (targetWidth - drawWidth) / 2;
            const y = (targetHeight - drawHeight) / 2;

            ctx.drawImage(img, x, y, drawWidth, drawHeight);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = () => reject(new Error("Failed to load image for processing."));
        img.src = base64Image;
    });
  }, []);
  
  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setReferenceImage({ file, dataUrl: reader.result as string });
          setModel(IMAGE_TO_IMAGE_MODELS[0].id);
        };
        reader.readAsDataURL(file);
    } else {
        setError("Vui lòng chọn một tệp hình ảnh hợp lệ.");
    }
  };

  const handleRemoveImage = () => {
    setReferenceImage(null);
    setModel(TEXT_TO_IMAGE_MODELS[0].id);
  };

  const handleGenerate = useCallback(async () => {
    if (!mainPrompt.trim() && !referenceImage) {
      setError('Vui lòng nhập mô tả hoặc tải ảnh tham chiếu.');
      return;
    }
    setIsLoading(true);
    setLoadingAction('generate');
    setError(null);
    setSourceImages([]);
    setPortraitImages([]);
    setSourceImageRating(null);
    setPortraitImageRating(null);

    let imageForApi: { data: string; mimeType: string; } | null = null;
    if (referenceImage) {
        imageForApi = {
            data: referenceImage.dataUrl.split(',')[1],
            mimeType: referenceImage.file.type,
        };
    }
    
    let combinedPrompt = mainPrompt;
    if (shotType) {
        combinedPrompt = `${shotType}, ${mainPrompt}`;
    }

    let finalPositivePrompt: string;
    let finalNegativePrompt: string = negativePrompt;
    
    if (!referenceImage) {
        if (preset.positivePromptTemplate) {
            finalPositivePrompt = preset.positivePromptTemplate.replace('<character_DNA>', combinedPrompt);
        } else {
            const userPrompt = combinedPrompt.trim() ? `${preset.promptPrefix || ''} ${combinedPrompt}` : (preset.promptPrefix || '').trim();
            finalPositivePrompt = `${userPrompt}. ${positivePrompt}`;
        }
    } else {
        finalPositivePrompt = combinedPrompt;
        finalNegativePrompt = '';
    }

    try {
      const images = await generateImages(finalPositivePrompt, finalNegativePrompt, aspectRatio, outputFormat, imageForApi, dnaLock, model, {onApiKeyInvalid});
      
      if (!images || images.length === 0) {
        throw new Error("The model did not return any images. This may be due to the safety filter. Please modify your prompt and try again.");
      }

      let finalImage: string;
      if (!referenceImage) {
        const { width, height } = getTargetDimensions(resolution.name, aspectRatio);
        finalImage = await processImage(images[0], width, height);
      } else {
        finalImage = images[0];
      }
      setSourceImages([finalImage]);
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi không xác định.');
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  }, [mainPrompt, shotType, positivePrompt, negativePrompt, aspectRatio, outputFormat, referenceImage, dnaLock, model, preset, resolution, processImage, onApiKeyInvalid]);

  const runImageToImage = useCallback(async (base64Image: string, prompt: string) => {
    const mimeType = base64Image.substring(base64Image.indexOf(':') + 1, base64Image.indexOf(';'));
    const base64Data = base64Image.split(',')[1];
    
    const imageForApi = { data: base64Data, mimeType: mimeType };

    return generateImages(prompt, '', '9:16', 'PNG', imageForApi, false, IMAGE_TO_IMAGE_MODELS[0].id, {onApiKeyInvalid});
  }, [onApiKeyInvalid]);

  const handleBeautify = useCallback(async () => {
    if (sourceImages.length === 0) return;
    setIsLoading(true);
    setLoadingAction('beautify');
    setError(null);
    try {
      setSourceImageRating(null);
      const originalImage = new Image();
      originalImage.src = sourceImages[0];
      await new Promise<void>((resolve, reject) => {
        originalImage.onload = () => resolve();
        originalImage.onerror = () => reject(new Error('Failed to load original image.'));
      });
      
      const prompt = "Upgrade this photo to the highest quality. Enhance sharpness, improve skin, hair, and lighting details, but absolutely do not change the composition or identity of the person in the photo.";
      const images = await runImageToImage(sourceImages[0], prompt);

      if (!images || images.length === 0) {
        throw new Error("The beautify process failed to return an image. Please try again.");
      }
      
      const processedImage = await processImage(images[0], originalImage.naturalWidth, originalImage.naturalHeight);
      setSourceImages([processedImage]);

    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi không xác định.');
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  }, [sourceImages, runImageToImage, processImage]);

  const handlePortrait = useCallback(async () => {
    if (sourceImages.length === 0) return;
    setIsLoading(true);
    setLoadingAction('portrait');
    setError(null);
    setPortraitImageRating(null);
    try {
      const prompt = "From this photo, identify the main character and create a brand new portrait photo. Focus on the face and shoulders, apply professional studio lighting, and add a catchlight effect to the eyes to make them more lively. The final image should feel like a professional headshot. Preserve the person's identity perfectly.";
      const images = await runImageToImage(sourceImages[0], prompt);

      if (!images || images.length === 0) {
        throw new Error("The portrait generation failed to return an image. Please try again.");
      }
      
      const { width, height } = getTargetDimensions("8K", "9:16");
      const processedImage = await processImage(images[0], width, height);
      setPortraitImages([processedImage]);

    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi không xác định.');
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  }, [sourceImages, runImageToImage, processImage]);

  const handleApplyPreset = useCallback(async (prompt: string, target: 'source' | 'portrait') => {
    const imageToProcess = target === 'source' ? sourceImages[0] : portraitImages[0];
    if (!imageToProcess) return;

    setIsLoading(true);
    setLoadingAction(`preset-${target}`);
    setError(null);

    try {
        if (target === 'source') setSourceImageRating(null);
        if (target === 'portrait') setPortraitImageRating(null);

        const originalImage = new Image();
        originalImage.src = imageToProcess;
        await new Promise<void>((resolve, reject) => {
            originalImage.onload = () => resolve();
            originalImage.onerror = () => reject(new Error('Failed to load image for preset.'));
        });

        const images = await runImageToImage(imageToProcess, prompt);
        
        if (!images || images.length === 0) {
          throw new Error("Applying the preset failed to return an image. Please try again.");
        }

        const processedImage = await processImage(images[0], originalImage.naturalWidth, originalImage.naturalHeight);

        if (target === 'source') {
            setSourceImages([processedImage]);
        } else {
            setPortraitImages([processedImage]);
        }
    } catch (err: any) {
        setError(err.message || 'Đã xảy ra lỗi không xác định.');
    } finally {
        setIsLoading(false);
        setLoadingAction(null);
    }
  }, [sourceImages, portraitImages, runImageToImage, processImage]);


  const handleDeletePortrait = () => {
      setPortraitImages([]);
      setPortraitImageRating(null);
  };

  const handleReset = useCallback(() => {
    setMainPrompt('');
    setShotType('');
    setPositivePrompt(FIXED_POSITIVE_PROMPT);
    setNegativePrompt(FIXED_NEGATIVE_PROMPT);
    setAspectRatio('9:16');
    setOutputFormat('PNG');
    setReferenceImage(null);
    setDnaLock(false);
    setModel(TEXT_TO_IMAGE_MODELS[0].id);
    setPreset(PRESETS[0]);
    setResolution(RESOLUTION_TIERS[0]);
    setSourceImages([]);
    setPortraitImages([]);
    setError(null);
    setSourceImageRating(null);
    setPortraitImageRating(null);
  }, []);
  
  const handleRateSourceImage = (rating: 'up' | 'down') => {
    setSourceImageRating(prev => prev === rating ? null : rating);
  };

  const handleRatePortraitImage = (rating: 'up' | 'down') => {
    setPortraitImageRating(prev => prev === rating ? null : rating);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen">
      <aside className="w-full lg:w-[450px] lg:flex-shrink-0 lg:h-full lg:overflow-y-auto p-6 bg-gray-900 border-r border-gray-700">
        <ControlPanel
          mainPrompt={mainPrompt} setMainPrompt={setMainPrompt}
          shotType={shotType} setShotType={setShotType}
          positivePrompt={positivePrompt} setPositivePrompt={setPositivePrompt}
          negativePrompt={negativePrompt} setNegativePrompt={setNegativePrompt}
          aspectRatio={aspectRatio} setAspectRatio={setAspectRatio}
          outputFormat={outputFormat} setOutputFormat={setOutputFormat}
          referenceImage={referenceImage?.dataUrl ?? null}
          onImageUpload={handleImageUpload} onRemoveImage={handleRemoveImage}
          dnaLock={dnaLock} setDnaLock={setDnaLock}
          model={model} setModel={setModel}
          preset={preset} setPreset={handleSetPreset}
          resolution={resolution} setResolution={setResolution}
          onGenerate={handleGenerate} onReset={handleReset}
          isLoading={isLoading}
        />
      </aside>
      <main className="w-full flex-1 p-6 md:p-8 bg-gray-800 lg:overflow-y-auto">
        <ImageDisplay 
          isLoading={isLoading} loadingAction={loadingAction}
          sourceImages={sourceImages} portraitImages={portraitImages}
          error={error} onRetry={handleGenerate}
          onBeautify={handleBeautify} onPortrait={handlePortrait}
          onApplyPresetToSource={(prompt) => handleApplyPreset(prompt, 'source')}
          onApplyPresetToPortrait={(prompt) => handleApplyPreset(prompt, 'portrait')}
          onDeletePortrait={handleDeletePortrait}
          sourceImageRating={sourceImageRating} onRateSourceImage={handleRateSourceImage}
          portraitImageRating={portraitImageRating} onRatePortraitImage={handleRatePortraitImage}
        />
      </main>
    </div>
  );
};

export default ImageGenerator;