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

        socket.on(`click`, async (gameState)=>{
            // Handle receiving emitted click from server
            console.log(`Back from the server: `, gameState )
            await updateGameState(gameState)
            
        })

        socket.on(`gameOver`, async(gameState)=>{
            await updateGameState(gameState)
            setMatch([gameState.match])
        })
    }, [connected, setConnected, ready, setReady, socket, player, setPlayer])

    useEffect(()=>{
        if(winner){
            //We need the winning moves from server
            highlightWin(match, setLastWin, lastWin, player);
            delayFunction(1050, playAudio, "popAudio")
            delayFunction(1225, setDelay, !delay)
        }
    }, [winner, setWinner])

    const handleClick = (e) =>{
        if(client === player && !winner && !draw){
            playAudio(`clickAudio`, .4);
            console.log(`Emitting click: `, { game, client, click: e.target.id })
            socket.emit(`click`, { game, client, click: e.target.id })
        }
        ////Click will submit just the player and the square clicked
        ////Server will update gameState and emit to the room
        ////Update Client State immediately and overwrite from server?  Test as is first and then possible implement if annoying lag
        //// Next step handle updating UI from accepted clicks
        //// Wrong client is showing as winner, server error:
        ////     in gamePlay.js player is changed in handleClick function
        ////     Need to checkWinner before changing player
        ////     Abstract changePlayer into its own function and call after checkWinner
        //// Need to ensure no clicks process on client board after a winner (  if(client === player && !winner))
        //// Trigger ConfettiCannon on win
        // Need to highlight win on receiving win from server 
        // Need to resetHighlight on reset
        // If one player quits after game need to queue up client for another game (reroute to main menu?)
    }

    const confettiAnchorRef = useRef();
    return (
        <>
            <StaticDiv>
                <StyledH5One>{`You are player ${client}`}</StyledH5One>
                <StyledH5Two>
                    { ready && (draw ? `The game is a draw, please restart` : !winner ? `Player ${player}'s turn` : `Player ${player} is the winner!`)}
                </StyledH5Two>
            </StaticDiv>
            <Btn >Quit Game</Btn> {/*onClick={quitGame} */}
            <Btn onClick={props.menu} >Back to menu</Btn>
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