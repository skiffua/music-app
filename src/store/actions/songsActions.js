import useFetch from "../../hooks/useFetch";
import { SET_CURRENT_SONG, SET_SONGS_LIST, SET_CURRENT_SOUND_ID } from "./types";


export const getSongsList = (songsData) => dispatch => {

    return dispatch({
        type: SET_SONGS_LIST,
        payload: songsData.songs,
    });
};

export const setActiveSong = (song) => dispatch => {

    return dispatch({
        type: SET_CURRENT_SONG,
        payload: song,
    });
};

export const setActiveSoundId = (id) => dispatch => {

    return dispatch({
        type: SET_CURRENT_SOUND_ID,
        payload: id,
    });
};
