import { Faction } from '../../../../types';
import { loadPlayerData } from '../../../../utils/load-data';
import {
    SET_GAME_OVER, GameState,
    GameActions, SAVE_PLAYER,
    RESET_PLAYER,
    LOAD_ZONE, LOAD_SAVED_ZONE,
    SAVE_VISITED_ZONE,
    REMOVE_VISITED_ZONE
} from './types';

const initialState: GameState = {
    gameOver: false,
    player: loadPlayerData(),
    visitedZones: [],
    currentZone: { name: 'zone0' }
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
        case RESET_PLAYER:
            return {
                ...state,
                player: loadPlayerData(),
                gameOver: false
            };
        case LOAD_ZONE: {
            return {
                ...state,
                currentZone: { name: action.payload },
                visitedZones: state.visitedZones
            };
        }
        case LOAD_SAVED_ZONE: {
            const savedPlayer = state.visitedZones.find(z => z.name === action.payload)?.creatures[Faction.Player][0];
            return {
                ...state,
                currentZone: { name: action.payload },
                player: savedPlayer || state.player
            };
        }
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