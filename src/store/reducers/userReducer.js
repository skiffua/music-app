import ACTION_ERROR from "../actions/types.js";

const songsStoreInitial = {
    userName: '',
    userNick: '',
    actionError: null,
};

const useReducer = (state = songsStoreInitial, action) => {
    switch (action.type) {
        case ACTION_ERROR: {
            const actionError = action.payload;
            return {
                ...state,
                actionError: actionError,
            };
        }
        default: return state;
    }
};

export default useReducer;
