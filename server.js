const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// servir fichiers statiques (place client.html dans /public)
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('client connecté', socket.id);

  // rejoindre une "room" simple
  socket.on('join', (room) => {
    socket.join(room);
    socket.to(room).emit('peer-joined', socket.id);
    console.log(`${socket.id} joined ${room}`);
  });

  // forwarder les messages de signalisation (offer, answer, ice)
  socket.on('signal', ({ to, data }) => {
    io.to(to).emit('signal', { from: socket.id, data });
  });

  // chat simple dans la room
  socket.on('chat', ({ room, message, username }) => {
    io.to(room).emit('chat', { from: socket.id, username, message, time: Date.now() });
  });

  socket.on('disconnect', () => {
    console.log('client déconnecté', socket.id);
    // opc: informer les autres
    io.emit('peer-left', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('Server listening on', PORT);
});
