import React, { createContext, useContext, useReducer } from "react";

const initialState = {
    playerPosition: { x: 0, y: 0 },
    tileSize: { w: 32, h: 32 }
};

export const StateContext = createContext([
    initialState,
    () => initialState
]);


export const StateProvider = ({ reducer, children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
};
export const useStateValue = () => useContext(StateContext);
