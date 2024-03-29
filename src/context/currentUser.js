import React from 'react';
import {createContext, useState} from 'react';

export const CurrentUserContext = createContext([{}, () => {}]);

export const CurrentUserProvider = ({ children }) => {
    const [state, setState] = useState({
        isLoading: false,
        isLoggenIn: null,
        currentUser: null
    });
    return (
        <CurrentUserContext.Provider value={[state, setState]}>
            { children }
        </CurrentUserContext.Provider>
    )
};
