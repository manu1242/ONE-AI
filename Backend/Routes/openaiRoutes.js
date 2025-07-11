import express from "express";
import { summarizeText, askAI } from "../controllers/openaiController.js";
import { generateImage } from '../controllers/geminiController.js';

const router = express.Router();

router.post("/summarize", summarizeText);

router.post('/image', generateImage );
router.post("/ask", askAI);

export default router;
