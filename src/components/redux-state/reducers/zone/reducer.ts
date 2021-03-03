import { Faction } from '../../../../types/creature';
import {
    SET_TILES, MOVE_CREATURE,
    ADD_CREATURES, SET_CREATURES,
    DAMAGE_CREATURE, REMOVE_CREATURE,
    SET_OBJECTS, INIT_ZONE,
    ZoneState, ZoneActions,
} from './types';

const initialState: ZoneState = {
    name: "zone0",
    size: { w: 0, h: 0 },
    tiles: [],
    creatures: { [Faction.Player]: [], [Faction.Friendly]: [], [Faction.Hostile]: [] },
    interactableTiles: [],
    tilesLoaded: false,
    objectsLoaded: false,
    creaturesLoaded: false
};

const reducer = (state = initialState, action: ZoneActions) => {
    switch (action.type) {
        case INIT_ZONE:
            return {
                ...initialState,
                name: action.payload
            };
        case SET_TILES:
            return {
                ...state,
                tiles: action.payload,
                size: { h: action.payload.length, w: action.payload[0].length },
                tilesLoaded: true
            };
        case SET_OBJECTS:
            return {
                ...state,
                interactableTiles: action.payload,
                objectsLoaded: true
            };
        case MOVE_CREATURE: {
            return {
                ...state,
                creatures: {
                    ...state.creatures,
                    [action.payload.creature.faction]: state.creatures[action.payload.creature.faction].map(
                        c => c.id !== action.payload.creature.id
                            ? c
                            : { ...c, pos: action.payload.pos }
                    )
                }
            };
        }
        case ADD_CREATURES:
            return {
                ...state,
                creatures: {
                    ...state.creatures,
                    [action.payload.faction]: state.creatures[action.payload.faction].concat(action.payload.creatures)
                }

            };
        case SET_CREATURES:
            return {
                ...state,
                creaturesLoaded: true,
                creatures: action.payload
            };
        case DAMAGE_CREATURE:
            return {
                ...state,
                creatures: {
                    ...state.creatures,
                    [action.payload.faction]: state.creatures[action.payload.faction].map(
                        c => c.id === action.payload.id ? action.payload : c
                    )
                }
            };
        case REMOVE_CREATURE: {
            return {
                ...state,
                ...state,
                creatures: {
                    ...state.creatures,
                    [action.payload.faction]: state.creatures[action.payload.faction].filter(c => c.id !== action.payload.id)
                },
                gameOver: action.payload.faction === Faction.Player
            };
        }
        default:
            return state;
    }
};

export default reducer;