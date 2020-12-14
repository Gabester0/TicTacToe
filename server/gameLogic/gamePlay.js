const { redisClient } = require('../redis/redis');
const { solutions } = require('../gameLogic/static')

const handleClick = async (game, client, click)=>{
    // Get board from Redis
    const boardJSON = await redisClient.getAsync(`${game}.board`)
    const board = JSON.parse(boardJSON)
    console.log(board)
    // Get winner from Redis
    const winnerJSON = await redisClient.getAsync(`${game}.winner`)
    const winner = JSON.parse(winnerJSON)
    // Get xMoves from Redis
    const xMovesJSON = await redisClient.getAsync(`${game}.xMoves`)
    const xMoves = JSON.parse(xMovesJSON)
    // Get oMoves from Redis
    const oMovesJSON = await redisClient.getAsync(`${game}.oMoves`)
    const oMoves = JSON.parse(oMovesJSON)

    const currentPlayerMoves = client === `X` ? xMoves : oMoves;
    const otherPlayerMoves =  client === `X` ? oMoves : xMoves
    //Add a check to ensure current player has less than or equal to the number of moves of the other player
    if(currentPlayerMoves.length <= otherPlayerMoves.length){
        const curr = parseInt(click);
        if(board[curr] === null && !winner){
            await redisClient.setAsync(`${game}.lastMove`, curr)
            const updatedBoard = { ...board, [curr]: client }
            const updatedBoardJSON = JSON.stringify(updatedBoard)
            await redisClient.setAsync(`${game}.board`, updatedBoardJSON)

            // Update draw
            const draw = oMoves + xMoves === 9;
            if(draw) await redisClient.setAsync(`${game}.draw`, draw)

            if(client === "X"){
                const updatedXMoves = [...xMoves, curr]
                const updatedXMovesJSON = JSON.stringify(updatedXMoves)
                await redisClient.setAsync(`${game}.xMoves`, updatedXMovesJSON)
                return { board: updatedBoard, xMoves: updatedXMoves, oMoves, lastMove: curr, draw }
            } else {
                const updatedOMoves = [...oMoves, curr]
                const updatedOMovesJSON = JSON.stringify(updatedOMoves)
                await redisClient.setAsync(`${game}.oMoves`, updatedOMovesJSON)
                return { board: updatedBoard, xMoves, oMoves: updatedOMoves, lastMove: curr, draw }
            }
        }
    }
}

const checkWinner = async (game, currentMoves)=>{
// currentMoves (xMoves or oMoves), 
    if(currentMoves.length < 3) return false
    for(let i =  0; i < solutions.length; i++){
        let match = currentMoves.filter((e)=> solutions[i].includes(e));
        if( match.length === 3 ){
            await redisClient.setAsync(`${game}.winner`, true)
            return { winner: true, match}
        }
    }
    return {winner: false, match: []};
}

const changeTurn = async (client, game)=>{
    // Update player
    const player = client === `X` ? `O` : `X`;
    await redisClient.setAsync(`${game}.player`, player)
    return player
}

module.exports = { handleClick, checkWinner, changeTurn }