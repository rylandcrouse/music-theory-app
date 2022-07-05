import { Interval, Intervals, noteNumberValues } from "../../../../../../constants/notes";
import { MusicKey, NoteNumber } from "../../../../../music/music";
import { IntervalMap, Tuning } from "../../../../fbtypes";
import { FBNode, KeyedFretboard, KeyedFretboardParams } from "../../../../fretboard";

interface FBIntervalExerciseOptions  {
    seconds: number;
    numRounds: number;
    givenIntervals: number[];
    hiddenIntervals: number[];
    maxStringDistance: number;
    maxFretDistance: number;
    keynotes: NoteNumber[];
}

interface FBIntervalRoundParams {
    seconds: number;
    numRounds: number;
    givenIntervals: number[];
    hiddenIntervals: number[];
    maxStringDistance: number;
    maxFretDistance: number;
    keynotes: NoteNumber[];
}

interface RoundInterval {
    coords: [number, number],
    interval: typeof Intervals[number]
}

type RoundIntervals = {
    given: RoundInterval[];
    hidden: RoundInterval[];
}

export class FBIntervalRound {
    // givenNodeCoords: [];
    // guessingNodeCoords: [];
    fretboard: KeyedFretboard;
    options: FBIntervalExerciseOptions;
    guessed: boolean = false;
    correct: boolean | undefined;

    intervals: RoundIntervals = {
        given: [],
        hidden: [],
    };

    constructor(options: FBIntervalRoundParams, onUpdate?: Function) {
        this.options = options;
        // this.setFretboard(this.options.keynotes, ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']);
        this.fretboard = new KeyedFretboard({
            key: {'keynote': 'C', mode: 'Ionion'},
            strings: [1, 2, 3, 4, 5, 6],
            frets: 18,
            tuning: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
        })

        this.setIntervals()
    }

    handleNodeClick = (stringIndex: number, fretIndex: number) => () => {

    }

    setFretboard = (keynotes: NoteNumber[], tuning: Tuning) => {
        this.fretboard = new KeyedFretboard({
            key: {'keynote': 'C', mode: 'Ionion'},
            strings: [1, 2, 3, 4, 5, 6],
            frets: 18,
            tuning
        })
    }

    setIntervals = () => {
        const getNodeIntervalFilter = (intervals: number[]) => (fbnode: FBNode) => (intervals.includes(
            this.fretboard.intervalMap[fbnode.stringIndex][fbnode.fretIndex][1] % 12
        ));
        const getRandomFromArray = (array: any[]) => array[Math.floor(Math.random()*array.length)];
        const possibleStartingNodes = this.fretboard.getNodes([getNodeIntervalFilter(this.options.givenIntervals)]);
        const startingNode = getRandomFromArray(possibleStartingNodes);
        // console.log(startingNode)
        this.intervals.given.push({
            coords: [startingNode.stringIndex, startingNode.fretIndex],
            interval: Intervals[this.fretboard.intervalMap[startingNode.stringIndex][startingNode.fretIndex][1] % 12]
        })
        const distanceFilter = (currentNode: FBNode): boolean => {
            const stringDistance = Math.abs(startingNode.stringIndex - currentNode.stringIndex);
            const fretDistance = Math.abs(startingNode.fretIndex - currentNode.fretIndex);
            // console.log(stringDistance, fretDistance, currentNode.fretIndex)
            if (stringDistance > this.options.maxStringDistance || fretDistance > this.options.maxFretDistance) return false;
            return true;
        }
        const possibleHiddenNodes = this.fretboard.getNodes([distanceFilter, (node) => node != startingNode, getNodeIntervalFilter(this.options.hiddenIntervals)]);
        const hiddenInterval = getRandomFromArray(possibleHiddenNodes);

        // console.log(this.fretboard.intervalMap[startingNode.stringIndex][startingNode.fretIndex],
        //     this.fretboard.intervalMap[hiddenInterval.stringIndex][hiddenInterval.fretIndex],
        // )

        this.intervals.hidden.push({
            coords: [hiddenInterval.stringIndex, hiddenInterval.fretIndex],
            interval: Intervals[this.fretboard.intervalMap[hiddenInterval.stringIndex][hiddenInterval.fretIndex][1] % 12]
        })
        const list = this.fretboard.getNewStringMatrix(() => null)


    }

    getLayerMap = () => {
        
    }


    // constructor(givenNodeCoords: [number, number][], guessingNodeCoords: [number, number]) {

    // }

    getNodeList = () => {

    }

    start() {
        
    }
}


// Interval
class FBIntervalExersice {
    currentRound?: FBIntervalRound;
    options: FBIntervalExerciseOptions;
    // givenIntervals: number[];
    // hiddenIntervals: number[];
    // maxStringDistance = 4;
    // maxFretDistance = 5;
    // key?: MusicKey;

    constructor(options: FBIntervalExerciseOptions) {
        this.options = {
            seconds: 200,
            numRounds: 5,
            givenIntervals: [0, 1, 3, 5],
            hiddenIntervals: [3, 6, 9, 10, 11],
            maxStringDistance: 3,
            maxFretDistance: 3,
            keynotes: noteNumberValues
        }
        // super(strings, frets, tuning);
        const { givenIntervals, hiddenIntervals } = options;

        this.currentRound = new FBIntervalRound(this.options);
    }

    rootIntervalFilter = () => {

    }

    generateRounds = () => {

    }
}

export default FBIntervalExersice;