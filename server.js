import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import router from './routes.js'
import cors from 'cors';

const app = express();
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  transports: ['polling'],
  cors: {
    origin: "*"
  }
});

app.use(express.static('public'));

let playerList = [];
let indexOfSpell = 1;
let currentMatchMinute = 4;
let currentMatchSecond = 0;
let gameStarted = false;
let timer;

io.on("connection", (socket) => {
  console.log(`Conectado ${socket.id}`);
  playerList.push({id: socket.id, alreadyLoaded: false, points: 0});
  io.sockets.emit('playerConnected', socket.id);

  socket.on('gameLoaded', (currentSocketId, charSelected) => {
    playerList.find(player => player.id === currentSocketId).currentChar = charSelected;
    io.sockets.emit('renderCurrentPlayer', playerList, charSelected);
  });

  socket.on('playerLoaded', (socketId) => {
    playerList.find(player => player.id === socketId).alreadyLoaded = true;

    if(playerList.length === 2 && playerList.filter(player => player.alreadyLoaded).length === 2) {
      startTimer();
    };
  })

  socket.on('recieveData', (positionX, positionY, currentAnimation, flipX, health, currentSocketId) => {
    io.sockets.emit('playerMove', positionX, positionY, currentAnimation, flipX, health, currentSocketId);
  });

  socket.on('die', (currentSocketId) => {
    let enemyPlayer = playerList.find(player => player.id !== currentSocketId);
    enemyPlayer.points += 100;
    io.sockets.emit('changePoints', playerList);

    setTimeout(() => {
      io.sockets.emit('respawnPlayer', currentSocketId, playerList);
    }, 3000);
  });

  socket.on('createAttack', (attackProperties, positionY, flipX, attackSettings) => {
    io.sockets.emit('renderSpell', attackProperties, positionY, flipX, attackSettings, indexOfSpell);
    indexOfSpell++;
  })

  socket.on('recieveDataSpell', (positionX, spellId) => {
    io.sockets.emit('spellMove', positionX, spellId);
  });

  socket.on('disconnect', () => {
    playerList = playerList.filter(player => player.id !== socket.id);
    io.sockets.emit('removePlayer', {playerId: socket.id, playerList});
    finishTimer();
  });
});

app.use(express.json());
app.use(cors());
app.use(router);

serverHttp.listen(4000, () => {
  console.log("Tá rodando");
})

function startTimer() {
  gameStarted = true;

    if(currentMatchMinute === 0 && currentMatchSecond === 0) {
      finishTimer();
    } else {
      timer = setInterval(() => {
        handleTimer();
        io.sockets.emit('atualizeTimer', {minute: currentMatchMinute, second: currentMatchSecond});
      }, 1000);
    }

};

function finishTimer() {
  clearInterval(timer);
  currentMatchSecond = 4;
  currentMatchSecond = 0;
  gameStarted = false;
}

function handleTimer() {
  if(currentMatchSecond === 0) {
    if(currentMatchMinute === 0) {
      return;
    }

    currentMatchMinute--;
    currentMatchSecond = 59;
  } else {
    currentMatchSecond--;
  }
}