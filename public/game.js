const socket = io('http://localhost:4000');

socket.on('playerConnected', (playerList, socketId) => {
  console.log(playerList);
  // for(let player of playerList) {
  //   console.log(playerList)
  //   if(player !== socketId) {
  //     ig.game.spawnEntity('EntityMeteor', 100, 200);
  //   }
  // }
});
