const { RedisClient } = require("redis");

const findGame = (redis, socketID)=>{
    redis.hgetall(`games`, (err, val)=>{
        if(err) return console.log(`There was a problem getting existing games, Ln. 5`, err)
        //If value from hgetall(`games`) === null there are no games so we create a new game with gameNumber 1
        if(val === null) return createGame(redis, socketID, 1)
        //Logic to sort existing games here
        //Get all games

            const keys = Object.keys(val).filter( key=> key.split(`.`)[1] === `status`)
            console.log(keys, ` From Ln. 15 of findGame`)
            let newKey = 0;
            let added = false
            keys.map( async (key, i)=>{
                //check if key status is false ? then add connecting player as second player and return
                const viableGame = await redis.hmget(`games`, key, async (err, val)=>{       //?Does this need to be async?
                    if(err) return console.log(`Error getting current games value.  From Ln. 20`)
                    if(val[0] === `false`){
                        added = true;
                        console.log(key, val[0], i, socketID, ` From Ln. 22`) 
                        redis.hmset(`games`, key, true, `${i + 1}.p2`, socketID); // hmset() is command to set multiple values
                        return true
                      //  redis.hmget(`games`, key, `${i + 1}.p1`, `${i + 1}.p2`, (err, val)=> console.log(val, ` From Ln. 24`))
                    }
                })
                console.log(viableGame, `${i} times the charm`)
                if(viableGame) return true
                //Track game numbers as loop through in variable outside of forEach
                newKey = i + 2;
            })
            if(!added){
                //If no existing games have only 1 player, need to create game
                console.log(` newKey from Ln. 34 `, newKey)
                createGame(redis, socketID, newKey);
            }

            //! PROBLEM !//
            //When 1st 2 players connect simultaneously, 1st player triggers findGame which checks for existing game, finds none, line
            //7 triggers createGame with game# 1.  Second player triggers findGame so quickly that the first game has not been set yet
            //Second player finds nothing and also triggers createGame with game#1 (line 7) overwriting who is player 1 of game#1
        })


        //First existing game with `${gameNumber}` === false add current player is a game with only 1 player
            //Need to make sure checking games in order of creation (I don't think redis hashes ensure creation order is maintained)
    //Need to return gameNumber so Can be stored by clients
}

const createGame = (redis, socketID, gameNumber)=>{
    //games hash contains all existing games.  Each existing game will have:
    // key: gameNumber, value: Boolean (representing if game ready or not)
    // key: gamenumber.p1, value: socketID of this players connection
    redis.hmset(`games`, `${gameNumber}.status`, false, `${gameNumber}.p1`, socketID, `${gameNumber}.p2`, ``); // hmset() is command to set multiple values
    redis.hmget(`games`, `${gameNumber}.status`, `${gameNumber}.p1`, `${gameNumber}.p2`, (err, val)=> console.log(`Game #${gameNumber} created: `, val, ` From Ln. 56`))
}


   //Need a way to store 2 socket connections under 1 key that will identify both clients in 1 game
        //Each client in the game needs to store the hashname and send it with server requests
   //Can use redisClient.hgetall( hashname ) to get all values in a hash (see ln 47)

module.exports = { findGame, createGame };