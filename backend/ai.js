const express = require('express');
const router = express.Router();
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

// POST /api/ai/generate
router.post('/generate', async (req, res) => {
  const { code, framework } = req.body;

  if (!code || !framework) {
    return res.status(400).json({ error: "Code and framework fields are required." });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Create the prompt for Gemini
    const prompt = `You are an expert in software testing. Write comprehensive unit test cases in "${framework}" for the following code:\n\n${code}\n\nOutput only the test code.`;

    // Use the Gemini Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ testcase: text });
  } catch (error) {
    // Print the actual error for debugging
    console.error("Gemini API error:", error?.response?.data || error.message || error);
    res.status(500).json({ error: "Failed to generate test cases with Gemini AI." });
  }
});

module.exports = router;
