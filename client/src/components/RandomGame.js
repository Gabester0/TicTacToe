import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import useSocket from 'use-socket.io-client';
import Board, { playAudio, highlightWin, resetHighlight } from './board/Board';
import ConfettiCannon from './ConfettiCannon';
import { StaticDiv, StyledH5One, StyledH5Two, Btn, Cannon } from '../AppStyles';
import { delayFunction } from '../utility/utilities';

const RandomGame = (props)=>{
    const [socket] = useSocket('http://localhost:5005/', {autoConnect: false});
    const [ connected, setConnected ] = useState(false)
    const [ ready, setReady ] = useState(false);
    const [ client, setClient ] = useState(false);
    const [ game, setGame ] = useState();
    const [ board, setBoard ] = useState( { ...Array(9).fill(null) } );
    const [ player, setPlayer ] = useState(``)
    const [ lastMove, setLastMove ] =  useState(null)
    const [ xMoves, setXMoves ] = useState([]);
    const [ oMoves, setOMoves ] = useState([]);
    const [ winner, setWinner ] = useState(false);
    const [ draw, setDraw ] = useState(false);
    const [ delay, setDelay ] = useState(false);
    const [ match, setMatch ] = useState([]);
    const [ lastWin, setLastWin ] = useState([]);

    const updateGameState = (gameState)=>{
        setGame(gameState.game)
        setBoard(gameState.board)
        setPlayer(gameState.player)
        setLastMove(gameState.lastMove)
        setXMoves(gameState.xMoves)
        setOMoves(gameState.oMoves)
        setWinner(gameState.winner)
        setDraw(gameState.draw)
        setMatch(gameState.match)
    }

    useEffect( ()=>{
        socket.connect(); // socket = io.connect('http://localhost:5005/');
        socket.on('connection', (socket)=>{
            setConnected(true)
            console.log(`Socket Connected!`, socket.connected)
        })
        socket.on("join", ({note, game, player, status})=>{
            
            if(!status && !client) setClient(player)
            if(status && !client) setClient(player)
            
            console.log("Client is Playing as:  ", player)
            console.log(`Server message: ${note}`, game, player, status)
        })
        
        socket.on("start", (initialGame)=>{
            setReady(true)
            updateGameState(initialGame)
            console.log(`Game ready`)
        })

        socket.on(`clicked`, async (gameState)=>{
            // Handle receiving emitted click from server
            console.log(`Back from the server: `, gameState )
            updateGameState(gameState)
            
        })

        socket.on(`gameOver`, async(gameState)=>{
            updateGameState(gameState)
            highlightWin(gameState.match, setLastWin, lastWin, player);
            delayFunction(1050, playAudio, "popAudio")
            delayFunction(1225, setDelay, !delay)
        })
    }, [])

    const handleClick = (e) =>{
        if(client === player && !winner && !draw){
            playAudio(`clickAudio`, .4);
            console.log(`Emitting click: `, { game, client, click: e.target.id })
            socket.emit(`click`, { game, client, click: e.target.id })
        }
    }

    const handlePlayAgain = ()=>{
        if(winner || draw) socket.emit(`initiatePlayAgain`, { game, client })
    }
    //// Socket on(`clicked`) firing too many times, why?  Firing 3x, 4x, 5x, etc.,
    ////Socket code was set-up in useEffect that was re-running every time (connected, ready, socket, player) were updated
    ////Should only run once on page load
    //// Draw not registering
    //// Current player color is not toggling on player change, stays blue (O)
    //// highlightWin is not changing color either (stays blue: O)
    // Need to resetHighlight on click of Play Again
        //// Play again will trigger client emitting a socket event to server
        // server will invite other player to play again
        // If accepted this will trigger server to call resetBoard() (from server/board.js)
        // This will emit a reset to client which will reset client Boards
    // If one player quits after game need to queue up client for another game (reroute to main menu?)
    
    const confettiAnchorRef = useRef();
    return (
        <> 
            <StaticDiv>
                <StyledH5One draw={draw} winner={winner} player={client}>{`You are player ${client}`}</StyledH5One>
                <StyledH5Two draw={draw} winner={winner} player={(player === "X")}>
                    { ready && (draw ? `The game is a draw, please restart` : !winner ? `Player ${player}'s turn` : `Player ${player} is the winner!`)}
                </StyledH5Two>
            </StaticDiv>
            <Btn onClick={props.menu} >Back to menu</Btn>
            <Btn onClick={handlePlayAgain} >Play Again</Btn>
            <h2>{!ready && `Waiting for second player`}</h2>
            {ready && <Board handleClick={handleClick} board={board} />}
            <Cannon
                show={winner}
                src={require('../static/StubbyCannon.png')} 
                alt="confetti canon"
                ref={confettiAnchorRef} />
        {/* CONFETTI CANNON */}
            {winner && delay && (
                <ConfettiCannon 
                    anchorRef={confettiAnchorRef}
                    dotCount={50}
                    colors={['red', 'green', 'blue', 'yellow']} />
            )}
        </>
    );
}

export default RandomGame;