// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware pour autoriser les requêtes cross-origin
app.use(cors());
app.use(express.json());

// Récupérer les variables d'environnement
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "PRIVATE_ACCESS_TOKEN";
const VIDEO_URL = process.env.VIDEO_URL || "https://path_to_your_video_stream.m3u8";

// Route pour vérifier l'authentification de l'utilisateur
app.post("/api/login", (req, res) => {
  const { accessToken } = req.body;

  if (accessToken === ACCESS_TOKEN) {
    res.json({ success: true, message: "Authentification réussie" });
  } else {
    res.status(401).json({ success: false, message: "Accès refusé" });
  }
});

// Route pour récupérer l'URL du flux vidéo
app.get("/api/video-url", (req, res) => {
  res.json({ videoUrl: VIDEO_URL });
});

// Lancer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
