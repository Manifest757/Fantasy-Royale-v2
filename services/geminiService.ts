
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getPickInsights(teamA: string, teamB: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a very short (2-sentence) professional sports analysis/insight for a fantasy football user choosing between ${teamA} and ${teamB}. Mention recent trends or key player status in a punchy, high-energy style.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "The numbers suggest a close game. Watch the injury report for late-breaking value!";
  }
}
