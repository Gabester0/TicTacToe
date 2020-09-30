const { solutions, emptyBoard } = require('./static')


const initiateBoard = (redis, id)=>{
    for(let i = 0; i < 9; i++){
        redis.hset(id, `board.${i}`, `null`)
        console.log(`Set Hash Key board.${i} and Value null in Redis`)
    }
}


module.exports = {initiateBoard};