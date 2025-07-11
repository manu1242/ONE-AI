import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

export const generateImage = async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = ai.getGenerativeModel({
      model: 'gemini-2.0-flash-exp-image-generation',
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    const result = await model.generateContent(prompt);
    const parts = result.response.candidates[0].content.parts;

    const base64 = parts.find(p => p.inlineData)?.inlineData?.data;
    if (!base64) throw new Error("No image found in response");

    res.json({ image: `data:image/png;base64,${base64}` });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Image generation failed" });
  }
};
