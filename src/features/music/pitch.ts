import { type } from "os";
import { PitchShift } from "tone";
import { getNoteNumber } from ".";
getNoteNumber
import { notes, flatNotes, accidentals, octaves } from "../../constants/notes";
import { IntervalTuple, Note, PitchTuple, SPN } from "./music";
import { isValidPitchTuple, isValidSPNString } from "./validate";

export class Pitch {
    spn?: SPN;
    tuple: PitchTuple;
    note?: Note;

    constructor(
        // scientific pitch notation
        from: SPN | PitchTuple
    ) {
        let verifyValidFromType = false;
        if (isValidSPNString(from)) {
            verifyValidFromType = true;
            this.spn = (from as SPN);
            this.tuple = Pitch.getPitchTupleFromSPN((from as SPN));
        }
        else if (!verifyValidFromType && isValidPitchTuple(from)) {
            verifyValidFromType = true;
            this.tuple = (from as PitchTuple);
            this.spn = Pitch.getSPNFromPitchTuple((from as PitchTuple));
        }
        else throw new Error('Must provide of (SPN | PitchTuple).');
    }


    static getSPNFromPitchTuple = (pitchTuple: PitchTuple): SPN => {
        const noteNumberValue = pitchTuple[0];
        const octave = pitchTuple[1];
        return `${notes[noteNumberValue - 1][0]}${octave}`
    }

    static getPitchTupleFromSPN = (spn: string): PitchTuple => {
        const octave = Number(spn[spn.length - 1]);
        const note: Note = spn.slice(0, spn.length - 1);
        return [getNoteNumber(note), octave];
    }

    static getNextTupleFromTuple = (tuple: PitchTuple): PitchTuple => {
        const [noteValue, octave] = tuple;
        const isLastNote = (noteValue == notes.length);

        if (!isLastNote) return [noteValue + 1, octave];
        return [1, octave + 1];
    }

    static generatePitchRange = (start: Pitch, end: Pitch) => {
        let pitchTupleArray: Pitch[] = [start];
        let startNoteIndex, endNoteIndex = 0;
        
        if (start.isGreaterThan(end)) throw new Error(`Pitch start must be greater than pitch end. (${start.tuple} - ${end.tuple})`);
        
        let currentPitchTuple: PitchTuple = Pitch.getNextTupleFromTuple(start.tuple);
        while (end.isGreaterThan(currentPitchTuple)) {
            pitchTupleArray.push(new Pitch(currentPitchTuple));
            currentPitchTuple = Pitch.getNextTupleFromTuple(currentPitchTuple);
        }
        pitchTupleArray.push(end);
        return pitchTupleArray;
    }

    static getFloatFromTuple = (pt: PitchTuple): number => Number([...pt].reverse().join('.'))

    isGreaterThan = (otherPitch: Pitch | PitchTuple) => {
        const otherTuple = otherPitch instanceof Pitch ? otherPitch.tuple : otherPitch;
        return Pitch.getFloatFromTuple(this.tuple) > Pitch.getFloatFromTuple(otherTuple);
        // throw new Error(`Other pitch must be one of [Pitch, PitchTuple].`)
    }

    static getIntervalFromTuples = (t1: PitchTuple, t2: PitchTuple): IntervalTuple => {
        const isInverted = new Pitch(t1).isGreaterThan(t2);
        const octaves = Math.abs(t1[1] - t2[1]);
        const semitones = Math.abs(t1[0] - t2[0]);
        return [isInverted, octaves * 12 + semitones];
    }

    // TODO: sharp flat args
    static getNoteFromNumber = (number: number) => notes[number - 1][0]

    getTupleFromInterval = (interval: IntervalTuple): PitchTuple => {
        const [isInverted, semitones] = interval;
        let octaves = Math.floor(semitones / 12);
        let remaining = semitones % 12;

        if (isInverted) {
            if (remaining >= this.tuple[0]) {
                return [(notes.length + this.tuple[0]) - remaining, this.tuple[1] - (octaves + 1)];
            }
            return [this.tuple[0] - remaining, this.tuple[1] - octaves];
        }
        else {
            if (remaining + this.tuple[0] > notes.length) {
                return [(remaining + this.tuple[0]) % notes.length, this.tuple[1] + (octaves + 1)]
            }
            return [this.tuple[0] + remaining, this.tuple[1] + octaves];
        }
    }


    getNote = () => notes[this.tuple[0] - 1][0]
}
