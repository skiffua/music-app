import {PlayerInterface} from "./types";


class Player implements PlayerInterface {
    instance = null;

    constructor(soundSrc: string) {
        if (Player.instance) {
            return Player.instance;
        }
        Player.instance = this;

        return Player.instance
    }

    getInstance() {

    }
}
