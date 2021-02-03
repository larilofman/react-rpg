import { loadPlayerData } from '../../../../utils/load-data';
import {
    SET_GAME_OVER, GameState,
    GameActions, SAVE_PLAYER,
    LOAD_ZONE, LOAD_ZONE_BY_NAME,
    SAVE_VISITED_ZONE,
    REMOVE_VISITED_ZONE
} from './types';

const initialState: GameState = {
    gameOver: false,
    player: loadPlayerData(),
    visitedZones: [],
    currentZone: 'zone0'
};

const reducer = (state = initialState, action: GameActions) => {
    switch (action.type) {
        case SET_GAME_OVER:
            return {
                ...state,
                gameOver: action.payload
            };
        case SAVE_PLAYER:
            return {
                ...state,
                player: action.payload
            };
        case LOAD_ZONE: {
            return {
                ...state,
                currentZone: action.payload,
                visitedZones: state.visitedZones
            };
        }
        // case LOAD_ZONE_BY_NAME: {
        //     const savedZoneData = action.payload.savePrevious
        //         ?
        //         {
        //             name: state.name,
        //             creatures: state.creatures,
        //             tiles: state.tiles,
        //             size: state.size,
        //             interactableTiles: state.interactableTiles
        //         }
        //         : undefined;

        //     const visitedZones = savedZoneData ? state.visitedZones.concat(savedZoneData) : state.visitedZones;

        //     if (action.payload.fresh) {
        //         return {
        //             ...state,
        //             tilesLoaded: false,
        //             objectsLoaded: false,
        //             name: action.payload.zoneName,
        //             creatures: {
        //                 [Faction.Player]: state.creatures[Faction.Player].map(
        //                     c => c.id === 'player' ? { ...c, pos: { x: 0, y: 0 } } : c),
        //                 [Faction.Friendly]: [],
        //                 [Faction.Hostile]: []
        //             },
        //             interactableTiles: [],
        //             tiles: [],
        //             size: { w: 0, h: 0 },
        //             visitedZones: visitedZones.filter(z => z.name !== action.payload.zoneName)
        //         };
        //     } else {
        //         const zoneToLoad = state.visitedZones.find(z => z.name === action.payload.zoneName);
        //         if (zoneToLoad) {
        //             return {
        //                 ...state,
        //                 tilesLoaded: false,
        //                 objectsLoaded: false,
        //                 name: zoneToLoad.name,
        //                 creatures: zoneToLoad.creatures,
        //                 interactableTiles: [],
        //                 tiles: zoneToLoad.tiles,
        //                 size: zoneToLoad.size,
        //                 visitedZones
        //             };
        //         }
        //     }
        //     return state;

        // }
        case SAVE_VISITED_ZONE: {
            const savedZoneData = {
                name: action.payload.name,
                creatures: action.payload.creatures,
                interactableTiles: action.payload.interactableTiles,
                tiles: action.payload.tiles,
                size: action.payload.size
            };
            return {
                ...state,
                visitedZones: state.visitedZones.map(z => z.name).includes(action.payload.name)
                    ? state.visitedZones.map(z => z.name === action.payload.name ? savedZoneData : z) // zone has already been saved so replace it
                    : state.visitedZones.concat(savedZoneData) // zone hasn't been saved before
            };
        }
        case REMOVE_VISITED_ZONE: {
            return {
                ...state,
                visitedZones: state.visitedZones.filter(z => z.name !== action.payload)
            };
        }
        default:
            return state;
    }
};

export default reducer;