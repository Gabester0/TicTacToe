const { redisClient } = require('../redis/redis');
const { emptyBoard } = require('./static')


const initiateBoard = async(game)=>{
  const gameStatus = {
    game,
    board: JSON.stringify(emptyBoard),
    player: `X`,
    winner: false,
    draw: false,
    lastMove: ``,
    xMoves: JSON.stringify([]),
    oMoves: JSON.stringify([]),
  }
    // await redisClient.setAsync(`${game}.board`, board)
    // await redisClient.setAsync(`${game}.player`, `X`)
    // await redisClient.setAsync(`${game}.winner`, false)
    // await redisClient.setAsync(`${game}.draw`, false)
    // await redisClient.setAsync(`${game}.lastMove`, ``)
    // await redisClient.setAsync(`${game}.xMoves`, JSON.stringify([]))
    // await redisClient.setAsync(`${game}.oMoves`, JSON.stringify([]))
    
    // Return everything, Every event emitted will update client data
    // return {
    //   game,
    //   board: emptyBoard,
    //   player: `X`,
    //   winner: false,
    //   draw: false,
    //   lastMove: null,
    //   xMoves: [],
    //   oMoves: []
    // }
    await redisClient.setAsync(game, gameStatus)
    return gameStatus
}

module.exports = { initiateBoard };