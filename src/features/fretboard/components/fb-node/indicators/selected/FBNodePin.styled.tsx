import styled from "styled-components";

export const FBNodeSelectedBox = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgba(1, 1, 1, 0);
`;

export const FBNodePinCircle = styled.div`
    max-height: 90%;
    max-width: 100%;
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: #DD9AE8;
    opacity: 0.88;
    z-index: 1000;
    font-size: 0.74em;
    font-weight: 700;

    color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;