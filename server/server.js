import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import scaleRoutes from "./routes/scales.js";
import styleRoutes from "./routes/styles.js";
import songRoutes from "./routes/songs.js";
import uploadRoutes from "./routes/upload.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: 'https://scale-and-styles-dv7h.vercel.app',
  credentials: true
}));
app.use(express.json());

// Static files — audio files serve godhu
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/scales", scaleRoutes);
app.use("/api/styles", styleRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/upload", uploadRoutes);

// MongoDB connect — IPv4 dirqama + timeout gabaabaa
// (Railway keessatti IPv6 rakkoo silent hang uumuu waan dandeessisuuf)
mongoose
  .connect(process.env.MONGO_URI, {
    family: 4, // IPv4 qofa fayyadami
    serverSelectionTimeoutMS: 10000, // sekondii 10 booda dhiisi (dogoggora ariitiin argisiisi)
  })
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
