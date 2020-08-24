import React, { useEffect } from 'react';
import styled from 'styled-components';
import { animated, config, useSpring, interpolate } from 'react-spring';

const StyledConfettiDot = styled.svg`
    position: absolute;
    will-change: transform;
`;

const AnimatedConfettiDot = animated(StyledConfettiDot);

const alignWithAnchor = anchorRef =>{
    if(anchorRef.current == null){
        return {
            initialX: 0,
            initialY: 0,
        }
    }

    return {
        initialX: -37.5,
        initialY: -15,
    }
}

const Dot = ({anchorRef}) => {
    const { initialX, initialY } = alignWithAnchor(anchorRef);

    const { horizontal, upwards } = useSpring({
        config: config.default,
        from: {
          horizontal: 200,
          upwards: 300
        },
        to: {
          horizontal: 0,
          upwards: 0
        }
      });

    let totalHorizontal = 0;
    let totalUpwards = 0;
    const startTime = new Date().getTime() / 1000;
    let lastTime = startTime;
    const gravityPerSecond = 30;

    return (
        <AnimatedConfettiDot style={{
            transform: interpolate([upwards, horizontal], (v,h) => {
                const currentTime = new Date().getTime() / 1000;
                const duration = currentTime - lastTime;
                const totalDuration = currentTime - startTime;
                const verticalTraveled = v * duration;
                const horizontalTraveled = h * duration;
                totalUpwards += verticalTraveled;
                totalHorizontal += horizontalTraveled;
                lastTime = currentTime;
                const totalGravity = gravityPerSecond * totalDuration;
                const finalX = initialX + totalHorizontal;
                const finalY = initialY - totalUpwards + totalGravity;
                return `translate3d(${finalX}px, ${finalY}px, 0)`;
            })
        }} >
            <circle cx="5" cy="5" r="5" fill="blue"/>
        </AnimatedConfettiDot>
    )
}

export default Dot;