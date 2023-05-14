// Required dependencies
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// App setup
const app = express();
const server = http.Server(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

// Static files
app.use(express.static(__dirname + '/public'));

// Server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Typing game variables
let players = {};
let words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'];
let currentWord = words[Math.floor(Math.random() * words.length)];

// Socket connection
io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);

  // Add new player to game
  players[socket.id] = {
    id: socket.id,
    name: '',
    score: 0
  };

  // Send initial game state to new player
  socket.emit('initial state', {
    players: players,
    currentWord: currentWord
  });

  // Update player name and broadcast to other players
  socket.on('update name', (name) => {
    players[socket.id].name = name;
    socket.broadcast.emit('update players', players);
  });

  // Handle incoming typed words
  socket.on('typed word', (typedWord) => {
    if (typedWord === currentWord) {
      // Increase player score and update current word
      players[socket.id].score++;
      currentWord = words[Math.floor(Math.random() * words.length)];

      // Send updated game state to all players
      io.emit('update game', {
        players: players,
        currentWord: currentWord
      });
    }
  });

  // Remove player from game on disconnect
  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    delete players[socket.id];
    io.emit('update players', players);
  });
});
