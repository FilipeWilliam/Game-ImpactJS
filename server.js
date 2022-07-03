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

io.on("connection", socket => {
  console.log(`Conectado ${socket.id}`);
  playerList.push({id: socket.id, alreadyLoaded: false});
  io.sockets.emit('playerConnected', socket.id);

  socket.on('gameLoaded', () => {
    io.sockets.emit('renderCurrentPlayer', playerList);
  });

  socket.on('playerLoaded', (socketId) => {
    playerList.find(player => player.id === socketId).alreadyLoaded = true;
  })

  socket.on('disconnect', () => {
    playerList = playerList.filter(player => player.id !== socket.id);
    io.sockets.emit('removePlayer', {playerId: socket.id, playerList});
  })
});

serverHttp.listen(4000, () => {
  console.log("Tá rodando");
})
