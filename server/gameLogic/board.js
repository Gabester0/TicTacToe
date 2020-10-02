const { solutions, emptyBoard } = require('./static')


const initiateBoard = (redis, id)=>{
    for(let i = 0; i < 9; i++){
        redis.hset(id, `board.${i}`, `null`)
        console.log(`Set Hash Key board.${i} and Value null in Redis`)
    }
    redis.hmset(id, 
        `game.player`,`x`,
        `game.winner`, false,
        `game.draw`, false,
        `game.lastWin`, ``,
        `moves.last`, 1,
        `moves.x`, ``,
        `moves.o`, ``
    );
}

//cHANGE BOARD TO A SINGLE STRING OF COMMA SEPARATED VALUES?
/*
CLIENT STATE:       CLIENT DATA TYPE    REDIS HASH KEY:             REDIS DATA TYPE
board               Object(String val)  `board.0`, `board.1`, etc.  String
player              String(`x`||`o`)    `game.player`               String(`x`||`o`)
winner              Boolean             `game.winner`               Boolean
draw                Boolean             `game.draw`                 Boolean
lastWin             Array               `game.lastWin`              String(comma separated values)
lastMove            Integer(Board key)  `moves.last`                String(integer values)
xmoves              Array               `moves.x`                   String(comma separated values)
omoves              Array               `moves.o`                   String(comma separated values)
  */
module.exports = {initiateBoard};