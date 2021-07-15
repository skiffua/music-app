import GET_SONGS_LIST from "../actions/types.js";

interface SongsStore {
    songList: any[],
    songPlaying: {
        activeSongId: number | null,
        isPlaying: boolean,
    },
}

const songsStoreInitial: SongsStore = {
    songList: [],
    songPlaying: {
        activeSongId: null,
        isPlaying: false,
    },
};

const songsReducer = (state = songsStoreInitial, action) => {
    switch (action.type) {
        case GET_SONGS_LIST: {
            const songsList = action.payload;
            return {
                ...state,
                songList: songsList,
            };
        }
        default: return state;
    }
};

export default songsReducer;
