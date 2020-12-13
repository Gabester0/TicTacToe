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

    //Add a check to ensure current player has less than or equal to the number of moves of the other player
    const currentPlayerMoves = client === `X` ? xMoves : oMoves;
    const otherPlayerMoves =  client === `X` ? oMoves : xMoves
    if(currentPlayerMoves.length <= otherPlayerMoves.length){
        const curr = parseInt(click);
        console.log(`This is a dumb test`)
        if(board[curr] === null && !winner){
            await redisClient.setAsync(`${game}.lastMove`, curr)
            const updatedBoard = { ...board, [curr]: client }
            const updatedBoardJSON = JSON.stringify(updatedBoard)
            await redisClient.setAsync(`${game}.board`, updatedBoardJSON)
            
            // Update player
            const player = client === `X` ? `O` : `X`;
            await redisClient.setAsync(`${game}.player`, player)

            // Update draw
            const draw = oMoves + xMoves === 9;
            if(draw) await redisClient.setAsync(`${game}.draw`, draw)

            if(client === "X"){
                const updatedXMoves = [...xMoves, curr]
                const updatedXMovesJSON = JSON.stringify(updatedXMoves)
                await redisClient.setAsync(`${game}.xMoves`, updatedXMovesJSON)
                return { board: updatedBoard, xMoves: updatedXMoves, oMoves, lastMove: curr, player, draw }
            } else {
                const updatedOMoves = [...oMoves, curr]
                const updatedOMovesJSON = JSON.stringify(updatedOMoves)
                await redisClient.setAsync(`${game}.oMoves`, updatedOMovesJSON)
                return { board: updatedBoard, xMoves, oMoves: updatedOMoves, lastMove: curr, player, draw }
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
            // highlightWin(match, setLastWin, lastWin, player);
            // delayFunction(1050, playAudio, "popAudio")
            // delayFunction(1225, setDelay, !delay)
            await redisClient.setAsync(`${game}.winner`, true)
            return true
        }
    }
    return false;
}
                
module.exports = { handleClick, checkWinner }