import styled, { css } from 'styled-components'

export const MouseStyle = styled.div`
    background-color: transparent;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    border: 2px solid black;
    transform: translate(-50%, -50%);
    position: absolute;
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.3s linear;
    ${({ vanish }) => (vanish && css`
        opacity: 0;
    `)}
    @media (max-width: 600px){
        display: none;
    }
`