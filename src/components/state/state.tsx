import React, { createContext, useContext, useReducer } from "react";
import { Position, Dimensions, ZoneData, Faction } from '../../types';
import { Action } from './action';

export type State = {
    playerPosition: Position,
    tileSize: Dimensions
    zoneData: ZoneData,
    mapLoaded: boolean,
    turnOf: Faction,
    cameraPosition: Position,
    displaySize: Dimensions,
};

const initialState: State = {
    playerPosition: { x: 0, y: 0 },
    tileSize: { w: 32, h: 32 },
    zoneData: { size: { w: 20, h: 20 }, tiles: [], creatures: { 0: [], 1: [], 2: [] } },
    mapLoaded: false,
    turnOf: Faction.Player,
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
