const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // dossier avec index.html, css, js

io.on("connection", (socket) => {
  console.log("✅ Un utilisateur est connecté");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // envoie le message à tous
  });

  socket.on("disconnect", () => {
    console.log("❌ Un utilisateur s'est déconnecté");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
