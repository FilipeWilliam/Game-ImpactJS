const socket = io('http://localhost:4000');
let currentSocketId, otherPlayer;
let allPlayers = [];
let currentChar = 'EntitySamurai';

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
});

socket.on('removePlayer', (response) => {
  removePlayer(response);
});

socket.on('playerMove', (positionX, positionY, currentAnimation, flipX, currentSocketId) => {
  if(otherPlayer) {
    let enemy = ig.game.entities.find(player => player.socketId === currentSocketId);
    enemy.pos.x = positionX;
    enemy.pos.y = positionY;
    enemy.enemyAnimation = currentAnimation;
    enemy.enemyFlip = flipX;
  }
});

socket.on('renderSpell', (attackProperties, positionY, flipX, attackSettings, spellId) => {
  ig.game.spawnEntity('EntitySpell', attackProperties.positionX, positionY, {spellId, ...attackSettings});

  let spell = ig.game.entities.find(spell => spell.spellId === spellId);
  spell.vel.x = attackProperties.attackVel;
  if(spell.currentAnim) {
    spell.currentAnim.flip.x = flipX;
  }
})

socket.on('spellMove', (positionX, spellId) => {
  let spell = ig.game.entities.find(spell => spell.spellId === spellId);
  spell.pos.x = positionX;
});

let isAllEntitiesRendered = () => allPlayers.length === ig.game.entities.length;

function addOtherPlayer() {
  otherPlayer = allPlayers.filter(player => player.id !== currentSocketId)[0];
  ig.game.spawnEntity('EntitySamurai', 100, 170, {socketId: otherPlayer.id});
}

function removePlayer(response) {
  ig.game.entities.find(player => player.socketId === response.playerId).kill();
  allPlayers = response.playerList;
}