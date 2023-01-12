import React from 'react'
import { Intervals } from '../../../../../constants/notes';
import Fretboard from '../../../fretboard'
import FBNodePin from '../../../components/fb-node/indicators/selected/FBNodePin';
import FretboardComponent from '../../../components/fretboard/Fretboard';
import { FBIntervalRound } from '../state';
import styled from 'styled-components';


export const CircleButton = styled.span`
    background-color: white;
    border-radius: 50%;
    border: 1px solid #8a9fed;
    height: 35px;
    width: 35px;

    layout: inline;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 1.05em;
    color: #8a9fed;

    &:hover {
        background-color: rgba(176, 138, 237, 0.09);
        cursor: pointer;
    }
`;

const FBIntervalRoundComponent = ({round}: {round: FBIntervalRound}) => {

    const getLayerMap = () => {
        const {given, hidden} = round.intervals;
        const fmap = round.fretboard.getNewStringMatrix(() => []);
        fmap[given[0].coords[0]][given[0].coords[1]].push((
            <FBNodePin color={'red'}>{given[0].interval.shorthand}</FBNodePin>
        ))

        fmap[hidden[0].coords[0]][hidden[0].coords[1]].push((
            <FBNodePin color={'red'}>?</FBNodePin>
        ))
        // console.log(Fretboard.getFretMap(fmap))
        return Fretboard.getFretMap(fmap);
    }

  return (
    <div>
        {
            <FretboardComponent layerMap={getLayerMap()} ></FretboardComponent>
        }
        <div style={{display: 'flex'}}>
            {
                round.options.hiddenIntervals.map(interval =>                     
                    (<span key={interval}><CircleButton onClick={() => round.guess(interval)}>{Intervals[interval].shorthand}</CircleButton></span>)
                )

            }
        </div>
    </div>
  )
}

export default FBIntervalRoundComponent;