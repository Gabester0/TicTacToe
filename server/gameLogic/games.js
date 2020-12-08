// const { RedisClient, RedisStore } = require('../redis/redis');

// games hash map is just going to be game numbers with the value false when the first socket connects
// and becoming true when the second connects.

//If socket connects and createGame is called that connection is player 1/X
//If socket connects and findGame finds a game that connection is player 2/O

//Status is how the clients know if they are X or O:
//    IF client gets this message and the status is false, client is player X, client stores this information to local state 
//    ELSE client stores to local state they are player O

const findGame = async (socket, io, RedisClient)=>{
   const games = await RedisClient.getAsync(`games`).then(res=> console.log(res) );
   //Handle Creating First Game
   if(games === null){
      await RedisClient.setAsync('games', 1)
      await RedisClient.setAsync(`1.status`, false) //Set A Game status of false because only one player has joined
      socket.join(`1`)
      io.to(`1`).emit("join", {game: 1, player: `X`, status: false, note: `This is game #${1} and player X has joined the game.  Waiting for a second player`}) //Communicate to first client Game number and player (X)
   //Handle adding second player, or creating additional games
   }else {
      const latestGame = games.split('')[games.length - 1]
      const latestGameStatus = await RedisClient.getAsync(`${latestGame}.status`)
      //Add Player to existing Game
      if(latestGameStatus === `false`){
         await RedisClient.setAsync(`${latestGame}.status`, true)
         socket.join(`${latestGame}`)
         io.to(`${latestGame}`).emit("join", {game: latestGame, player: `O`, status: true, note: `This is game #${latestGame} and player O has joined the game.  Ready to play`}) //Communicate to second player Game number and player (O)
      //Handle creating new games after the first new game
      } else {
         const newGame = parseInt(latestGame) + 1
         await RedisClient.setAsync('games', `${games}${newGame}`)
         await RedisClient.setAsync(`${newGame}.status`, false) //Set A Game status of false because only one player has joined
         socket.join(`${newGame}`)
         io.to(`${newGame}`).emit("join", {game: newGame, player: `X`, status: false, note: `This is game #${newGame} and player X has joined the game.  Waiting for a second player`}) //Communicate to first client Game number and player (X)
      }
   }
}

module.exports = { findGame };