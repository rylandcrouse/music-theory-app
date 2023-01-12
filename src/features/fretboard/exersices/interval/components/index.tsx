import React, { createContext } from 'react'
import { noteNumberValues } from '../../../../../constants/notes';
import FBIntervalGame from '../state';
import FBIntervalRoundComponent from './round';
import { observer } from "mobx-react"
import styled from 'styled-components';

const options = {
    seconds: 400,
    numRounds: 5,
    givenIntervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    hiddenIntervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    maxStringDistance: 6,
    maxFretDistance: 2,
    keynotes: noteNumberValues,
    modes: ['Ionian']
}

const Button = styled.div`
  height: 30px;
  background-color: black;
  border-radius: 15px;
  color: white;

  display: inline-flex;
  align-items: center;
  margin: 1rem;

  padding: .05em .8em;

  &:hover {
    background-color: white;
    color: black;
    border: 2px solid black;
    cursor: pointer;
  }
`;

export const FBIntervalExerciseContext = createContext<FBIntervalGame | null>(null);
const game = new FBIntervalGame(options);

const IntervalExerciseComponent = observer(() => {
  

    return game && (
        <div>
          <Button onClick={() => !game.currentRound ? game.start() : game.end()}>{!game.currentRound ? "Begin" : "Quit"}</Button>
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
