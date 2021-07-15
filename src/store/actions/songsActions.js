import GET_SONGS_LIST from "../actions/types.js";
import useFetch from "../../hooks/useFetch";


export const getSongsList = (songsData) => dispatch => {

    return dispatch({
        type: GET_SONGS_LIST,
        payload: songsData.songs,
    });
};
