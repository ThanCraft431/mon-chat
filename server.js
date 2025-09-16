const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public")); // dossier avec frontend

io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté");

  // Quand un utilisateur envoie un message
  socket.on("chat message", (msg) => {
    // On envoie le message à tous les utilisateurs connectés
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
