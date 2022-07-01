const socket = io('http://localhost:4000');
let currentSocketId;
let allPlayers = [];

socket.on('playerConnected', (socketId) => {
  currentSocketId = socketId;
});

socket.on('renderCurrentPlayer', (playerList) => {
  allPlayers = playerList;
  ig.game.spawnEntity('EntityMeteor', 100, 170, {socketId: currentSocketId});
});
