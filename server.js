const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// On sert les fichiers du dossier "public"
app.use(express.static("public"));

// Quand un utilisateur se connecte
io.on("connection", (socket) => {
  console.log("✅ Un utilisateur est connecté");

  // Quand un utilisateur envoie un message
  socket.on("chat message", (msg) => {
    console.log("💬 Message reçu :", msg);
    // On renvoie à tout le monde
    io.emit("chat message", msg);
  });

  // Quand un utilisateur se déconnecte
  socket.on("disconnect", () => {
    console.log("❌ Un utilisateur s'est déconnecté");
  });
});

// Render fournit le port via process.env.PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
