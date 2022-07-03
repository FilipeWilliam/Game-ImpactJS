const socket = io('http://localhost:4000');
let currentSocketId;
let allPlayers = [];

socket.on('playerConnected', (socketId) => {
  if(!currentSocketId) {
    currentSocketId = socketId;
  }
});

socket.on('renderCurrentPlayer', (playerList) => {
  allPlayers = playerList;
  let isCurrentPlayerAlreadyLoaded = allPlayers.find(player => player.id === currentSocketId).alreadyLoaded;

  console.log(isAllEntitiesRendered());
  if(!isCurrentPlayerAlreadyLoaded) {
    ig.game.spawnEntity('EntityMeteor', 100, 170, {socketId: currentSocketId});
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

let isAllEntitiesRendered = () => allPlayers.length === ig.game.entities.length;

function addOtherPlayer() {
  let otherPlayer = allPlayers.filter(player => player.id !== currentSocketId);
  ig.game.spawnEntity('EntityMeteor', 100, 170, {socketId: otherPlayer[0].id});
}

function removePlayer(response) {
  console.log(allPlayers)
  console.log(response);
  console.log(ig.game.entities);
  ig.game.entities.find(player => player.socketId === response.playerId).kill();
  // allPlayers = response.playerList;
}