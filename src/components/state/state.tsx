import React, { createContext, useContext, useReducer } from 'react';
import { Position, Dimensions, ZoneData, Faction } from '../../types';
import { Action } from './action';
import settings from '../../data/settings.json';

export type State = {
    playerPosition: Position,
    tileSize: Dimensions
    zoneData: ZoneData,
    mapLoaded: boolean,
    turn: { faction: Faction, count: number, creature: string },
    cameraPosition: Position,
    displaySize: Dimensions,
    gameOver: boolean
    combatLog: string[]
};

const initialState: State = {
    playerPosition: { x: 0, y: 0 },
    tileSize: settings.tileSize,
    zoneData: { size: { w: 22, h: 22 }, tiles: [], creatures: { 0: [], 1: [], 2: [] } },
    mapLoaded: false,
    turn: { faction: Faction.Player, count: 0, creature: 'player' },
    cameraPosition: { x: 0, y: 0 },
    displaySize: settings.displaySize,
    gameOver: false,
    combatLog: []
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
