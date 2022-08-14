import { SET_SONGS_LIST, SET_CURRENT_SONG, SET_CURRENT_SOUND_ID } from "../actions/types";

interface SongsStore {
    songList: any[],
    songPlaying: any,
    activeSoundId: number,
}

const songsStoreInitial: SongsStore = {
    songList: [],
    songPlaying: null,
    activeSoundId: NaN,
};

const songsReducer = (state = songsStoreInitial, action) => {
    switch (action.type) {
        case SET_SONGS_LIST: {
            const songsList = action.payload;
            return {
                ...state,
                songList: songsList,
            };
        }
        case SET_CURRENT_SONG: {
            const currentSong = action.payload;
            return {
                ...state,
                songPlaying: currentSong,
            };
        }
        case SET_CURRENT_SOUND_ID: {
            const currentSoundId = action.payload;
            return {
                ...state,
                activeSoundId: currentSoundId,
            };
        }
        default: return state;
    }
};

export default songsReducer;
