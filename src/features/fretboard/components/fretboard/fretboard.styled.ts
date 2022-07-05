import styled from 'styled-components';

export const FBContainer = styled.div`
    // width: 650px;
    height: 160px;
    aspect-ratio: 650 / 180;
    border-radius: 5px;
    background-color: white;

`;

export const Frets = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;

    display: flex;
    justify-content: space-between;
`;

export const Fret = styled.div`
    background-color: #ededed;
    flex-grow: 1;
    height: 100%;

    position: relative;

    display: flex;
    flex-direction: column;
`;

export const FretBorder = styled.div`
    height: 100%;
    width: 1px;
    z-index: 1;
    background-color: black;
    position: absolute;
    right: 0;
    border: 1px solid #c3c9b1;
`;

export const Nut = styled(FretBorder)`
    height: 100%;
    width: 3px;
    border-radius: 2px;
    background-color: #dee3d1;
    border: 1px solid #c3c9b1;
`;