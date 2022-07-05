import React, { useState } from 'react'
import { noteNumberValues } from '../../../../../constants/notes';
import Fretboard, { KeyedFretboard } from '../../../fretboard'
import FBNote, { FBNodeLayers } from '../../fb-node/FBNote';
import FBNodePin from '../../fb-node/indicators/selected/FBNodePin';
import FretboardComponent from '../../fretboard/Fretboard';
import FBIntervalExersize, { FBIntervalRound } from './controller';
const IntervalExcersizeComponent = () => {

    const options = {
        seconds: 200,
        numRounds: 5,
        givenIntervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        hiddenIntervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        maxStringDistance: 3,
        maxFretDistance: 3,
        keynotes: noteNumberValues
    }

    const [round, setRound] = useState(new FBIntervalRound(options));
    const [revealed, setRevealed] = useState(false);
    const update = () => {}


    // const fb = new FBIntervalExersize({
    //     seconds: 200,
    //     numRounds: 5,
    //     givenIntervals: [0, 1, 3, 5],
    //     hiddenIntervals: [3, 6, 9, 10, 11],
    //     maxStringDistance: 3,
    //     maxFretDistance: 3,
    //     keynotes: noteNumberValues,
    // });
    const getLayerMap = () => {
        console.log(round.intervals.hidden[0])
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
    getLayerMap()
    // const exersice = new FBIntervalExersize({
    //     'keynote': 'C',
    //     'mode': 'Ionion'
    // }, 3)

    return (
        <div>
            {
                <FretboardComponent layerMap={getLayerMap()} ></FretboardComponent>
            }
            <button onClick={() => {setRound(new FBIntervalRound(options)); setRevealed(false)}}>Next</button>
            <button onClick={() => setRevealed(true)}>{revealed ? round.intervals.hidden[0].interval.shorthand : "?"}</button>

        </div>
    )
}

export default IntervalExcersizeComponent