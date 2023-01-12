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
    // max-height: 100%;
    // max-width: 100%;
    margin-right: 3px;
    width: 30px;
    height: 30px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: black;
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