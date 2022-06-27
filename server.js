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
  io.sockets.emit('playerConnected', playerList, socket.id);
});

io.on('initializePlayer', (socket) => {
  playerList.push(socket.id);
  io.sockets.emit('playerConnected', playerList, socket.id);
})

serverHttp.listen(4000, () => {
  console.log("Tá rodando");
})
