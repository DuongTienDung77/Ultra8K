export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
export type OutputFormat = "PNG" | "JPG" | "WEBP";

export interface Preset {
  id: string;
  name: string;
  promptPrefix?: string;
  positivePromptTemplate?: string;
  negativePrompt?: string;
  overrides?: {
    resolutionName?: string;
    aspectRatio?: AspectRatio;
  };
}

export interface ResolutionTier {
  name: string;
  height: number;
}

export interface PostProcessPreset {
  id: string;
  name: string;
  prompt: string;
}
