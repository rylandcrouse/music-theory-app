import React from 'react'
import FBNote, { FBNodeLayers } from "../fb-node/FBNote"
import { FBContainer, Frets, Fret, FretBorder, Nut } from './fretboard.styled';
import FBClass from '../../fretboard'
import { FretMap, StringMap } from '../../fbtypes';
import Fretboard from '../../fretboard';

// const getFretsFromStrings = (strings: [][]) => {
//   const fm: FretMatrix = [];
//   const numFrets = strings[0].length;
//   for (let i = 0; i < numFrets; i++) {
//     fm.push(strings.map(string => string[i]));
//   }
// }

interface FBProps {
  layerMap: FBNodeLayers[][];
}

const FretboardComponent = (props: FBProps) => {
    const {layerMap} = props;
    // const fmap = FBClass.getFretMap(fretboard.getStringMap())
  return (
    <FBContainer>
      <Frets>

        {
          layerMap.map((fret, i) =>(
            <Fret key={Math.random()}>
              {i ? <FretBorder/> : <Nut/>}
             {fret.map(layers => (<FBNote key={Math.random()} layers={layers}/>))}
            </Fret>
          ))
        }
        
      </Frets>
    </FBContainer>
  )
}

export default FretboardComponent