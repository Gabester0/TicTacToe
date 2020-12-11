const { redisClient } = require('../redis/redis');

const handleClick = async (game, client, click)=>{
    // Get board from Redis
    const boardJSON = await redisClient.getAsync(`${game}.board`)
    const board = JSON.parse(boardJSON)
    // Get winner from Redis
    const winnerJSON = await redisClient.getAsync(`${game}.winner`)
    const winner = JSON.parse(winnerJSON)
    // Get xMoves from Redis
    const xMovesJSON = await redisClient.getAsync(`${game}.xMoves`)
    const xMoves = JSON.parse(xMovesJSON)
    // Get oMoves from Redis
    const oMovesJSON = await redisClient.getAsync(`${game}.oMoves`)
    const oMoves = JSON.parse(oMovesJSON)

    //Add a check to see if xMoves and oMoves are off by more than 1, if so return, else the rest of the function

    if(xMoves.length === oMoves.length){
        const curr = parseInt(click);
        if(board[curr] === null && !winner){
            await redisClient.setAsync(`${game}.lastMove`, curr)
            const updatedBoard = { ...board, [curr]: client }
            const updatedBoardJSON = JSON.stringify(updatedBoard)
            await redisClient.setAsync(`${game}.board`, updatedBoardJSON)

            if(client === "X"){
                const updatedXMoves = [...xMoves, curr]
                const updatedXMovesJSON = JSON.stringify(updatedXMoves)
                await redisClient.setAsync(`${game}.xMoves`, updatedXMovesJSON)
                return { updatedBoard, updatedXMoves }
            } else {
                const updatedOMoves = [...oMoves, curr]
                const updatedOMovesJSON = JSON.stringify(updatedOMoves)
                await redisClient.setAsync(`${game}.oMoves`, updatedOMovesJSON)
                return { updatedBoard, updatedOMoves }
            }
        }
    }
}

const checkWinner = async ()=>{

/*    const checkWinner = () =>{
        const currentMoves = (player === "X") ? xmoves : omoves;
        if(currentMoves.length < 3) return false;
        for(let i =  0; i < solutions.length; i++){
            let match = currentMoves.filter((e)=> solutions[i].includes(e));
            if( match.length === 3 ){
                highlightWin(match, setLastWin, lastWin, player);
                delayFunction(1050, playAudio, "popAudio")
                delayFunction(1225, setDelay, !delay)
                return true
            }
        }
        return false;
    }*/
}
                
module.exports = { handleClick, checkWinner }