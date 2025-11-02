import { AspectRatio, OutputFormat, Preset, ResolutionTier, PostProcessPreset } from './types';

export type ImagenModel = 'imagen-4.0-generate-001' | 'imagen-4.0-standard-generate-001' | 'imagen-4.0-ultra-generate-001';
export type GeminiImageModel = 'gemini-2.5-flash-image-preview';
export type ImageModel = ImagenModel | GeminiImageModel;

export interface ImageModelInfo {
  id: ImageModel;
  name: string;
}

export const ASPECT_RATIOS: AspectRatio[] = ["9:16", "1:1", "3:4", "4:3", "16:9"];
export const OUTPUT_FORMATS: OutputFormat[] = ["PNG", "JPG", "WEBP"];

export const SHOT_TYPES = [
    { label: 'Bán thân', value: 'Upper body shot' },
    { label: 'Toàn thân', value: 'Full body shot' },
    { label: 'Từ phía sau', value: 'Shot from behind' },
    { label: 'Góc 3/4', value: '3/4 angle view' },
    { label: 'Chính diện', value: 'Front view shot' },
    { label: 'Nhìn từ bên trái', value: 'View from the left side' },
    { label: 'Nhìn từ bên phải', value: 'View from the right side' },
    { label: 'Từ trên xuống', value: 'High-angle shot from above' },
    { label: 'Từ dưới lên', value: 'Low-angle shot from below' }
];

export const TEXT_TO_IMAGE_MODELS: ImageModelInfo[] = [
    { id: 'imagen-4.0-generate-001', name: 'Imagen 4.0 Quality' },
    { id: 'imagen-4.0-standard-generate-001', name: 'Imagen 4.0 Standard' },
    { id: 'imagen-4.0-ultra-generate-001', name: 'Imagen 4.0 Ultra' },
];
export const IMAGE_TO_IMAGE_MODELS: ImageModelInfo[] = [
    { id: 'gemini-2.5-flash-image-preview', name: 'Gemini 2.5 Flash Image Preview' }
];


// --- Master v2 Mechanism Constants ---

export const FIXED_POSITIVE_PROMPT = "Photorealistic studio portrait. Skin shows fine micro-texture and subtle subsurface scattering; eyes tack sharp with crisp lashes; hairline blends cleanly with individual strands and natural flyaways. Fabric shows authentic weave, seams and natural wrinkles; metals reflect with tiny imperfections. Lighting coherent with scene; natural shadow falloff on cheekbone, jawline and nose. Background has believable micro-details; avoid CGI-clean look. 85mm equivalent, f/2.0–f/2.8; subject tack sharp, cinematic color grade; confident posture, slight asymmetry, CRUCIAL DNA PRESERVATION: The model's identity, face, and body MUST be perfectly preserved from the original image. Do not change the person. The final image must be of the same person. Maintain all defining characteristics (facial structure, skin tone, hair color and style, unique features)";

export const FIXED_NEGATIVE_PROMPT = "plastic skin, waxy, airbrushed, porcelain finish, watercolor skin, low-frequency blur, fake beauty filter, AI artifacts, extra fingers, distorted hands, missing knuckles, wrong anatomy, blurry eyes, halo hair edges, warped text or logos, flat lighting, uniform background blur, banding, blown highlights, overshar halos, perfect symmetry, CGI-clean background, changing the person, different person, inconsistent identity, changing character DNA, different hairstyle, different eye color, morphed face. blurry, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck";

