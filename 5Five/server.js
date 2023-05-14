const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const words = require('./words.json');

const players = {};

let currentWord = '';

// Generate a new random word for the game
function generateWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Set the current word to a new random word
function setNewWord() {
  currentWord = generateWord();
  io.emit('update game', { players, currentWord });
}

// Handle new player connections
function handleNewPlayer(socket) {
  // Assign a random name to the player
  const defaultName = `Player${Math.floor(Math.random() * 1000)}`;
  players[socket.id] = { name: defaultName, score: 0 };

  // Send initial game state to the new player
  socket.emit('initial state', { players, currentWord });

  // Send updated player list to all players
  io.emit('update players', players);

  // Handle player name updates
  socket.on('update name', (name) => {
    players[socket.id].name = name || defaultName;
    io.emit('update players', players);
  });

  // Handle typed word submissions
  socket.on('typed word', (typedWord) => {
    if (typedWord === currentWord) {
      players[socket.id].score += currentWord.length;
      setNewWord();
    }
    io.emit('update game', { players, currentWord });
  });

  // Remove player from game on disconnect
  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('update players', players);
  });
}

// Set up the server
app.use(express.static('public'));

io.on('connection', (socket) => {
  handleNewPlayer(socket);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
