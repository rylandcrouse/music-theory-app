import styled from "styled-components";

export const FBNodeArea = styled.div`
    width: 100%;
    flex-grow: 1;
    position: relative;
    background-color: white;
    &:hover {
        background-color: #f2f7f4;
    }
`;

export const NodeOverlay = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    background: rgba(1, 1, 1, 0);
`;

export const NodeLabel = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // color: white;
`;

export const StringSegmentArea = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;
    font-size: 0.95em;
`;

export const StringSegment = styled.div`
    height: 5%;
    width: 100%;
    background-color: #969696;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;

`;