const { RedisClient } = require("redis");

const findGame = (redis, socketID)=>{
    redis.hgetall(`games`, (err, val)=>{
        if(err) return console.log(`There was a problem getting existing games`, err)
        //If value from hgetall(`games`) === null there are no games so we create a new game with gameNumber 1
        if(val === null) createGame(redis, socketID, 1)
        //Logic to sort existing games here

        redis.hgetall(`games`, (err, val)=> console.log(val))

        //First existing game with `${gameNumber}` === false add current player is a game with only 1 player
            //Need to make sure checking games in order of creation (I don't think redis hashes ensure creation order is maintained)
        
        //If no existing games have only 1 player, need to create game

        //Need to return gameNumber so Can be stored by clients
    })
    //Need to return gameNumber so Can be stored by clients
}

const createGame = (redis, socketID, gameNumber)=>{
    console.log(`Creating a Game (Not really yet)`)
    console.log(`first player: `, socketID)
    //games hash contains all existing games.  Each existing game will have:
    // key: gameNumber, value: Boolean (representing if game ready or not)
    // key: gamenumber.p1, value: socketID of this players connection
    const p1Key = `${gameNumber}.p1`
    redis.hmset(`games`, `${gameNumber}`, false, p1Key, socketID); // hmset() is command to set multiple values
    redis.hgetall(gameNumber, (err, val)=> console.log(val))
}


   //Need a way to store 2 socket connections under 1 key that will identify both clients in 1 game
        //Each client in the game needs to store the hashname and send it with server requests
   //Can use redisClient.hgetall( hashname ) to get all values in a hash (see ln 47)

module.exports = { findGame, createGame };