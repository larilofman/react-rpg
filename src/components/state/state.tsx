import React, { createContext, useContext, useReducer } from "react";
import { Position, Dimensions, ZoneData, Faction } from '../../types';
import { Action } from './action';

export type State = {
    playerPosition: Position,
    tileSize: Dimensions
    zoneData: ZoneData,
    mapLoaded: boolean,
    turn: { faction: Faction, num: number },
    cameraPosition: Position,
    displaySize: Dimensions,
    gameOver: boolean
};

const initialState: State = {
    playerPosition: { x: 0, y: 0 },
    tileSize: { w: 32, h: 32 },
    zoneData: { size: { w: 22, h: 22 }, tiles: [], creatures: { 0: [], 1: [], 2: [] } },
    mapLoaded: false,
    turn: { faction: Faction.Player, num: 0 },
    cameraPosition: { x: 0, y: 0 },
    displaySize: { w: 19, h: 15 },
    gameOver: false
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
