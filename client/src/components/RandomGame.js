import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import useSocket from 'use-socket.io-client';
import Board, { playAudio, highlightWin, resetHighlight } from './board/Board';
import ConfettiCannon from './ConfettiCannon';
import { StaticDiv, StyledH5, Btn, Cannon } from '../AppStyles';
import { delayFunction } from '../utility/utilities';

const RandomGame = (props)=>{
    const [ready, setReady] = useState(false);
    const [board, setBoard] = useState( { ...Array(9).fill(null) } ); //server
    const [socket] = useSocket('http://localhost:5005/', {autoConnect: false});
    useEffect( ()=>{
        socket.connect(); // socket = io.connect('http://localhost:5005/');
        socket.on('connection', (socket)=> console.log(`Socket Connected!`, socket.connected) )
        socket.on("join", ({note, game, player, status})=> console.log(`Server message: ${note}`, game, player, status) )
    }, [])
    
    // useEffect(()=>{
    //     socket.emit(`click`, {clicked: lastMove, player: player, id: socket.id})
    // }, [lastMove])

    const handleClick = () =>{
        console.log(`click`)
    }

    const confettiAnchorRef = useRef();
    return (
        <>
            <StaticDiv>
                <StyledH5 >{/*draw={draw} winner={winner} player={(player === "X")} */}
                {/* {  draw ? `The game is a draw, please restart` : !winner ? `Current Player: ${player}` : `Player ${player} is the winner!`} */}
                    Current Player Shows Here
                </StyledH5>
            </StaticDiv>
            <Btn >Quit Game</Btn> {/*onClick={quitGame} */}
            <Btn >Back to menu</Btn>{/*onClick={props.menu} */}
            <Board handleClick={handleClick} board={board} />
            <Cannon
                // show={winner}
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