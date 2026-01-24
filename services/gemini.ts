
import { GoogleGenAI } from "@google/genai";

export const getFightAnalysis = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    You are the "CFC AI Fight Analyst". 
    Your tone is professional, high-energy, and analytical, similar to a veteran MMA commentator.
    Use Mixed Martial Arts terminology (e.g., "ground and pound", "sprawl", "checking kicks", "southpaw vs orthodox").
    Provide a breakdown of matchups, likely win paths, and technical keys to victory.
    If asked about specific fighters not in your list, give general MMA advice.
    Keep responses concise and formatted for a modern UI.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The analyst is currently warming up in the locker room. Please try again in a moment.";
  }
};
