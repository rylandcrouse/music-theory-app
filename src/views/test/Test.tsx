import React from 'react'
import Interval from '../../components/interval/Interval'
import { notes } from './../../constants/notes'

import player from '../../features/player'
import {now, PluckSynth, MetalSynth, Oscillator} from 'tone';
import { getNoteNumber } from '../../features/music/index'
import { Pitch } from '../../features/music/pitch'
import guitar, { KeyedFretboard } from '../../features/fretboard/fretboard'
import Fretboard from '../../features/fretboard/components/fretboard/Fretboard'
import IntervalExcersizeComponent from '../../features/fretboard/exersices/interval/components';

const Test = () => {
  // const noteOctaveTupleArray = makeNoteOctaveTupleArray(['C', 2], ['B', 4]);
  const noteNum = getNoteNumber('C')
  const firstP = new Pitch('C3')
  const lastP = new Pitch([8, 5])
  const range = Pitch.generatePitchRange(firstP, lastP);
  // console.log(range)
  // console.log(lastP.getTupleFromInterval([true, 8]))
  // const fb = new KeyedFretboard([1,2,3,4,5,6], 15, ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'], {
  //   'keynote': 'C',
  //   'mode': 'Ionion'
  // })
  // const smap = fb.smap;
  Pitch.getIntervalFromTuples([3,2], [6,3]);
  // Pitch.getIntervalFromTuples([3,2], [6,3]);
  const synth = new Oscillator().toDestination()
  return (
    <div style={{"width": "100vw", "height": "100vh",
      "display": "flex", "flexDirection": "column",
      "justifyContent": "center", "alignItems": "center"
    }}>
        {/* <Fretboard fretboard={smap}></Fretboard> */}
        <IntervalExcersizeComponent/>
        {/* <button onClick={() => synth.('C#3', '4n', now())}>play</button> */}
        {/* <Interval intervalShorthand='M3' numFromRoot={4} intervalLongform='oooo'></Interval> */}
      </div>
  )
}
export default Test