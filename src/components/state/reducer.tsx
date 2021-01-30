import { State, Action } from '../state';

export const reducer = (state: State, action: Action): State => {
    return state;
    // switch (action.type) {
    //     // case ActionType.SET_FACTION_TURN:
    //     //     return {
    //     //         ...state,
    //     //         turn: {
    //     //             ...state.turn,
    //     //             count: action.payload === Faction.Player ? state.turn.count + 1 : state.turn.count,
    //     //             faction: action.payload
    //     //         }
    //     //     };
    //     // case ActionType.SET_CREATURE_TURN:
    //     //     return {
    //     //         ...state,
    //     //         turn: {
    //     //             ...state.turn,
    //     //             creature: action.payload
    //     //         }
    //     //     };

    //     case ActionType.ADD_CREATURES:
    //         return {
    //             ...state,
    //             zoneStatus: {
    //                 ...state.zoneStatus,
    //                 creatures: {
    //                     ...state.zoneStatus.creatures,
    //                     [action.payload.faction]: state.zoneStatus.creatures[action.payload.faction].concat(action.payload.creatures)
    //                 }
    //             }
    //         };
    //     case ActionType.DAMAGE_CREATURE:
    //         return {
    //             ...state,
    //             zoneStatus: {
    //                 ...state.zoneStatus,
    //                 creatures: {
    //                     ...state.zoneStatus.creatures,
    //                     [action.payload.faction]: state.zoneStatus.creatures[action.payload.faction].map(
    //                         c => c.id === action.payload.id ? action.payload : c
    //                     )
    //                 }
    //             }
    //         };
    //     case ActionType.REMOVE_CREATURE: {
    //         return {
    //             ...state,
    //             zoneStatus: {
    //                 ...state.zoneStatus,
    //                 creatures: {
    //                     ...state.zoneStatus.creatures,
    //                     [action.payload.faction]: state.zoneStatus.creatures[action.payload.faction].filter(c => c.id !== action.payload.id)
    //                 }
    //             }, gameOver: action.payload.faction === Faction.Player
    //         };
    //     }
    //     case ActionType.LOAD_FRESH_ZONE:
    //         return {
    //             ...state,
    //             mapLoaded: false,
    //             // playerPosition: action.payload.playerPosition || { x: 0, y: 0 },
    //             visitedZones: state.visitedZones.filter(z => z.name !== action.payload.zoneName),
    //             zoneStatus: {
    //                 ...state.zoneStatus,
    //                 name: action.payload.zoneName,
    //                 creatures: { [Faction.Player]: state.zoneStatus.creatures[Faction.Player], [Faction.Friendly]: [], [Faction.Hostile]: [] },
    //                 interactableTiles: [],
    //                 tiles: [],
    //                 size: { w: 0, h: 0 }
    //             }
    //         };
    //     case ActionType.LOAD_VISITED_ZONE: {
    //         const visitedZone = state.visitedZones.find(z => z.name === action.payload.zoneName);
    //         if (visitedZone) {
    //             return {
    //                 ...state,
    //                 mapLoaded: false,
    //                 // playerPosition: action.payload.playerPosition || visitedZone.creatures[Faction.Player][0].pos,
    //                 zoneStatus: {
    //                     ...state.zoneStatus,
    //                     name: action.payload.zoneName,
    //                     creatures: { ...visitedZone.creatures, [Faction.Player]: state.zoneStatus.creatures[Faction.Player] },
    //                     interactableTiles: visitedZone.interactableTiles,
    //                     tiles: visitedZone.tiles,
    //                     size: visitedZone.size
    //                 }
    //             };
    //         }
    //         console.error(`visited zone ${action.payload.zoneName} failed to load`);
    //         return state;

    //     }
    //     case ActionType.SAVE_VISITED_ZONE: {
    //         const prevZones = state.visitedZones;

    //         let zoneFound = false;
    //         for (let i = 0; i < prevZones.length; i++) {
    //             if (prevZones[i].name === action.payload.name) {
    //                 prevZones[i] = action.payload;
    //                 zoneFound = true;
    //                 break;
    //             }
    //         }

    //         if (!zoneFound) {
    //             prevZones.push(action.payload);
    //         }

    //         return {
    //             ...state,
    //             visitedZones: prevZones
    //         };
    //     }
    //     case ActionType.ADD_INTERACTABLE_TILES:
    //         return {
    //             ...state,
    //             zoneStatus: {
    //                 ...state.zoneStatus,
    //                 interactableTiles: state.zoneStatus.interactableTiles.concat(action.payload)
    //             }
    //         };
    //     default:
    //         return state;

    // }
};