import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";


export const summarizeText = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: `Summarize this:\n${text}` }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = response.data.candidates[0].content.parts[0].text;
    res.json({ result });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to summarize text" });
  }
};


export const generateImage = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim().length === 0) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt,
        n: 1,
        size: "512x512",
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const imageUrl = response.data.data[0].url;
    res.json({ image: imageUrl });
  } catch (error) {
    console.error("DALL·E Error:", error.response?.data || error.message);
    res.status(500).json({
      error:
        error.response?.data?.error?.message ||
        "Failed to generate image using DALL·E",
    });
  }
};


export const askAI = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = response.data.candidates[0].content.parts[0].text;
    res.json({ result });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
};
