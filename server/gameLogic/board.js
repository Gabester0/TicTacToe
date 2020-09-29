const { solutions, emptyBoard } = require('./static')


const initiateBoard = (redis, id)=>{
    redis.hset(id, "board", emptyBoard)
}
//This isn't going to work
//Board is an object
//Will need to be a hash
//Solutions will need to be a hash with each 3-integer array as a string?

module.exports = initiateBoard;