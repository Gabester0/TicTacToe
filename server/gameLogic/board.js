const { redisClient } = require('../redis/redis');
const { solutions, emptyBoard } = require('./static')


const initiateBoard = async(game)=>{
    const board = JSON.stringify(emptyBoard)
    await redisClient.setAsync(`${game}.board`, board)
    await redisClient.setAsync(`${game}.player`, `x`)
    await redisClient.setAsync(`${game}.winner`, false)
    await redisClient.setAsync(`${game}.draw`, false)
    await redisClient.setAsync(`${game}.lastMove`, 1)
    await redisClient.setAsync(`${game}.xMoves`, JSON.stringify([]))
    await redisClient.setAsync(`${game}.oMoves`, JSON.stringify([]))
    //     `game.lastWin`, ``, ????
    // await redisClient.setAsync(`${game}.lastWin`, ``)

    // Return everything, Every event emitted will update client data
    return {
      board: emptyBoard,
      player: `x`,
      winner: false,
      draw: false,
      lastMove: null,
      xMoves: [],
      oMoves: []
    }
}

const resetBoard = async(game)=>{
  // If both players select to play again switch and have O go first
  const board = JSON.stringify(emptyBoard)
  await redisClient.setAsync(`${game}.board`, board)
  await redisClient.setAsync(`${game}.player`, `o`)
  await redisClient.setAsync(`${game}.winner`, false)
  await redisClient.setAsync(`${game}.draw`, false)
  await redisClient.setAsync(`${game}.lastMove`, 1)
  await redisClient.setAsync(`${game}.xMoves`, JSON.stringify([]))
  await redisClient.setAsync(`${game}.oMoves`, JSON.stringify([]))
  //     `game.lastWin`, ``, ????
  // await redisClient.setAsync(`${game}.lastWin`, ``)

  // Return everything, Every event emitted will update client data
  return {
    board: emptyBoard,
    player: `x`,
    winner: false,
    draw: false,
    lastMove: null,
    xMoves: [],
    oMoves: []
  }
}

// Store as objects and convert with JSON.stringify before storing in redis and JSON.parse after getting from redis
/*
CLIENT STATE:       CLIENT DATA TYPE    REDIS HASH KEY:             REDIS DATA TYPE
board               Object(String val)  `board.0`, `board.1`, etc.  String
player              String(`x`||`o`)    `game.player`               String(`x`||`o`) (initial `x`)
winner              Boolean             `game.winner`               Boolean
draw                Boolean             `game.draw`                 Boolean
lastWin             Array               `game.lastWin`              String(comma separated values)
lastMove            Integer(Board key)  `moves.last`                String(integer values)
xmoves              Array               `moves.x`                   String(comma separated values)
omoves              Array               `moves.o`                   String(comma separated values)
  */
module.exports = { initiateBoard, resetBoard };