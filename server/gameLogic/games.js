const { redisClient, RedisStore } = require('../redis/redis');

// games hash map is just going to be game numbers with the value false when the first socket connects
// and becoming true when the second connects.

//If socket connects and createGame is called that connection is player 1/X
//If socket connects and findGame finds a game that connection is player 2/O

//Need to research and understand socket.io rooms.  The IDs for a socket can change so the rooms will
//how games are tracked?  Or it will just be the ids created on teh server side (game# + p1 || X)


const findAllGames = async ()=>{
   const games = await redis.getAsync(`games`, (err, res)=>{
      if(err) return err
      console.log(res, ` Here are all games from findAllGames()`)
      return res;
   })
   if(games !== 'nil') return games.split(',')
   return games
}


const findGame = async (socket, io)=>{
   const games = await redisClient.getAsync(`games`).then(res=> res );
   //Handle Creating First Game
   if(games === null){
      await redisClient.setAsync('games', 1)
      await redisClient.setAsync(`1.status`, false) //Set A Game status of false because only one player has joined
      socket.join(`1`)
      //Status is how the clients know if they are X or O:
      //    IF client gets this message and the status is false, client is player X, client stores this information to local state 
      //    ELSE client stores to local state they are player O
      io.to(`1`).emit("join", {game: 1, player: `X`, status: false, note: `This is game #${1} and player X has joined the game.  Waiting for a second player`}) //Communicate to first client Game number and player (X)
   //Handle adding second player, or creating additional games
   }else {
      const latestGame = games.split('')[games.length - 1]
      const latestGameStatus = await redisClient.getAsync(`${latestGame}.status`)
      //Add Player to existing Game
      if(latestGameStatus === `false`){
         await redisClient.setAsync(`${latestGame}.status`, true)
         socket.join(`${latestGame}`)
         io.to(`${latestGame}`).emit("join", {game: latestGame, player: `O`, status: true, note: `This is game #${latestGame} and player O has joined the game.  Ready to play`}) //Communicate to second player Game number and player (O)
      //Handle creating new games after the first new game
      } else {
         const newGame = parseInt(latestGame) + 1
         await redisClient.setAsync('games', `${games}${newGame}`)
         await redisClient.setAsync(`${newGame}.status`, false) //Set A Game status of false because only one player has joined
         socket.join(`${newGame}`)
         io.to(`${newGame}`).emit("join", {game: newGame, player: `X`, status: false, note: `This is game #${newGame} and player X has joined the game.  Waiting for a second player`}) //Communicate to first client Game number and player (X)
      }
   }
}



const createGame = ()=>{

}



// const findGame = (redis, socketID)=>{
//     redis.hgetall(`games`, (err, val)=>{
//         if(err) return console.log(`There was a problem getting existing games, Ln. 5`, err)
//         //If value from hgetall(`games`) === null there are no games so we create a new game with gameNumber 1
//         if(val === null) return createGame(redis, socketID, 1)
//         //Logic to sort existing games here
//         //Get all games

//             const keys = Object.keys(val).filter( key=> key.split(`.`)[1] === `status`)
//             console.log(keys, ` From Ln. 15 of findGame`)
//             let newKey = 0;
//             let added = false
//             keys.map( async (key, i)=>{
//                 //check if key status is false ? then add connecting player as second player and return
//                 const viableGame = await redis.hmget(`games`, key, async (err, val)=>{       //?Does this need to be async?
//                     if(err) return console.log(`Error getting current games value.  From Ln. 20`)
//                     if(val[0] === `false`){
//                         added = true;
//                         console.log(key, val[0], i, socketID, ` From Ln. 22`) 
//                         redis.hmset(`games`, key, true, `${i + 1}.p2`, socketID); // hmset() is command to set multiple values
//                         return true
//                       //  redis.hmget(`games`, key, `${i + 1}.p1`, `${i + 1}.p2`, (err, val)=> console.log(val, ` From Ln. 24`))
//                     }
//                 })
//                 console.log(viableGame, `${i} times the charm`)
//                 if(viableGame) return true
//                 //Track game numbers as loop through in variable outside of forEach
//                 newKey = i + 2;
//             })
//             if(!added){
//                 //If no existing games have only 1 player, need to create game
//                 console.log(` newKey from Ln. 34 `, newKey)
//                 createGame(redis, socketID, newKey);
//             }

//             //! PROBLEM !//
//             //When 1st 2 players connect simultaneously, 1st player triggers findGame which checks for existing game, finds none, line
//             //7 triggers createGame with game# 1.  Second player triggers findGame so quickly that the first game has not been set yet
//             //Second player finds nothing and also triggers createGame with game#1 (line 7) overwriting who is player 1 of game#1
//         })


//         //First existing game with `${gameNumber}` === false add current player is a game with only 1 player
//             //Need to make sure checking games in order of creation (I don't think redis hashes ensure creation order is maintained)
//     //Need to return gameNumber so Can be stored by clients
// }

// const createGame = (redis, socketID, gameNumber)=>{
//     //games hash contains all existing games.  Each existing game will have:
//     // key: gameNumber, value: Boolean (representing if game ready or not)
//     // key: gamenumber.p1, value: socketID of this players connection
//     redis.hmset(`games`, `${gameNumber}.status`, false, `${gameNumber}.p1`, socketID, `${gameNumber}.p2`, ``); // hmset() is command to set multiple values
//     redis.hmget(`games`, `${gameNumber}.status`, `${gameNumber}.p1`, `${gameNumber}.p2`, (err, val)=> console.log(`Game #${gameNumber} created: `, val, ` From Ln. 56`))
// }


   //Need a way to store 2 socket connections under 1 key that will identify both clients in 1 game
        //Each client in the game needs to store the hashname and send it with server requests
   //Can use redisClient.hgetall( hashname ) to get all values in a hash (see ln 47)

module.exports = { findGame, createGame };