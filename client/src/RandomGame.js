import React, { useEffect, useState, useRef } from 'react';
import useSocket from 'use-socket.io-client';
import Board, { playAudio, highlightWin, resetHighlight } from './components/board/Board';
import ConfettiCannon from './components/confettiCannon/ConfettiCannon';
import { StaticDiv, StyledH5One, StyledH5Two, Btn, Cannon, Sound } from './AppStyles';
import { delayFunction } from './utility/utilities';

const volumeSVG = require('./static/volume.svg');
const muteSVG = require('./static/mute.svg');

const RandomGame = (props)=>{
    const [ socket ] = useSocket(process.env.REACT_APP_SERVER_URL, {autoConnect: false});

    const [ ready, setReady ] = useState(false);
    const [ client, setClient ] = useState();
    const [ game, setGame ] = useState();
    const [ board, setBoard ] = useState( { ...Array(9).fill(null) } );
    const [ player, setPlayer ] = useState(``)
    const [ winner, setWinner ] = useState(false);
    const [ draw, setDraw ] = useState(false);
    const [ delay, setDelay ] = useState(false);
    const [ lastWin, setLastWin ] = useState([]);
    const [ quit, setQuit ] = useState(false);

    //Store users sound setting in sessionStorage
    const existingSound = sessionStorage.getItem('sound')
    const value = existingSound ? existingSound : true
    sessionStorage.setItem('sound', value)

    const updateGameState = (gameState)=>{
        setGame(gameState.game)
        setBoard(gameState.board)
        setPlayer(gameState.player)
        setDraw(gameState.draw)
        setWinner(gameState.winner)
    }

    useEffect( ()=>{
        socket.connect();

        socket.on('connection', (socket)=>{
            console.log(`Socket Connected!`, socket.connected)
        })

        socket.on("join", ({note, game, player, status})=>{
            setClient(player)
            sessionStorage.setItem('client', player)
            console.log(`Updated client to ${player}`)
            setGame(game)
            console.log("Client is Playing as:  ", player)
            console.log(`Server message: ${note}`, game, player, status)
        })
        
        socket.on("start", (initialGame)=>{
            setReady(true)
            updateGameState(initialGame)
            console.log(`Game ready`)
        })
    }, [])


    useEffect(()=>{
        socket.on(`clicked`, (gameState)=>{
            // Handle receiving emitted click from server
            console.log(`Back from the server: `, gameState )
            updateGameState(gameState)
        })

        socket.on(`gameOver`, (gameState)=>{
            updateGameState(gameState)
            console.log(gameState)
            if(gameState.winner){
                highlightWin(gameState.match, setLastWin, lastWin, gameState.player);
                //&& player === client
                const client = sessionStorage.getItem('client')
                if( gameState.player === client ){
                    delayFunction(1225, setDelay, true)
                    const sound = sessionStorage.getItem('sound')
                    if(sound === 'true'){
                        delayFunction(1050, playAudio, "popAudio")
                    }
                }
            }
        })

        socket.on(`quit`, ()=>{
            console.log(`The other player has quit`)
            setReady(false)
            setQuit(true)
            sessionStorage.removeItem('client')
        })

        //Ensures this only runs once when game value has been set
        if(typeof game === `number`){
            window.addEventListener('beforeunload', ()=> socket.emit(`quit`, {game}) )
            document.getElementById('menu').addEventListener('click', ()=>{
                sessionStorage.removeItem('client')
                socket.emit(`quit`, {game})
            })
        }

        return ()=>{
            window.removeEventListener('beforeunload', ()=> socket.emit(`quit`, {game}) )
            document.getElementById('menu').removeEventListener('click', ()=> socket.emit(`quit`, {game}) )
        }
    }, [game, client])

    const handleClick = (e) =>{
        if(client === player && !winner && !draw){
            const sound = sessionStorage.getItem('sound');
            if(sound === 'true') playAudio(`clickAudio`, .4);
            console.log(`Emitting click: `, { game, client, click: e.target.id })
            socket.emit(`click`, { game, client, click: e.target.id })
        }
    }

    const handlePlayAgain = ()=>{
        const resetGameState = {game: ``, board: { ...Array(9).fill(null) }, player: ``, lastMove: null, xMoves: [], oMoves: [], winner: false, draw: false, match: [] }
        updateGameState(resetGameState)
        setReady(false)
        setQuit(false)
        setDelay(false)
        setGame(``)
        if(lastWin.length >= 1) resetHighlight(lastWin[lastWin.length - 1])
        console.log(`Initiating another game`)
        socket.emit(`initiatePlayAgain`, { game, client })
        setClient(false)
        sessionStorage.removeItem('client')
    }

    const toggleSound = ()=>{
        const sound = sessionStorage.getItem('sound');
        const newSound = sound === 'true' ? `false` : `true`;
        sessionStorage.setItem('sound', newSound)
        document.getElementById('soundSVG').src = newSound === 'true' ? volumeSVG : muteSVG
    }

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
            {(winner || draw || quit) && <Btn onClick={handlePlayAgain} >Play Again</Btn>}
            <Btn id="sound" onClick={toggleSound}><Sound id="soundSVG" alt="sound" src={sessionStorage.getItem('sound') === 'true' ? volumeSVG : muteSVG}/></Btn>
            <h2>{!ready && !quit && `Waiting for second player`}</h2>
            <h2>{quit && `The other player left the game`}</h2>
            {ready && <Board handleClick={handleClick} board={board} />}
            <Cannon
                show={ winner && player === client }
                src={require('./static/StubbyCannon.png')} 
                alt="confetti canon"
                ref={confettiAnchorRef} />
            {winner && player === client && delay && (
                <ConfettiCannon 
                    anchorRef={confettiAnchorRef}
                    dotCount={50}
                    colors={['red', 'green', 'blue', 'yellow']} />
            )}
        </>
    );
}

export default RandomGame;