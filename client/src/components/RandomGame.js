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

        socket.on(`click`, ({ board, player, winner, draw, lastMove, xMoves, oMoves })=>{
            // Handle receiving emitted click from server
            //board, player, winner, draw, lastMove, xMoves, oMoves
            console.log(`Back from the server: `, board, player, winner, draw, lastMove, xMoves, oMoves)
            //Now update client state
        })
    }, [connected, setConnected, ready, setReady, socket, player, setPlayer])

    useEffect(()=>{
        console.log(client)
    }, [client, setClient])

    const handleClick = (e) =>{
        if(client === player){
            playAudio(`clickAudio`, .4);
            console.log(e.target.id)
            socket.emit(`click`, { game, client, click: e.target.id })
        }
        //Click will submit just the player and the square clicked
        //Server will update gameState and emit to the room
        //Update Client State immediately and overwrite from server?  Test as is first and then possible implement if annoying lag
        // Next step handle updating UI from accepted clicks
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