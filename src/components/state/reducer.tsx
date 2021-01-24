import { Faction } from '../../types';
import { State, Action, ActionType } from '../state';
import { ZoneName } from '../../utils/load-zone-data';

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
        case ActionType.ADD_COMBAT_LOG_ENTRY: {
            return {
                ...state,
                combatLog: state.combatLog.concat(`Turn ${state.turn.count}: ${action.payload}`)
            };
        }
        case ActionType.LOAD_FRESH_ZONE:
            return {
                ...state,
                mapLoaded: false,
                playerPosition: { x: 0, y: 0 },
                visitedZones: state.visitedZones.filter(z => z.name !== action.payload),
                zoneData: {
                    ...state.zoneData,
                    name: action.payload,
                    creatures: { 0: [], 1: [], 2: [] }
                }
            };
        case ActionType.LOAD_VISITED_ZONE: {
            const visitedZone = state.visitedZones.find(z => z.name === action.payload);
            if (visitedZone) {
                return {
                    ...state,
                    mapLoaded: false,
                    playerPosition: visitedZone.creatures[Faction.Player][0].pos,
                    zoneData: {
                        ...state.zoneData,
                        name: action.payload,
                        creatures: visitedZone.creatures
                    }
                };
            }

            return state;

        }
        case ActionType.SAVE_VISITED_ZONE: {
            const prevZones = state.visitedZones;

            let zoneFound = false;
            for (let i = 0; i < prevZones.length; i++) {
                if (prevZones[i].name === action.payload.name) {
                    prevZones[i] = action.payload;
                    zoneFound = true;
                    break;
                }
            }

            if (!zoneFound) {
                prevZones.push(action.payload);
            }

            return {
                ...state,
                visitedZones: prevZones
            };
        }
        default:
            return state;

    }
};