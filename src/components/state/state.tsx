import React, { createContext, useContext, useReducer } from 'react';
import { ZoneData, Faction } from '../../types';
import { Action } from './action';

export type State = {
    zoneData: ZoneData
    visitedZones: ZoneData[]
    mapLoaded: boolean
    turn: { faction: Faction, count: number, creature: string }
    gameOver: boolean
};

const initialState: State = {
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
