import { noteNumberValues, notes, flatNotes } from '../../constants/notes'
import { PitchTuple } from './music';
import { Pitch } from './pitch';

export const getNoteNumber = (note: typeof flatNotes[number]): typeof noteNumberValues[number]  => {
    for (let i in notes) {
        if (notes[i].includes(note)) {
            return Number(i) + 1;
            break;
        };
    }
    throw new Error(`Note ${note} not found in ${notes}`);
}
