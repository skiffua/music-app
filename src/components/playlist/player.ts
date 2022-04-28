import { Howl, Howler } from 'howler';
import {PlayerInterface} from "./types";
import { SERVER_ROUTES } from '../../constants/api';
import {DIMENSIONS} from "../equalizer/const";

export let PlayerInstance: Howl | null = null;
export let AnalyserInstance: AnalyserNode | null = null;

export class Player {
    static createInstance(options: PlayerInterface) {
        const mapedOptions = {
            // ...options,
            src: `${SERVER_ROUTES.LOAD_SONG}${options.src}`,
            format: ['mp3'],
            usingWebAudio: true,
            volume: 0.1,
            autoplay: false,
        };

        if (PlayerInstance && PlayerInstance.src !== options.src) {
            PlayerInstance.unload();

            PlayerInstance = new Howl(mapedOptions);
        }

        if (!PlayerInstance) {
            PlayerInstance = new Howl(mapedOptions);
        }

        return PlayerInstance;
    }

    static getInstance(): Howl | null {
        return PlayerInstance;
    }
}

export class Analyser {
    private static dataArray: Uint8Array | null = null;

    static createAnalyser(PlayerInstance: Howl | null): void {
        if (!PlayerInstance) {
            return;
        }

        const context: AudioContext = Howler.ctx;
        const audioSourceNode = Howler.masterGain ;

        AnalyserInstance = context.createAnalyser();
        AnalyserInstance.fftSize = DIMENSIONS.EQUALIZER_FREG;

        const bufferLength = AnalyserInstance.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);

        audioSourceNode.connect(AnalyserInstance);
        // No needed, issues with sound!!!!
        // AnalyserInstance.connect(context.destination);
    }

    static getFrequency(): Uint8Array | [] {
        if (!AnalyserInstance) { return []; }

        AnalyserInstance.getByteFrequencyData(this.dataArray);

        return this.dataArray;
    }
}
