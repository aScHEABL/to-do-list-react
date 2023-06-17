import React, { createContext, useReducer } from "react";

const AppContext = createContext(null);

const initialState = {

}

const reducer = (state, action) => {

}

const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const contextValue = {
        state,
        dispatch,
    }

    return (
        <AppContext.Provider value={contextValue}>
            {...children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider }