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
        let gameNumber = 0;
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
            gameNumber = game
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
            highlightWin(gameState.match, setLastWin, lastWin, gameState.player);
            delayFunction(1050, playAudio, "popAudio")
            delayFunction(1225, setDelay, !delay)
        })

        socket.on(`quit`, ({game})=>{
            console.log(`The other player has quit`)
            //? Handle communicating this to client and Triggering new game
            //Show 'The other player left the game' and the back to menu button?
        })

        window.addEventListener('beforeunload', ()=> socket.emit(`quit`, {game: gameNumber}) )
        document.getElementById('menu').addEventListener('click', ()=> socket.emit(`quit`, {game: gameNumber}) )
        
        return ()=>{
            window.removeEventListener('beforeunload', ()=> socket.emit(`quit`, {game: gameNumber}) )
            document.getElementById('menu').removeEventListener('click', ()=> socket.emit(`quit`, {game: gameNumber}) )
        }
    }, [])

    const handleClick = (e) =>{
        if(client === player && !winner && !draw){
            playAudio(`clickAudio`, .4);
            console.log(`Emitting click: `, { game, client, click: e.target.id })
            socket.emit(`click`, { game, client, click: e.target.id })
        }
    }

    const handlePlayAgain = ()=>{
        setReady(false)
        const resetGameState = {game: ``, board: { ...Array(9).fill(null) }, player: ``, lastMove: null, xMoves: [], oMoves: [], winner: false, draw: false, match: [] }
        updateGameState(resetGameState)
        setDelay(false)
        setGame(``)
        if(lastWin.length >= 1) resetHighlight(lastWin[lastWin.length - 1])
        console.log(`Initiating another game`)
        socket.emit(`initiatePlayAgain`, { game, client })
    }
    // If player-X quits mid-game need to queue up player-O for another game (reroute to main menu?)
    //      If player-X clicks back to menu and (!draw && !winner) emit quitGame event
    //      Or if player-X closes window?  Can I listen for this?
    //      Server removes player-X from room
    //      Server notifies player-O client
    //      Player-O client shows notification from server and routes player-O back to menu
    // Add button to enable/disable sound effects
    // Handle losing UI

    // function quit(){
    //     socket.emit(`quit`, { game, client })
    // }
    
    const confettiAnchorRef = useRef();
    return (
        <> 
            <StaticDiv>
                <StyledH5One draw={draw} winner={winner} player={client}>{`You are player ${client}`}</StyledH5One>
                <StyledH5Two draw={draw} winner={winner} player={(player === "X")}>
                    { ready && (draw ? `The game is a draw` : !winner ? `Player ${player}'s turn` : `Player ${player} is the winner!`)}
                </StyledH5Two>
            </StaticDiv>
            <Btn id="menu" onClick={props.menu} >Back to menu</Btn>
            {(winner || draw) && <Btn onClick={handlePlayAgain} >Play Again</Btn>}
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