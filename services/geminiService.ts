import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// The API key is automatically injected into process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface EditImageResult {
  imageUrl: string | null;
  error?: string;
}

/**
 * Edits an image based on a text prompt using Gemini 2.5 Flash Image.
 * @param base64Image The base64 encoded image string (including data URI scheme).
 * @param prompt The text prompt describing the edit.
 * @returns The edited image as a base64 string or an error.
 */
export const editImageWithGemini = async (base64Image: string, prompt: string): Promise<EditImageResult> => {
  try {
    // Strip the data URI prefix if present to get just the base64 data
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const mimeType = base64Image.match(/^data:(image\/\w+);base64,/)?.[1] || "image/jpeg";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    let generatedImageUrl: string | null = null;

    if (response.candidates && response.candidates.length > 0) {
        const parts = response.candidates[0].content.parts;
        for (const part of parts) {
            if (part.inlineData) {
                generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
                break;
            }
        }
    }

    if (!generatedImageUrl) {
      return { imageUrl: null, error: "No image generated. Please try a different prompt." };
    }

    return { imageUrl: generatedImageUrl };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return { imageUrl: null, error: error.message || "Failed to process image." };
  }
};