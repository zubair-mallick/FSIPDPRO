import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import dotenv from 'dotenv';
import { responseSchemaCareerRecommendations } from '../schemas/responseSchemaCareerRecommendations.js';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.key);

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  safetySettings,
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: responseSchemaCareerRecommendations,
  }
});

export const getCareerRecommendations = async (req, res) => {
  try {
    const { frontendinput } = req.body;
    if(!frontendinput){
      res.status(401).json({ error: "give frontend input" });
    }

    const prompt = `Based on the following knowledge and interests: ${frontendinput} , recommend suitable career options and explain why each career is a good fit.`;

    let result = await model.generateContent(prompt);
    let careerRecommendations =  result.response.text(); // Await the result properly
    // console.log(careerRecommendations)
    res.json(JSON.parse(careerRecommendations));
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
