import { Interval, Intervals, noteNumberValues } from "../../../../../constants/notes";
import { MusicKey, NoteNumber } from "../../../../music/music";
import { IntervalMap, Tuning } from "../../../fbtypes";
import { FBNode, KeyedFretboard, KeyedFretboardParams } from "../../../fretboard";
import { action, makeAutoObservable } from "mobx"



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

    _state = {
        guessed: false,
        correct: false
    }
    
    intervals: RoundIntervals = {
        given: [],
        hidden: [],
    };

    // onUpdate: Function;
    next: Function;
    onGuess: Function;
    

    constructor(options: FBIntervalRoundParams, next: Function, onGuess: Function) {
        this.options = options;
        // this.setFretboard(this.options.keynotes, ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']);
        this.fretboard = new KeyedFretboard({
            key: {'keynote': 'C', mode: 'Ionion'},
            strings: [1, 2, 3, 4, 5, 6],
            frets: 18,
            tuning: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
        })
        this.next = next;
        this.onGuess = onGuess;
        // this.onUpdate = onUpdate ? () => onUpdate(this) : () => null;
        this.setIntervals()

        makeAutoObservable(this)
    }

    guess = (interval: number) => {
        this._state.guessed = true;
        this._state.correct = (this.intervals.hidden[0].interval.semitones == interval);
        this.onGuess(this._state.correct);
        if (this._state.correct) this.next();
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

        this.intervals.hidden.push({
            coords: [hiddenInterval.stringIndex, hiddenInterval.fretIndex],
            interval: Intervals[this.fretboard.intervalMap[hiddenInterval.stringIndex][hiddenInterval.fretIndex][1] % 12]
        })
        const list = this.fretboard.getNewStringMatrix(() => null)


    }
}


// Interval
class FBIntervalExersice {
    // this.onUpdate(v);
    currentRound: FBIntervalRound | null = null;
    options: FBIntervalExerciseOptions;
    secondsLeft: number;

    score = {
        guesses: 0,
        correct: 0
    }

    constructor(options: FBIntervalExerciseOptions) {
        this.options = options;
        const { givenIntervals, hiddenIntervals } = options;
        this.secondsLeft = options.seconds;
        makeAutoObservable(this);
    }
    
    onGuess(isCorrect: boolean) {
        if (!this.secondsLeft) return;
        this.score.guesses += 1;
        this.score.correct += isCorrect ? 1 : 0;
        console.log(this.score);
    }

    next() {
        this.currentRound = this.generateRound();
    }

    end() {
        clearInterval(this._timerIntervalSet);
        this.currentRound = null;
    }

    _timerIntervalSet?: ReturnType<typeof setInterval>;

    start() {
        // action(() => {
            this.score = {
                guesses: 0,
                correct: 0
            }
            this.secondsLeft = this.options.seconds;
            console.log(this.secondsLeft)
            this.currentRound = this.generateRound();
            this._timerIntervalSet = setInterval(() => {
                if (this.secondsLeft > 0) this.secondsLeft--;
                else this.end()
            }, 1000)
        // })
    }

    generateRound = (): FBIntervalRound => {
        return new FBIntervalRound(this.options, () => this.next(), (isCorrect: boolean) => this.onGuess(isCorrect));
    }
}

export default FBIntervalExersice;