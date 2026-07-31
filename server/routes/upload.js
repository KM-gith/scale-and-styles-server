import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Cloudinary storage — audio files bar-dhaabbaatti (permanent) kaawwata
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "faarfannoota-audio",
    resource_type: "video", // Cloudinary audio files "video" jalatti bulcha
    allowed_formats: ["mp3", "wav", "ogg"],
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp3"];
  if (allowed.includes(file.mimetype) || file.originalname.match(/\.(mp3|wav|ogg)$/i)) {
    cb(null, true);
  } else {
    cb(new Error("Audio files qofa (MP3, WAV, OGG)."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

// POST /api/upload/audio — admin qofa
router.post("/audio", protect, adminOnly, upload.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File hin argamne." });
  }
  res.json({
    message: "Upload milkaa'e!",
    audioUrl: req.file.path, // Cloudinary secure URL — bar-dhaabbaa (kallattiin banama)
    filename: req.file.filename,
    size: req.file.size,
  });
});

export default router;
