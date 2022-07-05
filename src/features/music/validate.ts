import { getNoteNumber } from ".";
import { noteNumberValues, notes } from "../../constants/notes";
import { PitchTuple, SPN } from "./music";

export const isValidPitchTuple = (pt: any): boolean => {
    if (pt.length != 2 || !Array.isArray(pt)) return false;
    const [noteNumberValue, octave] = pt;
    const isValidNoteNumberValue = noteNumberValues.includes(noteNumberValue);
    const isValidOctave = (typeof octave === 'number');
    if (isValidNoteNumberValue && isValidOctave) return true;
    return false;
}

export const isValidSPNString = (spn: any): boolean => {
    if (spn.length < 2 || typeof spn !== 'string') return false;
    const octave = Number(spn[spn.length - 1]);
    const isValidOctave = (typeof octave === 'number');
    const noteNumberValue = getNoteNumber(spn.slice(0, spn.length - 1));
    const isValidNoteNumberValue = noteNumberValues.includes(noteNumberValue);
    if (isValidNoteNumberValue && isValidOctave) return true;
    return false
}