import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

const app = express();
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});

app.use(express.static('public'));

let playerList = [];
let indexOfSpell = 1;

io.on("connection", (socket) => {
  console.log(`Conectado ${socket.id}`);
  playerList.push({id: socket.id, alreadyLoaded: false});
  io.sockets.emit('playerConnected', socket.id);

  socket.on('gameLoaded', (currentSocketId, charSelected) => {
    playerList.find(player => player.id === currentSocketId).currentChar = charSelected;
    io.sockets.emit('renderCurrentPlayer', playerList, charSelected);
  });

  socket.on('playerLoaded', (socketId) => {
    playerList.find(player => player.id === socketId).alreadyLoaded = true;
  })

  socket.on('recieveData', (positionX, positionY, currentAnimation, flipX, currentSocketId) => {
    io.sockets.emit('playerMove', positionX, positionY, currentAnimation, flipX, currentSocketId);
  })

  
  socket.on('createAttack', (attackProperties, positionY, flipX, attackSettings) => {
    io.sockets.emit('renderSpell', attackProperties, positionY, flipX, attackSettings, indexOfSpell);
    indexOfSpell++;
  })

  socket.on('recieveDataSpell', (positionX, spellId) => {
    io.sockets.emit('spellMove', positionX, spellId);
  })

  socket.on('disconnect', () => {
    playerList = playerList.filter(player => player.id !== socket.id);
    io.sockets.emit('removePlayer', {playerId: socket.id, playerList});
  })
});

serverHttp.listen(4000, () => {
  console.log("Tá rodando");
})
