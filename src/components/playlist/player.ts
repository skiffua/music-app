import { Howl, Howler } from 'howler';
import {PlayerInterface} from "./types";
import { SERVER_ROUTES } from '../../constants/api';

// export class Player {
//     private static instance = null;
//     public onend: () => {};
//     public onload: () => {};
//
//     constructor(options: PlayerInterface) {
//         Player.instance = new Howl(options);
//         this.onload = options.onload;
//         this.onend = options.onend;
//     }
//
//     static getInstance(options: PlayerInterface) {
//         if (!Player.instance) {
//             Player.instance = new Howl(options);
//             // Player.instance = new Player(options);
//         }
//
//         console.log('Player.instance2', Player.instance);
//
//         return Player.instance;
//     }
// }

export let PlayerInstance: Player | null = null;

export class Player {
    private static instance: Howl | null = null;
    private static analyser: AnalyserNode | null = null;
    private static dataArray = null;
    public src = '';
    public onend: () => {};
    public onload: () => {};

    constructor(options: PlayerInterface) {
        const mapedOptions = {
            ...options,
            src: `${SERVER_ROUTES.LOAD_SONG}${options.src}`,
            format: ['mp3'],
            usingWebAudio: true,
        };

        Player.instance = new Howl(mapedOptions);
        this.src = options.src;
        this.onload = options.onload;
        this.onend = options.onend;
    }

    static createInstance(options: PlayerInterface) {
        console.log(PlayerInstance, options);

        if (Player.instance && PlayerInstance.src !== options.src) {
            Player.instance.unload();

            PlayerInstance = new Player(options);
        }

        if (!Player.instance) {
            PlayerInstance = new Player(options);
        }

        return Player.instance;
    }

    static getInstance(): Howl | null {
        return Player.instance;
    }

    static getContext() {
        if (!Player.getInstance) {
            return;
        }

        const context: AudioContext = Howler.ctx;
        const audioSourceNode = Howler.masterGain ;

        Player.analyser = context.createAnalyser();
        Player.analyser.fftSize = 256;

        const bufferLength = Player.analyser.frequencyBinCount;
        Player.dataArray = new Uint8Array(bufferLength);

        audioSourceNode.connect(Player.analyser);
        Player.analyser.connect(context.destination);
    }

    static getFrequency() {
        Player.analyser.getByteFrequencyData(this.dataArray);

        return this.dataArray;
    }
}
