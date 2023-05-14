const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Store connected clients
let clients = {};

io.on('connection', (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Store client information
  clients[socket.id] = {
    name: `Player${Object.keys(clients).length+1}`,
    score: 0
  };

  // Emit connected clients to all clients
  io.emit('clients', clients);

  // Emit client info to connected client
  socket.emit('client-info', clients[socket.id]);

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected`);
    delete clients[socket.id];
    io.emit('clients', clients);
  });

  // Handle typing event
  socket.on('typing', (text) => {
    if (text === 'start') {
      // Start game
      io.emit('start');
    } else {
      // Update score
      clients[socket.id].score++;
      io.emit('score', clients);
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
