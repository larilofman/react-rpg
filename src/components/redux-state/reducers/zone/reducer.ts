import { Faction } from '../../../../types';
import {
    SET_MAP, MOVE_CREATURE,
    ADD_CREATURES, ZoneActions,
    DAMAGE_CREATURE, REMOVE_CREATURE,
    LOAD_ZONE,
    SAVE_VISITED_ZONE, ADD_INTERACTABLE_TILES,
    ZoneState,
    REMOVE_VISITED_ZONE
} from './types';

const initialState: ZoneState = {
    status: {
        name: "zone0",
        size: { w: 0, h: 0 },
        tiles: [],
        creatures: { [Faction.Player]: [], [Faction.Friendly]: [], [Faction.Hostile]: [] },
        interactableTiles: []
    },
    zoneLoaded: false,
    visitedZones: [],
    gameOver: false
};

const reducer = (state = initialState, action: ZoneActions) => {
    switch (action.type) {
        case SET_MAP:
            return {
                ...state,
                status: action.payload,
                zoneLoaded: true
            };

        case MOVE_CREATURE: {
            return {
                ...state,
                status: {
                    ...state.status,
                    creatures: {
                        ...state.status.creatures,
                        [action.payload.creature.faction]: state.status.creatures[action.payload.creature.faction].map(
                            c => c.id !== action.payload.creature.id
                                ? c
                                : { ...c, pos: action.payload.pos }
                        )
                    }

                }
            };
        }
        case ADD_CREATURES:
            return {
                ...state,
                status: {
                    ...state.status,
                    creatures: {
                        ...state.status.creatures,
                        [action.payload.faction]: state.status.creatures[action.payload.faction].concat(action.payload.creatures)
                    }
                }
            };
        case DAMAGE_CREATURE:
            return {
                ...state,
                status: {
                    ...state.status,
                    creatures: {
                        ...state.status.creatures,
                        [action.payload.faction]: state.status.creatures[action.payload.faction].map(
                            c => c.id === action.payload.id ? action.payload : c
                        )
                    }
                }
            };
        case REMOVE_CREATURE: {
            return {
                ...state,
                status: {
                    ...state.status,
                    creatures: {
                        ...state.status.creatures,
                        [action.payload.faction]: state.status.creatures[action.payload.faction].filter(c => c.id !== action.payload.id)
                    }
                }, gameOver: action.payload.faction === Faction.Player
            };
        }
        case LOAD_ZONE:
            return {
                ...state,
                zoneLoaded: false,
                status: action.payload
            };
        case SAVE_VISITED_ZONE: {
            return {
                ...state,
                visitedZones: state.visitedZones.map(z => z.name).includes(action.payload.name)
                    ? state.visitedZones.map(z => z.name === action.payload.name ? action.payload : z) // zone has already been saved so replace it
                    : state.visitedZones.concat(action.payload) // zone hasn't been saved before
            };
        }
        case REMOVE_VISITED_ZONE: {
            return {
                ...state,
                visitedZones: state.visitedZones.filter(z => z.name !== action.payload)
            };
        }
        case ADD_INTERACTABLE_TILES:
            return {
                ...state,
                status: {
                    ...state.status,
                    interactableTiles: state.status.interactableTiles.concat(action.payload)
                }
            };
        default:
            return state;
    }
};

export default reducer;