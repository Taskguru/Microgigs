
import { GoogleGenAI, Modality } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateOptimizedTaskDescription = async (
  rawTitle: string,
  rawInstructions: string
): Promise<string> => {
  const ai = getClient();
  if (!ai) return rawInstructions;

  const prompt = `
    You are an expert copywriter for a micro-task marketplace like SproutGigs. 
    Rewrite the following task description to be clear, professional, and encouraging for workers.
    It should be concise but detail-oriented to ensure workers know exactly what to do to get paid.
    
    Task Title: ${rawTitle}
    Draft Instructions: ${rawInstructions}
    
    Return only the rewritten description text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || rawInstructions;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return rawInstructions;
  }
};

export const detectFraudRisk = async (
  proofText: string
): Promise<{ riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'; reason: string }> => {
  const ai = getClient();
  if (!ai) return { riskLevel: 'LOW', reason: 'AI Unavailable' };

  const prompt = `
    Analyze this task submission proof text for potential spam or fraud.
    Context: A worker is submitting proof for a digital micro-task.
    Proof Text: "${proofText}"
    
    Is this likely a bot or a copy-paste spam?
    Return a JSON object with keys: "riskLevel" (LOW, MEDIUM, HIGH) and "reason".
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    
    const text = response.text;
    if (!text) return { riskLevel: 'LOW', reason: 'No analysis' };
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Fraud Check Error:", error);
    return { riskLevel: 'LOW', reason: 'Error checking fraud' };
  }
};

export const analyzeScreenshot = async (
  base64Image: string,
  taskRequirements: string
): Promise<{ isValid: boolean; confidence: number; feedback: string }> => {
  const ai = getClient();
  if (!ai) return { isValid: true, confidence: 0, feedback: 'AI Unavailable' };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: 'image/png', // Assumed for simplicity
            },
          },
          {
            text: `You are a moderator for a task platform.
            Task Requirements: "${taskRequirements}"
            
            Does this screenshot provide proof that the task was completed according to the requirements?
            Respond with JSON: { "isValid": boolean, "confidence": number (0-100), "feedback": "short explanation" }`
          },
        ],
      },
      config: {
          responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    if (!text) return { isValid: false, confidence: 0, feedback: 'No response' };
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return { isValid: true, confidence: 0, feedback: 'Error analyzing image' };
  }
};
