import React from 'react'
import { FBNode } from '../../fretboard';
import { IntervalTuple } from '../../../music/music';
import { Pitch } from '../../../music/pitch';
import { FBNodeArea, StringSegmentArea, StringSegment, NodeOverlay, NodeLabel } from './FBNote.styled'
import FBNodePin from './indicators/selected/FBNodePin';


export type FBNodeLayers = React.ReactNode[];

interface FBNoteProps {
    pressed?: boolean;
    intervalFromLowRoot?: IntervalTuple;
    pitch?: Pitch;
    clickHandlers?: Function[];
    layers: FBNodeLayers;
}

const FBNote = ({layers}: FBNoteProps) => {
  // const text = fretboardNode.pitch.getNote();
  return (
    <FBNodeArea >
      { layers.map(layer => (<NodeOverlay key={Math.random()}>{layer}</NodeOverlay>)) }
      {/* <NodeOverlay><FBNodePin color='red'></FBNodePin></NodeOverlay> */}
      <StringSegmentArea >
        <StringSegment/>
      </StringSegmentArea>
    </FBNodeArea>
  )
}

export default FBNote