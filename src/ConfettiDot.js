import React from 'react';
import styled from 'styled-components';
import { animated, config, useSpring } from 'react-spring';

const StyledConfettiDot = styled.svg`
    position: absolute;
    will-change: transform;
`;

const AnimatedConfettiDot = animated(StyledConfettiDot);

const Dot = () => {

    const { upwards } = useSpring({
        config: config.default,
        from: { upwards: 100 },
        to: { upwards: 0 },
    });
    
    const { y } = useSpring({
        config: config.default,
        from: { y: 0 },
        to: { y: -50 }
    });
    return (
        <AnimatedConfettiDot style={{
            transform: y.interpolate(yValue => `translate3d(0, ${yValue}px, 0)`)
        }} >
            <circle cx="5" cy="5" r="5" fill="blue"/>
        </AnimatedConfettiDot>
    )
}

export default Dot;