import React from 'react'
import { FBNodeSelectedBox, FBNodePinCircle } from './FBNodePin.styled';

interface FBNodePinProps {
    color: string;
    children: React.ReactNode;
}

const FBNodePin = ({color, children}: FBNodePinProps) => {
  return (
    <FBNodeSelectedBox>
    <FBNodePinCircle>{children}</FBNodePinCircle>
    </FBNodeSelectedBox>
  )
}

export default FBNodePin;