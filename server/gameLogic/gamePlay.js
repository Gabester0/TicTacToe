const { redisClient } = require('../redis/redis');
const { solutions } = require('../gameLogic/static')

const handleClick = async (game, client, click)=>{
    const gameStateJSON = await redisClient.getAsync(`${game}`)
    const gameState = JSON.parse(gameStateJSON)
    // // Get board from Redis
    // const boardJSON = await redisClient.getAsync(`${game}.board`)
    // const board = JSON.parse(boardJSON)
    // console.log(board)
    // // Get winner from Redis
    // const winnerJSON = await redisClient.getAsync(`${game}.winner`)
    // const winner = JSON.parse(winnerJSON)
    // // Get xMoves from Redis
    // const xMovesJSON = await redisClient.getAsync(`${game}.xMoves`)
    // const xMoves = JSON.parse(xMovesJSON)
    // // Get oMoves from Redis
    // const oMovesJSON = await redisClient.getAsync(`${game}.oMoves`)
    // const oMoves = JSON.parse(oMovesJSON)

    const currentPlayerMoves = client === `X` ? gameState.xMoves : gameState.oMoves;
    const otherPlayerMoves =  client === `X` ? gameState.oMoves : gameState.xMoves
    //Add a check to ensure current player has less than or equal to the number of moves of the other player
    if(currentPlayerMoves.length <= otherPlayerMoves.length){
        const curr = parseInt(click);
        if(gameState.board[curr] === null && !gameState.winner){
            await redisClient.setAsync(`${game}.lastMove`, curr)
            const updatedBoard = { ...gameState.board, [curr]: client }
            const updatedBoardJSON = JSON.stringify(updatedBoard)
            await redisClient.setAsync(`${game}.board`, updatedBoardJSON)

            if(client === "X"){
                const updatedXMoves = [...xMoves, curr]
                const updatedXMovesJSON = JSON.stringify(updatedXMoves)
                await redisClient.setAsync(`${game}.xMoves`, updatedXMovesJSON)
                return { board: updatedBoard, xMoves: updatedXMoves, oMoves, lastMove: curr }
            } else {
                const updatedOMoves = [...oMoves, curr]
                const updatedOMovesJSON = JSON.stringify(updatedOMoves)
                await redisClient.setAsync(`${game}.oMoves`, updatedOMovesJSON)
                return { board: updatedBoard, xMoves, oMoves: updatedOMoves, lastMove: curr }
            }
        }
    }
}

const checkWinner = async (game, currentMoves, xMoves, oMoves)=>{
    // Update draw
    const draw = oMoves.length + xMoves.length === 9;
    console.log(`Draw: `, draw)
    if(draw){
        await redisClient.setAsync(`${game}.draw`, draw)
        return {winner: false, match: [], draw };
    } else {
        // currentMoves (xMoves or oMoves), 
        if(currentMoves.length < 3) return false
        for(let i =  0; i < solutions.length; i++){
            let match = currentMoves.filter((e)=> solutions[i].includes(e));
            if( match.length === 3 ){
                await redisClient.setAsync(`${game}.winner`, true)
                return { winner: true, match, draw }
            }
        }
        return {winner: false, match: [], draw };
    }
}

const changeTurn = async (client, game)=>{
    // Update player
    const player = client === `X` ? `O` : `X`;
    await redisClient.setAsync(`${game}.player`, player)
    return player
}

module.exports = { handleClick, checkWinner, changeTurn }