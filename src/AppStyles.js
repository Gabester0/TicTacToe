import styled from 'styled-components';

export const AppDiv = styled.div`
    text-align: center;
    color: #390040;
`;

export const StaticDiv = styled.div`
    margin: 0;
    height: 60px;
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
`;

export const StyledH5 = styled.h5`
    margin: 0;
    font-size: ${ props => (props.winner || props.draw) ? "30px" : "20px" };
    transition: all .4s;
    color: ${ props =>
        props.draw ?
            "#390040" :
                props.player ?
                    "#bd0000" :
                        "#4464AD"
    }
    `;

export const Btn = styled.button`
    color: #390040;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 20px; 
    border: 2px solid #390040;
    border-radius: 8px;
    padding: 10px 20px;
    background-color: #F0EFF4;
    box-shadow: 0 0 0 1px white;
    &:focus{
        outline: none;
        box-shadow: 0 0 0 1px blue;
    }
`;

export const Cannon = styled.img`
    width: auto;
    height: 100px;
    transition: all 1s;
    opacity: ${props => props.show ? 1 : 0};
    margin: 10px auto;
    color: #390040;
`;
// Color Scheme: #F0EFF4 #05A8AA #390040 #4464AD #E55934