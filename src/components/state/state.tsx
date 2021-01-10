import React, { createContext, useContext, useReducer } from "react";
import { Position, Dimensions, MapData } from '../../types';
import { Action } from './action';

export type State = {
    playerPosition: Position,
    tileSize: Dimensions
    wallPosition: Position,
    mapData: MapData,
    mapLoaded: boolean,
    playerTurn: boolean
};

const initialState: State = {
    playerPosition: { x: 3, y: 2 },
    tileSize: { w: 32, h: 32 },
    wallPosition: { x: 8, y: 8 },
    mapData: { size: { w: 0, h: 0 }, tiles: [] },
    mapLoaded: false,
    playerTurn: false
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
    initialState,
    () => initialState
]);

type StateProviderProps = {
    reducer: React.Reducer<State, Action>;
    children: React.ReactElement
}


export const StateProvider: React.FC<StateProviderProps> = ({ reducer, children }: StateProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
};
export const useStateValue = () => useContext(StateContext);
