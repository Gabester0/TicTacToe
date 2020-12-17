import React from 'react';
import { Centered, MenuBtn, StyledH4 } from './MenuStyles';

const Menu = (props)=>{
    return (
        <Centered>
            <StyledH4>Play a local game</StyledH4>
            <MenuBtn onClick={props.localGame} >Local Game</MenuBtn>
            <StyledH4>Play a random opponent</StyledH4>
            <MenuBtn onClick={props.randomGame} >Random Opponent</MenuBtn>
        </Centered>
    )
}

export default Menu;