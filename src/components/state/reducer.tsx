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
                playerPosition: action.payload.playerPosition || { x: 0, y: 0 },
                visitedZones: state.visitedZones.filter(z => z.name !== action.payload.zoneName),
                zoneData: {
                    ...state.zoneData,
                    name: action.payload.zoneName,
                    creatures: { [Faction.Player]: state.zoneData.creatures[Faction.Player], [Faction.Friendly]: [], [Faction.Hostile]: [] },
                    interactableTiles: [],
                    tiles: [],
                    size: { w: 0, h: 0 }
                }
            };
        case ActionType.LOAD_VISITED_ZONE: {
            const visitedZone = state.visitedZones.find(z => z.name === action.payload.zoneName);
            if (visitedZone) {
                return {
                    ...state,
                    mapLoaded: false,
                    playerPosition: action.payload.playerPosition || visitedZone.creatures[Faction.Player][0].pos,
                    zoneData: {
                        ...state.zoneData,
                        name: action.payload.zoneName,
                        creatures: { ...visitedZone.creatures, [Faction.Player]: state.zoneData.creatures[Faction.Player] },
                        interactableTiles: visitedZone.interactableTiles,
                        tiles: visitedZone.tiles,
                        size: visitedZone.size
                    }
                };
            }
            console.error(`visited zone ${action.payload.zoneName} failed to load`);
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
        case ActionType.LOAD_ZONE: {
            console.log(action.payload);
            return {
                ...state
            };
        }
        case ActionType.ADD_INTERACTABLE_TILES:
            return {
                ...state,
                zoneData: {
                    ...state.zoneData,
                    interactableTiles: state.zoneData.interactableTiles.concat(action.payload)
                }
            };
        default:
            return state;

    }
};