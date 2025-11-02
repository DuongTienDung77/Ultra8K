import { GoogleGenAI, GenerateImagesResponse, Modality, GenerateContentResponse } from "@google/genai";
import { AspectRatio, OutputFormat } from '../types';
import { ImageModel, ImagenModel } from "../constants";
import { getApiKey, clearApiKey } from './apiKeyService';

// This function is now responsible for getting the *current* API key
const getCurrentApiKey = (): string => {
  // Prioritize process.env.API_KEY if available (AI Studio environment)
  if (typeof process !== 'undefined' && process.env.API_KEY) {
    return process.env.API_KEY;
  }
  // Otherwise, check local storage (for external deployments)
  const storedKey = getApiKey();
  if (storedKey) {
    return storedKey;
  }
  throw new Error("API_KEY environment variable not set and no API key found in local storage.");
};

// We will pass `onApiKeyInvalid` from App.tsx to ImageGenerator, then to this service.
interface GeminiServiceOptions {
  onApiKeyInvalid: () => void;
}

// Wrapper function to initialize GoogleGenAI with the current API key
const getGeminiClient = (onApiKeyInvalid: () => void) => {
  try {
    const apiKey = getCurrentApiKey();
    return new GoogleGenAI({ apiKey });
  } catch (error: any) {
    if (error.message.includes("API_KEY environment variable not set")) {
      console.error("API Key is missing. Triggering re-selection.");
      onApiKeyInvalid();
    }
    throw error; // Re-throw to propagate the error
  }
};

const getMimeType = (format: OutputFormat): 'image/png' | 'image/jpeg' | 'image/webp' => {
  switch (format) {
    case 'JPG':
      return 'image/jpeg';
    case 'WEBP':
      return 'image/webp';
    case 'PNG':
    default:
      return 'image/png';
  }
};

const generateWithImagen = async (
  prompt: string,
  negativePrompt: string,
  aspectRatio: AspectRatio,
  outputFormat: OutputFormat,
  model: ImagenModel,
  onApiKeyInvalid: () => void // Pass callback
): Promise<string[]> => {
    const ai = getGeminiClient(onApiKeyInvalid); // Get client dynamically
    const mimeType = getMimeType(outputFormat);

    let fullPrompt = prompt;
    if (negativePrompt) {
        // Append the negative prompt to the main prompt as the API doesn't support a separate parameter for it.
        fullPrompt = `${prompt}. Do not include any of the following: ${negativePrompt}.`;
    }

    const response: GenerateImagesResponse = await ai.models.generateImages({
      model: model,
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: mimeType,
        aspectRatio: aspectRatio,
      },
    });

    return response.generatedImages.map(img => `data:${mimeType};base64,${img.image.imageBytes}`);
};

const generateWithFlash = async (
    prompt: string,
    referenceImage: {
        data: string; // base64 encoded string
        mimeType: string;
    },
    model: 'gemini-2.5-flash-image-preview',
    onApiKeyInvalid: () => void // Pass callback
): Promise<string[]> => {
    const ai = getGeminiClient(onApiKeyInvalid); // Get client dynamically
    const imagePart = {
      inlineData: {
        data: referenceImage.data,
        mimeType: referenceImage.mimeType,
      },
    };

    const textPart = { text: prompt };

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: { parts: [imagePart, textPart] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    const images: string[] = [];
    if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const mimeType = part.inlineData.mimeType;
                images.push(`data:${mimeType};base64,${base64ImageBytes}`);
            }
        }
    }
    
    if (images.length === 0) {
        throw new Error("The model did not return an image. Please try a different prompt or image.");
    }

    return images;
};

export const generateImages = async (
  positivePrompt: string,
  negativePrompt: string,
  aspectRatio: AspectRatio,
  outputFormat: OutputFormat,
  referenceImage: { data: string; mimeType: string; } | null,
  dnaLock: boolean, // not used by the API yet, but is here for future implementation
  model: ImageModel,
  options: GeminiServiceOptions // Pass options with callback
): Promise<string[]> => {
  try {
    switch(model) {
      case 'imagen-4.0-generate-001':
      case 'imagen-4.0-standard-generate-001':
      case 'imagen-4.0-ultra-generate-001':
        return await generateWithImagen(positivePrompt, negativePrompt, aspectRatio, outputFormat, model, options.onApiKeyInvalid);
      case 'gemini-2.5-flash-image-preview':
        if (!referenceImage) {
          throw new Error("A reference image is required for the selected model.");
        }
        return await generateWithFlash(positivePrompt, referenceImage, model, options.onApiKeyInvalid);
      default:
        throw new Error("Unsupported model selected.");
    }
  } catch (error: any) {
    console.error("Error generating images:", error);

    let friendlyMessage = "An unknown error occurred while generating images.";

    // Function to parse the error content, which might be a JSON string or an object
    const parseErrorContent = (content: any): string | null => {
        let errorData;
        if (typeof content === 'string') {
            try {
                // Find the start of a JSON object
                const jsonStartIndex = content.indexOf('{');
                if (jsonStartIndex !== -1) {
                    errorData = JSON.parse(content.substring(jsonStartIndex));
                }
            } catch (e) {
                return null; // Not a parsable JSON string
            }
        } else if (typeof content === 'object' && content !== null) {
            errorData = content;
        }

        if (errorData && errorData.error) {
            const { code, message, status } = errorData.error;
            if (code === 429 || status === "RESOURCE_EXHAUSTED") {
                return "API Quota Exceeded. You have used your daily limit. Please check your Google AI/Gemini plan and billing details, or try again later.";
            }
            if (message && message.includes("Requested entity was not found.")) {
              console.error("API Key invalid or not found (404). Clearing key.");
              options.onApiKeyInvalid(); // Trigger re-selection
              return "Khóa API không hợp lệ hoặc không tìm thấy. Vui lòng chọn hoặc nhập lại khóa API của bạn.";
            }
            if (message) {
                 return `An API error occurred: ${message}`;
            }
        }
        return null;
    };
    
    // Try parsing the error object itself, or its message property
    const parsedFromError = parseErrorContent(error);
    if (parsedFromError) {
        friendlyMessage = parsedFromError;
    } else if (error instanceof Error) {
        const parsedFromMessage = parseErrorContent(error.message);
        if (parsedFromMessage) {
            friendlyMessage = parsedFromMessage;
        } else {
            // Fallback to a generic message but include original error text
            friendlyMessage = `Failed to generate images. Please try again. (${error.message})`;
        }
    }

    return Promise.reject(new Error(friendlyMessage));
  }
};