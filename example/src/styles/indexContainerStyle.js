import styled from 'styled-components'

export const IndexContainerStyle = styled.div`
    background-color: ${({bgColor}) => bgColor || 'yellow'};
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 140vh;
    width: 100%;
`