import { FBNode } from "./fretboard";
import { IntervalTuple, SPN } from "../music/music";

export type FBString = FBNode[];

export type FBFret = FBNode[];

export type StringMap = FBString[];

export type FretMap = FBFret[];

export type Tuning = SPN[];


// [lowStringIndex, highStringIndex, lowFretIndex, highFretIndex]
export type FretboardBoundary = [number, number, number, number]

export type IntervalMap = IntervalTuple[];

export type IntervalMatrix = IntervalMap[];

export type ZippedKeyedNode = { interval: IntervalTuple, node: FBNode };
