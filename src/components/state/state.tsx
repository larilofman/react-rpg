import React, { createContext, useContext, useReducer } from "react";
import { Position, Dimensions, MapData } from '../../types';
import { Action } from './action';

export type State = {
    playerPosition: Position,
    tileSize: Dimensions
    mapData: MapData,
    mapLoaded: boolean,
    playerTurn: boolean,
    cameraPosition: Position,
    displaySize: Dimensions
};

const initialState: State = {
    playerPosition: { x: 0, y: 0 },
    tileSize: { w: 32, h: 32 },
    mapData: { size: { w: 0, h: 0 }, tiles: [] },
    mapLoaded: false,
    playerTurn: true,
    cameraPosition: { x: 0, y: 0 },
    displaySize: { w: 19, h: 15 }
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
