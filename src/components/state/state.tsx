import React, { createContext, useContext, useReducer } from 'react';
import { Position, Dimensions, ZoneData, Faction } from '../../types';
import { Action } from './action';
import settings from '../../data/settings.json';

export type State = {
    playerPosition: Position
    zoneData: ZoneData
    visitedZones: ZoneData[]
    mapLoaded: boolean
    turn: { faction: Faction, count: number, creature: string }
    cameraPosition: Position
    gameOver: boolean
    combatLog: string[]
};

const initialState: State = {
    playerPosition: { x: 0, y: 0 },
    zoneData: {
        name: "zone1",
        size: { w: 0, h: 0 },
        tiles: [],
        creatures: { [Faction.Player]: [], [Faction.Friendly]: [], [Faction.Hostile]: [] },
        interactableTiles: []
    },
    visitedZones: [],
    mapLoaded: false,
    turn: { faction: Faction.Player, count: 0, creature: 'player' },
    cameraPosition: { x: 0, y: 0 },
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
