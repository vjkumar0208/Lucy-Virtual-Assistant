let apiKey="AIzaSyCfMocl0x-yZyn6Lqg0TbxyKpf4faJwr98"

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 40,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
      const chatSession = model.startChat({
          generationConfig,
          history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      return result.response.text();
  } catch (error) {
      console.error("Error in Gemini API call:", error); // Log API errors
      throw error; // Rethrow the error to handle it upstream
  }
}

export default run;