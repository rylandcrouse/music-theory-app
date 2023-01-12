import React, { createContext, useContext, useEffect, useState } from 'react'
import { noteNumberValues } from '../../../../../constants/notes';
import Fretboard, { KeyedFretboard } from '../../../fretboard'
import FBNote, { FBNodeLayers } from '../../../components/fb-node/FBNote';
import FBNodePin from '../../../components/fb-node/indicators/selected/FBNodePin';
import FretboardComponent from '../../../components/fretboard/Fretboard';
import FBIntervalGame, { FBIntervalRound } from '../state';
import FBIntervalRoundComponent from './round';
import { observer } from "mobx-react"

const options = {
    seconds: 400,
    numRounds: 5,
    // givenIntervals: [0, 2, 4, 5, 7, 9, 11],
    // hiddenIntervals: [0, 2, 4, 5, 7, 9, 11],
    givenIntervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    hiddenIntervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    maxStringDistance: 6,
    maxFretDistance: 2,
    keynotes: noteNumberValues,
    modes: ['Ionian']
}

export const FBIntervalExerciseContext = createContext<FBIntervalGame | null>(null);
const game = new FBIntervalGame(options);

const IntervalExerciseComponent = observer(() => {
  

    return game && (
        <div>
          <button onClick={() => !game.currentRound ? game.start() : game.end()}>{!game.currentRound ? "Begin" : "Quit"}</button>
            <div>{game.currentRound && game.secondsLeft}</div>
            <div>{game.score.correct} / {game.score.guesses}</div>
          {
            game.currentRound && 
            <FBIntervalRoundComponent round={game.currentRound}/>
          }
        </div>
    )
});

export default IntervalExerciseComponent
