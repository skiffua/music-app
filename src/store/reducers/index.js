import { combineReducers } from 'redux';
import songsReducer from './songsReducer.tsx';
import useReducer from "./userReducer";

export default combineReducers({
    songsData: songsReducer,
    userData: useReducer,
});
