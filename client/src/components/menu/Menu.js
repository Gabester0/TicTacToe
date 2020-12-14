import React from 'react';
import { Centered, MenuBtn } from './MenuStyles';

const Menu = (props)=>{
    return (
        <Centered>
            <h3>Play a game with someone who is with you and share the mouse, or just play against yourself!</h3>
            <MenuBtn onClick={props.localGame} >Share the Mouse</MenuBtn>
            <h3>Play against another random human</h3>
            <MenuBtn onClick={props.randomGame} >Play against a random human</MenuBtn>
        </Centered>
    )
}

export default Menu;