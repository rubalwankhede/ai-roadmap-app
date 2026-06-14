import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateRoadmap(name, domain, level, year) {
  const prompt = `
    Create a personalized learning roadmap for:
    - Name: ${name}
    - Domain: ${domain}
    - Level: ${level}
    - Current year of study: ${year}

    Return ONLY a JSON array like this, no extra text:
    [
      { "step": 1, "title": "Topic Name", "description": "What to learn", "duration": "X weeks" },
      { "step": 2, "title": "Topic Name", "description": "What to learn", "duration": "X weeks" }
    ]
    Give 8-10 steps total.
  `;

  const result = await geminiModel.generateContent(prompt);
  const text = result.response.text();
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}