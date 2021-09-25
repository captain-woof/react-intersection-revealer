import styled from 'styled-components'

export const PackageNameText = styled.div`
    color: black;
    font-size: 1.2rem;
    font-weight: 400;
    font-style: italic;
    align-self: center;
    border-bottom: 2px solid black;
    margin-right: 2rem;
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    color: black;
    font-size: 1rem;    
    flex-grow: 1;
    text-align: end;
    justify-content: flex-end;
    margin-right: 3rem;
`

export const Button = styled.a`    
    border-radius: 4px;
    padding: 4px 8px;
    border: 2px solid transparent;
    height: fit-content;
    width: fit-content;
    margin-right: 0.5rem;
    transition: all 0.3s linear;
    text-decoration: none;
    color: black;
    cursor: none;
    opacity: 1;
    &:hover {
        border: 2px solid black;
    }
`

export const IndexHeaderStyle = styled.div`
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: max-content;
    display: flex;
    flex-direction: row;
    z-index: 99;
    margin: 12px;
`