export const PRESETS: Preset[] = [
  { id: 'Default', name: 'Default' },
  { id: 'StudioAI_MasterPortrait_v2', name: 'StudioAI MasterPortrait v2' },
  {
    id: 'CanCanh_MasterPortrait_v1',
    name: 'CanCanh MasterPortrait v1',
    promptPrefix: 'Detailed close-up portrait, focusing on hyper-realistic skin texture, pores, and fine details. ',
  },
  {
    id: 'CanCanh_Beauty_v1',
    name: 'CanCanh Beauty v1',
    promptPrefix: 'Commercial beauty close-up, flawless glass-skin effect but with realistic texture, not waxy. ',
  },
  {
    id: 'CanCanh_Fashion_v1',
    name: 'CanCanh Fashion v1',
    promptPrefix: 'Dramatic fashion editorial close-up, bold makeup, high-contrast lighting. ',
  },
  {
    id: 'DuoiMua_v1',
    name: '🌧 Dưới Mưa – Portrait ngoài trời',
    positivePromptTemplate: "Ảnh toàn thân siêu thực của <character_DNA> ngoài trời trong cơn mưa. Váy hoa vàng mỏng, ướt, bán trong, dây spaghetti, phong cách mùa hè. Tóc ướt bám vai tự nhiên. Biểu cảm suy nghĩ, một tay chạm nhẹ mặt, một tay xuôi theo thân người. Giọt mưa rõ, nền cây mờ, mặt đất ướt. Ánh sáng điện ảnh, HD 8K, 85mm, f/2.0–f/2.8, cinematic grade.",
    negativePrompt: "da waxy, CGI-clean rain, giọt mưa giả, anatomy lỗi, halo tóc, nền phẳng",
    overrides: { resolutionName: "8K", aspectRatio: "9:16" }
  },
  {
    id: 'HoangHonBien_v1',
    name: '🌅 Hoàng Hôn Biển – Portrait ngoài trời',
    positivePromptTemplate: "Ảnh chân dung toàn thân siêu thực của <character_DNA> trên bãi biển lúc hoàng hôn. Nắng vàng-cam chiếu ngược, tạo viền tóc, ánh sáng bokeh. Sóng biển mờ phía sau, cát có chi tiết. Váy trắng hoặc bikini cao cấp, vải thật. Gió nhẹ làm tóc bay. Máy ảnh 85mm, f/2.2, cinematic neutral grade.",
    negativePrompt: "da nhựa, CGI sóng biển, gió giả, anatomy lỗi, flare sai vật lý",
    overrides: { resolutionName: "8K", aspectRatio: "9:16" }
  },
  {
    id: 'TrenCoXanh_v1',
    name: '🌿 Trên Cỏ Xanh – Portrait thiên nhiên',
    positivePromptTemplate: "Ảnh siêu thực của <character_DNA> ngồi trên đồng cỏ xanh mướt. Ánh nắng chiều dịu xuyên tóc, tạo rim light tự nhiên. Cỏ phía trước hơi mờ (foreground bokeh). Trang phục váy trắng linen nhẹ, nếp gấp thật. Máy ảnh 85mm, f/2.0, cinematic grading.",
    negativePrompt: "CGI-clean grass, blur đồng đều, màu quá gắt, da giả",
    overrides: { resolutionName: "8K", aspectRatio: "9:16" }
  },
  {
    id: 'PhoCoBanDem_v1',
    name: '🏮 Phố Cổ Ban Đêm – Portrait đường phố',
    positivePromptTemplate: "Ảnh siêu thực của <character_DNA> đi dạo phố cổ ban đêm. Đèn lồng vàng đỏ chiếu sáng da, bóng đổ mềm. Nền lát gạch ướt phản chiếu ánh đèn. Trang phục áo dài lụa trắng hoặc váy cổ điển. Máy ảnh 85mm, f/2.0, cinematic color grade.",
    negativePrompt: "da waxy, CGI đèn lồng, ánh sáng phẳng, nền bệt",
    overrides: { resolutionName: "8K", aspectRatio: "9:16" }
  },
  {
    id: 'NangHeTrongVuon_v1',
    name: '☀️ Nắng Hè Trong Vườn – Bikini Tươi Trẻ',
    positivePromptTemplate: "Ảnh siêu thực của <character_DNA> trong một nhà kính trong vườn. Cô ấy mặc bikini trắng in họa tiết cherry nhiều màu, phong cách mùa hè vui tươi. Ánh sáng ban ngày khuếch tán qua kính nhà vườn, tạo highlight nhẹ tự nhiên trên da. Da mịn nhưng tự nhiên, giữ lỗ chân lông nhỏ, tông ấm trung tính pha hồng đào. Lớp nền nhẹ tự nhiên, hơi bóng khỏe, má hồng hồng đào, eyeliner mảnh, mi cong, son môi hồng san hô bóng nhẹ. Bối cảnh có nhiều cây xanh, hoa cẩm tú cầu hồng, hồng xanh, và các phụ kiện pastel. Không khí năng động, tươi trẻ, tràn đầy sức sống mùa hè. Gam màu pastel sống động. Máy ảnh 85mm, f/2.2, cinematic neutral grade.",
    negativePrompt: "da giả, da nhựa, CGI-clean, blur đồng đều, màu quá gắt, anatomy lỗi, cháy sáng",
    overrides: { resolutionName: "DCI 4K", aspectRatio: "1:1" }
  },
  {
    id: 'NangHoa_v1',
    name: '🌸 Nàng Hoa – Gái Trong Vườn Hoa',
    positivePromptTemplate: "Full body portrait of <character_DNA> in a white silk straight dress with thin straps, elegant open back, body hugging fit. She stands gracefully in the middle of a blooming flower garden, slightly leaning to reveal the bare back, with soft feminine eyes looking over the shoulder. Minimalist gold earrings and a delicate bracelet. Background filled with pastel roses, peonies, and wildflowers, depth softly blurred. Lighting is warm golden sunlight, soft highlights on hair and shoulders, bright romantic atmosphere.",
    negativePrompt: "cartoonish look, waxy plastic skin, CGI-clean textures, distorted body, extra fingers, flat lighting, artificial makeup look",
    overrides: { resolutionName: "DCI 4K", aspectRatio: "16:9" }
  }
];

