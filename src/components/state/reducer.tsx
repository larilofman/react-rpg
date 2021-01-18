import { Faction } from '../../types';
import { State, Action, ActionType } from '../state';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.SET_PLAYER_POSITION:
            return {
                ...state,
                playerPosition: action.payload
            };
        case ActionType.SET_MAP:
            return {
                ...state,
                zoneData: action.payload,
                mapLoaded: true
            };
        case ActionType.SET_FACTION_TURN:
            return {
                ...state,
                turn: {
                    ...state.turn,
                    count: action.payload === Faction.Player ? state.turn.count + 1 : state.turn.count,
                    faction: action.payload
                }
            };
        case ActionType.SET_CREATURE_TURN:
            return {
                ...state,
                turn: {
                    ...state.turn,
                    creature: action.payload
                }
            };
        case ActionType.SET_CAMERA_POSITION:
            return {
                ...state,
                cameraPosition: action.payload
            };
        case ActionType.MOVE_CREATURE: {
            return {
                ...state,
                zoneData: {
                    ...state.zoneData,
                    creatures: {
                        ...state.zoneData.creatures,
                        [action.payload.creature.faction]: state.zoneData.creatures[action.payload.creature.faction].map(
                            c => c.id !== action.payload.creature.id
                                ? c
                                : { ...c, pos: action.payload.pos }
                        )
                    }

                }
            };
        }
        case ActionType.ADD_CREATURES:
            return {
                ...state,
                zoneData: {
                    ...state.zoneData,
                    creatures: {
                        ...state.zoneData.creatures,
                        [action.payload.faction]: state.zoneData.creatures[action.payload.faction].concat(action.payload.creatures)
                    }
                }
            };
        case ActionType.DAMAGE_CREATURE:
            return {
                ...state,
                zoneData: {
                    ...state.zoneData,
                    creatures: {
                        ...state.zoneData.creatures,
                        [action.payload.faction]: state.zoneData.creatures[action.payload.faction].map(
                            c => c.id === action.payload.id ? action.payload : c
                        )
                    }
                }
            };
        case ActionType.REMOVE_CREATURE: {
            return {
                ...state,
                zoneData: {
                    ...state.zoneData,
                    creatures: {
                        ...state.zoneData.creatures,
                        [action.payload.faction]: state.zoneData.creatures[action.payload.faction].filter(c => c.id !== action.payload.id)
                    }
                }, gameOver: action.payload.faction === Faction.Player
            };
        }
        default:
            return state;
    }
};


                // zoneData: {
                //     tiles: 
                //     })
                //}

