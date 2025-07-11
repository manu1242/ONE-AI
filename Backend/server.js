import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import openaiRoutes from "./Routes/openaiRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://one-gpt-fumbnbdsf-manu1242s-projects.vercel.app",
  "https://one-gpt-ai-one.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working Priyaaa");
});

app.use("/api/openai", openaiRoutes);
app.use("/api/gemini", openaiRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB error:", err));

export default app;