export const RESOLUTION_TIERS: ResolutionTier[] = [
    { name: "DCI 4K", height: 4096 },
    { name: "8K", height: 8192 },
    { name: "10K", height: 10240 },
];

export const getTargetDimensions = (resolutionName: string, aspectRatio: AspectRatio): {width: number, height: number} => {
    const resolutions: Record<string, Record<AspectRatio, {width: number, height: number}>> = {
        "DCI 4K": {
            "9:16": { width: 2304, height: 4096 },
            "1:1": { width: 4096, height: 4096 },
            "3:4": { width: 3072, height: 4096 },
            "4:3": { width: 5461, height: 4096 },
            "16:9": { width: 7280, height: 4096 }
        },
        "8K": {
            "9:16": { width: 4608, height: 8192 },
            "1:1": { width: 8192, height: 8192 },
            "3:4": { width: 6144, height: 8192 },
            "4:3": { width: 10923, height: 8192 },
            "16:9": { width: 14560, height: 8192 }
        },
        "10K": {
            "9:16": { width: 5760, height: 10240 },
            "1:1": { width: 10240, height: 10240 },
            "3:4": { width: 7680, height: 10240 },
            "4:3": { width: 13653, height: 10240 },
            "16:9": { width: 18204, height: 10240 }
        }
    };
    return resolutions[resolutionName]?.[aspectRatio] || resolutions["8K"]["9:16"]; // fallback
};


