import { tunings } from "./tunings";
import { FretboardBoundary, FretMap, IntervalMap, IntervalMatrix, StringMap, Tuning } from "./fbtypes";
import { setMaxListeners } from "process";
import { Note } from "tone/build/esm/core/type/NoteUnits";
import { Pitch } from "../music/pitch";
import { now, PitchShift, Synth } from "tone";
import { IntervalTuple, MusicKey, PitchTuple, SPN } from "../music/music";
import { getNoteNumber } from "../music";
import synth from "../player";

export interface FretboardParams {
    strings: number[], frets: number, tuning: string[]
}

export class FBNode {
    pitch: Pitch;
    intervalFromLowRoot: IntervalTuple;
    clickHandlers: Function[];
    stringIndex: number;
    fretIndex: number;

    constructor(pitch: Pitch, intervalFromLowtRoot: IntervalTuple, clickHandlers: Function[], stringIndex: number, distanceFromOpen: number) {
        this.pitch = pitch;
        this.intervalFromLowRoot = intervalFromLowtRoot;
        this.clickHandlers = clickHandlers;
        this.stringIndex = stringIndex;
        this.fretIndex = distanceFromOpen;
    }

    play = () => {
        synth.triggerAttackRelease((this.pitch.spn as SPN), '8n', now())
    }

    trigger = () => this.clickHandlers.forEach((fn: Function) => fn());
}

export class Fretboard {
    _strings = [1, 2, 3, 4, 5, 6];
    _frets = 14;
    _tuning: string[];
    _stringMap: StringMap;
    synth = new Synth().toDestination();
    numStrings: number;

    constructor(params: FretboardParams) {
        this._frets = params.frets;
        this._strings = params.strings;
        this._tuning = params.tuning;
        this.numStrings = Math.max(...params.strings);
        this._stringMap = this.getStringMap();
        // this.boundary = boundary || [Math.min(...strings) - 1, Math.max(...strings) - 1, 0, frets];
    }

    static setBoundary = () => null;

    getStringMap = (): StringMap => {
        const strings = this._strings;
        const tuning = this._tuning;
        const frets = this._frets;

        const numStrings = this.numStrings;
        const tuningInStringOrder = [...tuning].reverse();
        // console.log(numStrings)
        let currentFirstOfString: Pitch;

        const sm = this.getNewStringMatrix((stringIndex, fretIndex) => {
            const firstOfString = new Pitch(tuningInStringOrder[stringIndex]);
            const currentPitchTuple = firstOfString.getTupleFromInterval([false, fretIndex])
            const pitch = new Pitch(currentPitchTuple);
            return new FBNode(pitch, [false, 0], [() => this.play((pitch.spn as SPN))], stringIndex, fretIndex);
        })

        // console.log(sm)
        return sm;
    }

    play = (spn: SPN) => synth.triggerAttackRelease(spn, '8n', now());

    static getFretMap = (strings: StringMap): any[][] => {
        const fm: FretMap = [];
        const numFrets = strings[0].length;
        for (let i = 0; i < numFrets; i++) {
            fm.push(strings.map(string => string[i]));
        }
        return fm;
    }
    
    
    public get smap() : StringMap {
        return this._stringMap;
    }
    
    getNewStringMatrix = (fill?: ((stringIndex: number, fretIndex: number) => any)): any[][] => {
        return Array(this.numStrings).fill([]).map((string, stringIndex) => Array(this._frets).fill(null).map((fret, fretIndex) => {
            if (fill) return fill(stringIndex, fretIndex);
        }));
    }

    mapNodeIntervals = () => {}
}

export interface KeyedFretboardParams extends FretboardParams {
    key: MusicKey;
}

export class KeyedFretboard extends Fretboard {
    intervalMap: IntervalMatrix;
    _key: MusicKey;

    constructor(params: KeyedFretboardParams) {
        super(params);
        this._key = params.key;
        
        const lowestKeynotePitch = this.findLowestNotePitch(getNoteNumber(params.key.keynote));
        this.intervalMap = this.getIntervalMap((lowestKeynotePitch as PitchTuple), this._stringMap)
    }

    findLowestNotePitch = (noteNumberValue: number): PitchTuple | undefined => {
        let lowestNotePitch: Pitch | undefined;
        this._stringMap.forEach((string, stringIndex) => {
            string.forEach((node, nodeIndex) => {
                if (node.pitch.tuple[0] == noteNumberValue) {
                    if (!lowestNotePitch) lowestNotePitch = node.pitch;
                    else if (lowestNotePitch.isGreaterThan(node.pitch)) {
                        lowestNotePitch = node.pitch;
                    }
                }
            })
        });
        return lowestNotePitch && lowestNotePitch.tuple;
    }

    getIntervalMap = (pitch: PitchTuple, fretmap: FBNode[][]): IntervalMatrix => fretmap.map(x => x.map(node => Pitch.getIntervalFromTuples(pitch, node.pitch.tuple)));

    getNodes = (filters: ((arg: any) => boolean)[] = [() => true], nodeMatrix = this._stringMap): FBNode[] => {
        let flatNodes = this._stringMap.flat();
        const result = flatNodes.filter(node => filters.every(filter => filter(node)));
        return result;
    }

}

export default Fretboard;