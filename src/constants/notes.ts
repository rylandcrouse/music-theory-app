export const notes = [['C'], ['C#', 'Db'], ['D'], ['D#', 'Eb'], ['E'], ['F'], ['F#', 'Gb'], ['G'], ['G#', 'Ab'], ['A'], ['A#', 'Bb'], ['B']];

// C would be 1, C# as 2, and so on
export const noteNumberValues = notes.map((n, i) => i+1);

export const flatNotes = notes.flat();

export const accidentals = ['b', '#'];

export const octaves = ['2', '3', '4', '5', '6']

export const modes = ['Ionian', 'Dorian', 'Phrygian', 'Lyidan', 'Moxolydian', 'Aeolian', 'Locrian'];

export const IonianFormula = [2, 2, 1, 2, 2, 2, 1];

export class Interval {
    full;
    shorthand;
    semitones: number;

    constructor(full: string, shorthand: string, semitones: number) {
        this.full = full;
        this.shorthand = shorthand;
        this.semitones = semitones;
    }
}

export const Intervals = [
    new Interval('Unison', 'P1', 0),
    new Interval('Minor Second', 'm2', 1),
    new Interval('Major Second', 'M2', 2),
    new Interval('Minor Third', 'm3', 3),
    new Interval('Major Third', 'M3', 4),
    new Interval('Perfect Fourth', 'P4', 5),
    new Interval('Tritone', 'TT', 6),
    new Interval('Perfect Fifth', 'P5', 7),
    new Interval('Minor Sixth', 'm6', 8),
    new Interval('Major Sixth', 'M6', 9),
    new Interval('Minor Seventh', 'm7', 10),
    new Interval('Major Seventh', 'M7', 11),
    new Interval('Octave', 'P8', 12),
];

export const tunings = {
    'standard': ['E', 'A', 'D', 'G', 'B', 'E']
}