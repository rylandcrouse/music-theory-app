import { flatNotes, octaves, noteNumberValues, modes } from "../../constants/notes";

type PitchTuple = [noteNumberValues[number], octaves[number]];

type NoteNumber = noteNumberValues[number];

type Note = typeof flatNotes[number];

// Scientific Pitch Notation
export type SPN = `${Note}${typeof octaves[number]}`;

// [inverted, semitones]
type IntervalTuple = [boolean, number];

// interface Key = [noteNumberValues[number], modes[number]];

interface MusicKey {
    keynote: noteNumberValues[number];
    mode: modes[number];
}