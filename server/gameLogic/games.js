const { redisClient } = require('../redis/redis');

// games hash map is just going to be game numbers with the value false when the first socket connects
// and becoming true when the second connects.

//If socket connects and createGame is called that connection is player 1/X
//If socket connects and findGame finds a game that connection is player 2/O

//Status is how the clients know if they are X or O:
//    IF client gets this message and the status is false, client is player X, client stores this information to local state 
//    ELSE client stores to local state they are player O
let noGames = true;

const findGame = async (socket, io)=>{
   if(noGames){    //Handle Creating First Game
      noGames = false
      await redisClient.setAsync('games', 1)
      await redisClient.setAsync(`1.status`, false) //Set A Game status of false because only one player has joined
      socket.join(`1`)
      io.to(`1`).emit("join", {game: 1, player: `X`, status: false, note: `This is game #${1} and player X has joined the game.  Waiting for a second player`}) //Communicate to first client Game number and player (X)

   }else {    //Handle adding second player, or creating additional games

      const games = await redisClient.getAsync('games').then((games)=> games);
      console.log(games)
      console.log(await redisClient.getAsync('1.status'))
      const latestGame = games.split('')[games.length - 1]
      const latestGameStatus = await redisClient.getAsync(`${latestGame}.status`)

      if(latestGameStatus === `false`){    //Add Player to existing Game

         await redisClient.setAsync(`${latestGame}.status`, true)
         socket.join(`${latestGame}`)
         io.to(`${latestGame}`).emit("join", {game: latestGame, player: `O`, status: true, note: `This is game #${latestGame} and player O has joined the game.  Ready to play`}) //Communicate to second player Game number and player (O)

      } else {    //Handle creating new games after the first new game
         
         const newGame = parseInt(latestGame) + 1
         await redisClient.setAsync('games', `${games}${newGame}`)
         await redisClient.setAsync(`${newGame}.status`, false) //Set A Game status of false because only one player has joined
         socket.join(`${newGame}`)
         io.to(`${newGame}`).emit("join", {game: newGame, player: `X`, status: false, note: `This is game #${newGame} and player X has joined the game.  Waiting for a second player`}) //Communicate to first client Game number and player (X)
      }
   }
}

module.exports = { findGame };