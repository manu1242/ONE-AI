import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import openaiRoutes from "./Routes/openaiRoutes.js";

dotenv.config();

const app = express();

// ✅ Enable CORS with OPTIONS preflight handling
app.use(cors({
  origin: "https://one-gpt-fumbnbdsf-manu1242s-projects.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));

// ✅ Handle preflight OPTIONS requests
app.options("*", cors({
  origin: "https://one-gpt-ai-one.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working Priyaaa");
});

app.use("/api/openai", openaiRoutes);
app.use("/api/gemini", openaiRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB error:", err));

export default app;
