import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import useSocket from 'use-socket.io-client';
import Board, { playAudio, highlightWin, resetHighlight } from './board/Board';
import ConfettiCannon from './ConfettiCannon';
import { StaticDiv, StyledH5, Btn, Cannon } from '../AppStyles';
import { delayFunction } from '../utility/utilities';

const RandomGame = (props)=>{
    const [socket] = useSocket('http://localhost:5005/', {autoConnect: false});

    const [ connected, setConnected ] = useState(false)
    const [ ready, setReady ] = useState(false);
    const [ board, setBoard ] = useState( { ...Array(9).fill(null) } ); //server
    const [ player, setPlayer ] = useState(``)
    const [ lastMove, setLastMove ] =  useState(null)
    const [ xMoves, setXMoves ] = useState([]);
    const [ oMoves, setOMoves ] = useState([]);
    const [ winner, setWinner ] = useState(false);
    const [ draw, setDraw ] = useState(false);
    const [ delay, setDelay ] = useState(false);

    const updateGameState = (gameState)=>{
        setBoard(gameState.board)
        setPlayer(gameState.player)
        setLastMove(gameState.lastMove)
        setXMoves(gameState.xMoves)
        setOMoves(gameState.oMoves)
        setWinner(gameState.winner)
        setDraw(gameState.draw)
    }

    useEffect( ()=>{
        socket.connect(); // socket = io.connect('http://localhost:5005/');
        socket.on('connection', (socket)=>{
            setConnected(true)
            console.log(`Socket Connected!`, socket.connected)
        })
        socket.on("join", ({note, game, player, status})=>{
            if(status) setReady(true)
            console.log(`Server message: ${note}`, game, player, status)
        })

        socket.on("start", (initialGame)=>{
            updateGameState(initialGame)
        })
    }, [connected, setConnected, ready, setReady, socket, player, setPlayer])

    const handleClick = () =>{
        socket.emit(`click`, { board, player, lastMove, xMoves, oMoves, winner, draw })
        // Still need to store which player is playing on client side
        // Need to display that on the client side
        // Need to disable the board when not one players turn
        //Click will submit just the player and the square clicked
        //Server will update gameState and emit to the room
    }

    const confettiAnchorRef = useRef();
    return (
        <>
            <StaticDiv>
                <StyledH5 >{/*draw={draw} winner={winner} player={(player === "X")} */}
                {  draw ? `The game is a draw, please restart` : !winner ? `Current Player: ${player}` : `Player ${player} is the winner!`}
                </StyledH5>
            </StaticDiv>
            <Btn >Quit Game</Btn> {/*onClick={quitGame} */}
            <Btn onClick={props.menu} >Back to menu</Btn>
            <h2>{!ready && `Waiting for second player`}</h2>
            {ready && <Board handleClick={handleClick} board={board} />}
            <Cannon
                show={false} //winner
                src={require('../static/StubbyCannon.png')} 
                alt="confetti canon"
                ref={confettiAnchorRef} />
{/* CONFETTI CANNON */}
            {/* {winner && delay && (
                <ConfettiCannon 
                    anchorRef={confettiAnchorRef}
                    dotCount={50}
                    colors={['red', 'green', 'blue', 'yellow']} />
            )} */}
        </>
    );
}

export default RandomGame;