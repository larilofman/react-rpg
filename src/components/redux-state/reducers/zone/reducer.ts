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
    zoneData: {
        name: "zone0",
        size: { w: 0, h: 0 },
        tiles: [],
        creatures: { [Faction.Player]: [], [Faction.Friendly]: [], [Faction.Hostile]: [] },
        interactableTiles: []
    },
    mapLoaded: false,
    visitedZones: [],
    gameOver: false
};

const reducer = (state = initialState, action: ZoneActions) => {
    switch (action.type) {
        case SET_MAP:
            return {
                ...state,
                zoneData: action.payload,
                mapLoaded: true
            };

        case MOVE_CREATURE: {
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
        case ADD_CREATURES:
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
        case DAMAGE_CREATURE:
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
        case REMOVE_CREATURE: {
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
        case LOAD_ZONE:
            return {
                ...state,
                mapLoaded: false,
                // visitedZones: state.visitedZones.filter(z => z.name !== action.payload.zoneName),
                zoneData: action.payload
            };
        // case LOAD_VISITED_ZONE: {
        //     return {
        //         ...state,
        //         mapLoaded: false,
        //         zoneData: action
        //     };
        //     // const visitedZone = state.visitedZones.find(z => z.name === action.payload.zoneName);
        //     // if (visitedZone) {
        //     //     return {
        //     //         ...state,
        //     //         mapLoaded: false,
        //     //         playerPosition: action.payload.playerPosition || visitedZone.creatures[Faction.Player][0].pos,
        //     //         zoneData: {
        //     //             ...state.zoneData,
        //     //             name: action.payload.zoneName,
        //     //             creatures: { ...visitedZone.creatures, [Faction.Player]: state.zoneData.creatures[Faction.Player] },
        //     //             interactableTiles: visitedZone.interactableTiles,
        //     //             tiles: visitedZone.tiles,
        //     //             size: visitedZone.size
        //     //         }
        //     //     };
        //     // }
        //     // console.error(`visited zone ${action.payload.zoneName} failed to load`);
        //     // return state;

        // }
        case SAVE_VISITED_ZONE: {
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
        case REMOVE_VISITED_ZONE: {
            return {
                ...state,
                visitedZones: state.visitedZones.filter(z => z.name !== action.payload)
            };
        }
        case ADD_INTERACTABLE_TILES:
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

    // case ActionType.SET_FACTION_TURN:
    //         return {
    //             ...state,
    //             turn: {
    //                 ...state.turn,
    //                 count: action.payload === Faction.Player ? state.turn.count + 1 : state.turn.count,
    //                 faction: action.payload
    //             }
    //         };
    //     case ActionType.SET_CREATURE_TURN:
    //         return {
    //             ...state,
    //             turn: {
    //                 ...state.turn,
    //                 creature: action.payload
    //             }
    //         };
};

export default reducer;