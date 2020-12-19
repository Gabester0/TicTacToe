const { redisClient } = require('../redis/redis');

let noGames = true;

const findGame = async (socket, io)=>{
   if(noGames){    //Handle Creating First Game
      noGames = false
      const games = JSON.stringify([1]);
      await redisClient.setAsync('games', games)
      await redisClient.setAsync(`1.status`, false) //Set A Game status of false because only one player has joined
      socket.join(`1`)
      // io.to(`1`).emit("join", {game: 1, player: `X`, status: false, note: `This is game #${1} and player X has joined the game.  Waiting for a second player`}) //Communicate to first client Game number and player (X)
      socket.emit("join", {game: 1, player: `X`, status: false, note: `This is game #${1} and player X has joined the game.  Waiting for a second player`}) //Communicate to first client Game number and player (X)
      return { game: 1, status: false }
   }else {    //Handle adding second player, or creating additional games

      const gamesJSON = await redisClient.getAsync('games');
      const games = JSON.parse(gamesJSON);
      console.log(games)
      const latestGame = games[games.length - 1]
      const latestGameStatus = await redisClient.getAsync(`${latestGame}.status`)

      if(latestGameStatus === `false`){    //Add Player to existing Game

         socket.join(`${latestGame}`)
         await redisClient.setAsync(`${latestGame}.status`, true)
         socket.emit("join", {game: latestGame, player: `O`, status: true, note: `This is game #${latestGame} and player O has joined the game.  Ready to play`}) //Communicate to second player Game number and player (O)
         return { game: latestGame, status: true }

      } else {    //Handle creating new games after the first new game

         const newGame = parseInt(latestGame) + 1
         const updatedGames = [ ...games, newGame]
         const updatedGamesJSON = JSON.stringify(updatedGames)
         await redisClient.setAsync('games', updatedGamesJSON)
         await redisClient.setAsync(`${newGame}.status`, false) //Set A Game status of false because only one player has joined
         socket.join(`${newGame}`)
         // io.to(`${newGame}`).emit("join", {game: newGame, player: `X`, status: false, note: `This is game #${newGame} and player X has joined the game.  Waiting for a second player`}) //Communicate to first client Game number and player (X)
         socket.emit("join", {game: newGame, player: `X`, status: false, note: `This is game #${newGame} and player X has joined the game.  Waiting for a second player`}) //Communicate to first client Game number and player (X)
         return { game: newGame, status: false }
      }
   }
}

module.exports = { findGame };