export const POST_PROCESS_PRESETS: PostProcessPreset[] = [
  {
    id: 'default',
    name: 'Mặc định (Không filter)',
    prompt: 'Restore original image without any changes.'
  },
  { 
    id: 'cancanh_masterportrait_v1', 
    name: 'Cận Cảnh – Studio AI Master Portrait', 
    prompt: "Recreate this image as a close-up cinematic portrait. Emphasize detailed skin texture, pores, and natural asymmetry. Use an 85mm equivalent camera style with shallow DOF (f/2.0), ensuring eyes are tack sharp with cinematic grading. The lighting should be coherent with the environment, casting natural shadows. The composition and subject must be perfectly preserved." 
  },
  { 
    id: 'cancanh_beauty_v1', 
    name: 'Cận Cảnh Beauty – Studio AI Skin Commercial', 
    prompt: "Recreate this image as a commercial beauty close-up. The skin should be luminous and radiant with a glass-skin shine, while preserving micro-texture like peach fuzz and pores. Use a high-key commercial beauty lighting style with cinematic grading. The composition and subject must be perfectly preserved." 
  },
  { 
    id: 'cancanh_fashion_v1', 
    name: 'Cận Cảnh Fashion – Editorial Close-Up', 
    prompt: "Recreate this image as a high-fashion editorial close-up. The skin should look authentic with visible pores under makeup. Emphasize bold makeup and editorial-styled hair with realistic flyaways. Use dramatic fashion lighting and magazine-style color grading. The composition and subject must be perfectly preserved." 
  },
  {
    id: 'beauty_smooth_skin',
    name: 'Làm Mịn Da Beauty',
    prompt: "Recreate this image, making the skin smooth and radiant with a flawless texture. Blemishes, scars, and pores should be invisible under beauty lighting. The skin surface should reflect soft light evenly with a glass-skin shine and creamy finish. The composition and subject must be perfectly preserved."
  },
  {
    id: 'high_fidelity_realism_skin',
    name: 'Da Siêu Thực Cao Cấp',
    prompt: "Recreate this image with ultra-high fidelity cinematic rendering of the skin. Preserve subtle peach fuzz and delicate micro-textures for natural realism. The skin should have a balanced reflectivity with a soft glow and gentle sheen on highlights, avoiding a plastic look. The composition and subject must be perfectly preserved."
  },
  {
    id: 'restore',
    name: 'Khôi Phục Gốc',
    prompt: 'Restore original image without any changes.'
  },
  {
    id: 'clear',
    name: 'Trong Trẻo',
    prompt: "Apply a 'clear and bright' color grade. Increase vibrance slightly, lift the shadows, and ensure whites are clean. The mood should be fresh and airy."
  },
  {
    id: 'spring',
    name: 'Không Khí Mùa Xuân',
    prompt: "Apply a 'spring season' color grade. Emphasize fresh greens and pastel colors. The overall tone should be bright, warm, and vibrant."
  },
  {
    id: 'warm',
    name: 'Tông Màu Ấm',
    prompt: 'Apply a warm, golden-hour color grade. Increase the temperature, add a soft glow, and deepen the orange and red tones.'
  },
  {
    id: 'cinematic',
    name: 'Màu Điện Ảnh',
    prompt: "Apply a 'cinematic teal and orange' color grade. Shift shadows towards teal/blue and skin tones/highlights towards orange. Increase contrast for a dramatic, movie-like feel."
  },
  {
    id: 'vintage',
    name: 'Màu Vintage',
    prompt: 'Apply a classic, vintage film look. Desaturate colors slightly, add a subtle grain, and apply a faded, nostalgic color tone.'
  },
  {
    id: 'master_portrait',
    name: 'Chân Dung Master StudioAI',
    prompt: 'Recreate the image as a photorealistic cinematic portrait/editorial. The style should be as if shot on an 85mm lens at f/2.0–f/2.8 with shallow DOF. Lighting should be environment-coherent, such as golden hour or natural daylight. Prioritize skin-tone accuracy, preserving pores and micro-texture. Mood should be confident, elegant, and authentic.'
  },
  {
    id: 'beauty_portrait',
    name: 'Chân Dung Beauty',
    prompt: 'Recreate the image with a commercial beauty skin-retouch look. The lighting should be soft and flattering, like a ring beauty light with soft fill, creating a gentle, radiant, and intimate mood.'
  },
  {
    id: 'fashion_editorial',
    name: 'Thời Trang Editorial',
    prompt: 'Recreate the image as an ultra-photorealistic, glossy commercial fashion shot. The style should be as if shot on an 85mm lens with shallow depth of field. Lighting should be a softbox with a glossy rim light, creating a stylish, premium, and trendy mood.'
  },
  {
    id: 'travel',
    name: 'Du Lịch & Đời Sống',
    prompt: 'Recreate the image with a cinematic vlog tone and saturated colors. The lighting should evoke the golden hour, creating an inspiring, free, and wanderlust mood.'
  },
  {
    id: 'drama',
    name: 'Kịch Tính Điện Ảnh',
    prompt: 'Recreate the image with a desaturated cinematic grade and film grain. Use high-contrast, chiaroscuro-style lighting for an intense, emotional, and suspenseful mood.'
  },
  {
    id: 'commercial',
    name: 'Sản Phẩm Thương Mại',
    prompt: 'Recreate the image as a high-end brand film with sharp color grading. Use balanced, high-key studio lighting for a premium, clean, and positive mood.'
  },
  {
    id: 'action',
    name: 'Thể Thao Hành Động',
    prompt: 'Recreate the image with a gritty, razor-sharp look and high energy. Use colored gel lighting (e.g., red and blue) with atmospheric haze for a dynamic, adrenaline-fueled, and tense mood.'
  },
  {
    id: 'street_doc',
    name: 'Đường Phố Tài Liệu',
    prompt: 'Recreate the image with a naturalistic, minimally graded look. Use only available, natural light for a sincere, grounded, and informative mood.'
  },
  {
    id: 'studio_portrait',
    name: 'Chân Dung Studio',
    prompt: 'Re-light as a professional studio portrait with a clean background and controlled, dramatic lighting.'
  },
  {
    id: 'digital_studio',
    name: 'Studio Kỹ Thuật Số',
    prompt: 'Apply a modern, clean, digital studio look. Perfect for e-commerce or clean corporate portraits.'
  },
  {
    id: 'headshot',
    name: 'Chân Dung Headshot',
    prompt: 'Apply a professional studio headshot style. Use a clean neutral gray backdrop, a soft key light with a gentle rim light, a shallow depth of field, and frame the shot tightly from the clavicle up.'
  },
  {
    id: 'fashion_full',
    name: 'Thời Trang Toàn Thân',
    prompt: 'Re-style as a full-length fashion shot. The subject should have a natural stance. Emphasize authentic fabric motion and texture. The floor should have a clean paper sweep or subtle reflections.'
  },
  {
    id: 'golden_hour',
    name: 'Ngoài Trời Giờ Vàng',
    prompt: 'Apply an outdoor, golden hour lighting style. The light should be warm, creating a rim light effect on the subject. Add a slight hint of a breeze in the hair for realism.'
  },
  {
    id: 'garage_doc',
    name: 'Garage Tài Liệu',
    prompt: 'Give the image a realistic, documentary feel as if shot in a garage. Use a fluorescent key light with soft fill. The background should have realistic clutter. Add a subtle 1% film grain for authenticity.'
  },
  {
    id: 'skin_fidelity',
    name: 'Da: Siêu Thực Cao Cấp',
    prompt: 'Retouch the skin to have ultra-high fidelity cinematic rendering with soft light diffusion. Preserve subtle peach fuzz and delicate micro-textures for natural realism. Balance surface reflectivity to a soft glow with a gentle sheen on highlights, avoiding over-plastic shine. Tonal gradients should transition smoothly, showing lifelike depth and softness.'
  },
  {
    id: 'skin_commercial',
    name: 'Da: Beauty Thương Mại',
    prompt: 'Retouch the skin to be smooth and radiant, with flawless texture. Any blemishes or pores should be invisible under beauty light and gentle cinematic grading. The surface should reflect soft light evenly, with a glass-skin shine and creamy finish.'
  },
  {
    id: 'upscale_8k',
    name: 'Nâng Cấp 8K',
    prompt: 'Upscale image using a multi-stage super-resolution pipeline with face-preservation. Step 1: 2x upscale to recover soft details. Step 2: 4x upscale to enhance micro-textures (skin, hair, fabric). Step 3: 8x upscale to finalize an ultra-sharp 8K output. Always preserve facial integrity and avoid a plastic-like skin finish.'
  },
  {
    id: 'CanCanh_MasterPortrait_v1',
    name: 'Cận Cảnh – Chân Dung Master StudioAI',
    prompt: 'Recreate the image as a Close-up cinematic portrait, showing detailed skin texture, pores, faint veins, micro-light scattering, subtle crow’s feet near eyes, and natural asymmetry. Hair edges blend naturally with environment, individual strands visible. Jewelry crisp with micro reflections. Fabric seams and wrinkles sharp. The style should be as if shot on an 85mm equivalent camera with shallow DOF (f/2.0), with the eyes tack sharp and using cinematic grading. Lighting should be coherent with the environment, with shadows falling naturally on the jaw, nose and collarbone.'
  },
  {
    id: 'CanCanh_Beauty_v1',
    name: 'Cận Cảnh Beauty – Da Thương Mại StudioAI',
    prompt: 'Recreate the image as a Commercial beauty close-up portrait. The skin should be luminous and radiant, with a glass-skin shine and creamy diffusion, but still show visible micro-texture and peach fuzz. Avoid a plastic or waxy look. Preserve fine details like pores, faint veins, and subtle crow’s feet near the eyes. Hair edges should be soft and natural, with stray strands visible. Any jewelry or cosmetic products should be crisp with sharp reflections. Use high-key commercial beauty style lighting, ensure the eyes are tack sharp, and apply cinematic grading.'
  },
  {
    id: 'CanCanh_Fashion_v1',
    name: 'Cận Cảnh Fashion – Chụp Cận Editorial',
    prompt: 'Recreate the image as a High-fashion editorial close-up. The skin should look authentic, with fine pores and micro-texture visible under makeup. Apply bold eyeshadow, eyeliner, or glossy lips depending on the desired style. Preserve natural imperfections like peach fuzz and slight crow’s feet. Hair should be styled for an editorial look, with clean edges but visible stray strands for realism. Wardrobe details near the neckline (fabric folds, seams) should be crisp. Jewelry should be reflective and sharp. Use a simple gradient or textured wall with cinematic blur for the background.'
  },
  {
    id: 'NgoaiTroi_DuoiMua_v1',
    name: 'Ngoài Trời: Dưới Mưa',
    prompt: "Recreate this image as if the subject is outdoors in the rain. Add realistic raindrops, wet surfaces on clothing and hair, and a moody, cinematic lighting suitable for a rainy day. The background should be blurred trees and wet ground. Perfectly preserve the subject's identity, face, and body."
  },
  {
    id: 'NgoaiTroi_HoangHonBien_v1',
    name: 'Ngoài Trời: Hoàng Hôn Biển',
    prompt: "Recreate this image, placing the subject on a beach during a beautiful sunset. The lighting should be warm golden-orange, creating a rim light effect on the hair. Add a soft bokeh background of ocean waves. The mood should be serene and cinematic. Perfectly preserve the subject's identity, face, and body."
  },
  {
    id: 'NgoaiTroi_TrenCoXanh_v1',
    name: 'Ngoài Trời: Trên Cỏ Xanh',
    prompt: "Recreate this image, placing the subject sitting on a lush green meadow. The lighting should be soft, like a late afternoon sun, creating a natural rim light through the hair. The foreground should have a slight bokeh effect on the grass. The mood should be peaceful and natural. Perfectly preserve the subject's identity, face, and body."
  },
  {
    id: 'NgoaiTroi_PhoCoBanDem_v1',
    name: 'Ngoài Trời: Phố Cổ Ban Đêm',
    prompt: "Recreate this image as if the subject is walking through an ancient town street at night. The scene should be illuminated by warm, soft light from red and yellow lanterns, casting gentle shadows. The ground should appear wet, reflecting the lantern lights. The mood should be nostalgic and cinematic. Perfectly preserve the subject's identity, face, and body."
  },
  {
    id: 'NgoaiTroi_NangHeTrongVuon_v1',
    name: 'Ngoài Trời: Nắng Hè Trong Vườn',
    prompt: "Tái tạo lại hình ảnh này với bối cảnh nhà kính trong vườn, tràn ngập cây xanh và hoa pastel. Áp dụng ánh sáng ban ngày khuếch tán, tạo highlight tự nhiên trên da. Chỉnh màu theo tông pastel sống động, da có ánh hồng đào khỏe khoắn. Không khí năng động, tươi trẻ, tràn đầy sức sống mùa hè. Giữ nguyên hoàn hảo nhận dạng, khuôn mặt và cơ thể của chủ thể."
  },
  {
    id: 'NangHoa_v1_enhance',
    name: 'Nàng Hoa: Tinh Chỉnh Vườn Hoa',
    prompt: 'Enhance this image in the style of a romantic cinematic portrait. Keep skin natural with visible softness and realistic highlights. Preserve silk fabric reflections. Enhance flower colors with pastel vibrance without oversaturation. Add a very subtle film grain. Perfectly preserve the subject\'s identity, face, and body.'
  },
  {
    id: 'NoMakeup_Natural_8K',
    name: 'Mặt mộc tự nhiên – 8K',
    prompt: 'Recreate this image as an ultra-photorealistic portrait. The subject should have a bare face with no makeup. Emphasize natural skin texture with visible pores, faint veins, subtle blemishes, and peach fuzz. The lighting should be soft and cinematic with natural shadows, against a neutral blurred background, in the style of an 85mm portrait lens. The identity and composition of the subject must be perfectly preserved.'
  },
  {
    id: 'NoMakeup_Outdoor_8K',
    name: 'Mặt mộc ngoài trời – 8K',
    prompt: 'Recreate this image as a natural daylight portrait. The subject should have a bare face with no makeup, showing authentic skin details like pores, faint imperfections, and peach fuzz, with a slight sheen from sunlight on the skin. Add a gentle breeze effect to the hair. The background should be a soft-focus outdoor scene (sky, trees, or urban) with bokeh, in the style of 85mm outdoor photography. The identity and composition of the subject must be perfectly preserved.'
  },
  {
    id: 'NoMakeup_Studio_8K',
    name: 'Mặt mộc studio – 8K',
    prompt: 'Recreate this image as a studio portrait. The subject should have a bare face with natural skin micro-texture preserved, including visible pores, subtle veins, faint under-eye shadows, and peach fuzz in highlights. Apply studio lighting with a soft key light at a 45° angle, a subtle rim light, against a neutral seamless backdrop. The style should be photorealistic editorial realism with an 85mm portrait look. The identity and composition of the subject must be perfectly preserved.'
  }
];