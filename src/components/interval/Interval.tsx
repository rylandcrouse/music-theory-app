import React from 'react'
import { StyledInterval } from './Interval.styled'

interface Props {
    numFromRoot: number;
    intervalShorthand: string;
    intervalLongform: string;
}

const Interval = ({intervalLongform, intervalShorthand}: Props) => {
  return (
    <StyledInterval>{intervalShorthand}</StyledInterval>
  )
}

export default Interval