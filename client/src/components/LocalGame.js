import React, { useState, useEffect, useRef } from 'react';
import Board, { playAudio, highlightWin, resetHighlight } from './board/Board';
import ConfettiCannon from './ConfettiCannon';
import { StaticDiv, StyledH5Two, Btn, Cannon } from '../AppStyles';
import { delayFunction } from '../utility/utilities';

const LocalGame = (props)=> {
    const [player, setPlayer] = useState("X");
    const [board, setBoard] = useState( { ...Array(9).fill(null) } ); //server
    const [lastMove, setlastMove] = useState();
    const [xmoves, setXMoves] = useState([]);
    const [omoves, setOMoves] = useState([]);
    const [winner, setWinner] = useState(false);
    const [draw, setDraw] = useState(false);
    const [lastWin, setLastWin] = useState([]);
    const [delay, setDelay] = useState(false);
    const solutions = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];  //server

    useEffect( ()=>{
        const win = checkWinner();
        if(win) return setWinner(true);
        if(xmoves.length + omoves.length === 9) return setDraw(true);
        if(xmoves.length +omoves.length >= 1) setPlayer( (player) => player === "X" ? "O" : "X") //Conditional logic keeps extra render from toggling player before first move
    }, [board, xmoves, omoves]);

    const handleClick = (e)=>{
        const curr = parseInt(e.target.id);
        if(board[curr] === null && !winner){
            setlastMove(curr);
            playAudio(`clickAudio`, .4);
            setBoard({
                ...board,
                [curr]: player
            })
            player === "X" ? setXMoves ([...xmoves, curr]) : setOMoves([...omoves, curr]);
        }
    }

    const checkWinner = () =>{
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
    }

    const resetBoard = () => {
        setPlayer("X");
        setBoard( { ...Array(9).fill(null) } );
        setXMoves([]);
        setOMoves([]);
        setWinner(false);
        setDraw(false);
        if(lastWin.length >= 1) resetHighlight(lastWin[lastWin.length - 1]);
        setDelay(false)
    }

    const confettiAnchorRef = useRef();

    return (
        <>
            <StaticDiv>
                <StyledH5Two draw={draw} winner={winner} player={(player === "X")}>
                {  draw ? `The game is a draw, please restart` : !winner ? `Current Player: ${player}` : `Player ${player} is the winner!`}
                </StyledH5Two>
            </StaticDiv>
            <Btn onClick={resetBoard}>{ winner || draw ? `Play again` : `Reset game`}</Btn>
            <Btn onClick={props.menu}>Back to menu</Btn>
            <Board handleClick={handleClick} board={board} />
            <Cannon
                show={winner}
                src={require('../static/StubbyCannon.png')} 
                alt="confetti canon"
                ref={confettiAnchorRef} />
            {winner && delay && (
                <ConfettiCannon 
                    anchorRef={confettiAnchorRef}
                    dotCount={50}
                    colors={['red', 'green', 'blue', 'yellow']} />
            )}
        </>
    );
}

export default LocalGame;