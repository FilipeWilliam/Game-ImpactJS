const socket = io('http://localhost:4000');
let currentSocketId, otherPlayer;
let allPlayers = [];
let currentChar = '';
let currentMatchMinute = 4;
let currentMatchSecond = 0;
let isMatchFinished = false;
let currentPoint = 0;
let enemyPoint = 0;

socket.on('playerConnected', (socketId) => {
  if(!currentSocketId) {
    currentSocketId = socketId;
  }
});

socket.on('renderCurrentPlayer', (playerList, charSelected) => {
  allPlayers = playerList;
  let isCurrentPlayerAlreadyLoaded = allPlayers.find(player => player.id === currentSocketId).alreadyLoaded;

  if(!isCurrentPlayerAlreadyLoaded) {
    ig.game.spawnEntity(charSelected, 100, 170, {socketId: currentSocketId });
    socket.emit('playerLoaded', currentSocketId);

    if(!isAllEntitiesRendered()) {
      addOtherPlayer();
    }

  } else if (!isAllEntitiesRendered()) {
    addOtherPlayer();
  }

  setPlayersPoints();
});

socket.on('removePlayer', (response) => {
  removePlayer(response);
});

socket.on('playerMove', (positionX, positionY, currentAnimation, flipX, health, currentSocketId, points) => {
  if(otherPlayer) {
    let enemy = ig.game.entities.find(player => player.socketId === currentSocketId);
    enemy.pos.x = positionX;
    enemy.pos.y = positionY;
    enemy.enemyAnimation = currentAnimation;
    enemy.health = health;
    enemy.enemyFlip = flipX;
  }
});

socket.on('respawnPlayer', (socketId, playerList) => {
  let playerIsInGame = ig.game.entities.find(player => player.socketId === socketId);
  let charToRevive = playerList.find(player => player.id === socketId).currentChar;

  if(!playerIsInGame) {
    ig.game.spawnEntity(charToRevive, 100, 170, { socketId });
  }
});

socket.on('changePoints', (playerList) => {
  allPlayers = playerList;
  setPlayersPoints();
});

socket.on('atualizeTimer', (timer) => {
  currentMatchMinute = timer.minute;
  currentMatchSecond = timer.second;
  if(currentMatchMinute === 0 && currentMatchSecond === 0) {
    isMatchFinished = true;
    console.log(app.finishMatch(currentPoint, enemyPoint));
  }
});

socket.on('renderSpell', (attackProperties, positionY, flipX, attackSettings, spellId, spellEntity) => {
  ig.game.spawnEntity(spellEntity, attackProperties.positionX, positionY, {spellId, ...attackSettings});

  let spell = ig.game.entities.find(spell => spell.spellId === spellId);
  spell.vel.x = attackProperties.attackVel;
  if(spell.currentAnim) {
    spell.currentAnim.flip.x = flipX;
  }
});

socket.on('spellMove', (positionX, spellId) => {
  let spell = ig.game.entities.find(spell => spell.spellId === spellId);
  spell.pos.x = positionX;
});

let isAllEntitiesRendered = () => allPlayers.length === ig.game.entities.length;

function addOtherPlayer() {
  otherPlayer = allPlayers.filter(player => player.id !== currentSocketId)[0];
  ig.game.spawnEntity(otherPlayer.currentChar , 100, 170, {socketId: otherPlayer.id});
}

function removePlayer(response) {
  ig.game.entities.find(player => player.socketId === response.playerId).kill();
  allPlayers = response.playerList;
}

function setPlayersPoints() {
  let currentPlayer = allPlayers.find(player => player.id === currentSocketId);
  let enemyPlayer = allPlayers.find(player => player.id !== currentSocketId)

  currentPoint = currentPlayer.points;
  enemyPoint = enemyPlayer.points;
}