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
        case ActionType.USE_TURN: {
            let turnOf = Faction.Player;

            if (!state.zoneData.creatures[Faction.Hostile].length && !state.zoneData.creatures[Faction.Friendly].length) {
                turnOf = Faction.Player;
            } else {
                switch (action.payload) {
                    case Faction.Player:
                        turnOf = Faction.Hostile;
                        break;
                    case Faction.Friendly:
                        break;
                    case Faction.Hostile:
                        turnOf = Faction.Player;
                        break;
                    default:
                        break;
                }
            }
            // turnOf = (!state.zoneData.creatures[Faction.Hostile] && !state.zoneData.creatures[Faction.Friendly]) ? Faction.Player : Faction.Hostile;
            return {
                ...state,
                turnOf
            };
        }
        case ActionType.SET_CAMERA_POSITION:
            return {
                ...state,
                cameraPosition: action.payload
            };
        case ActionType.MOVE_CREATURE: {
            const occupiedX = action.payload.newPos.x;
            const occupiedY = action.payload.newPos.y;

            const tiles = state.zoneData.tiles;

            if (action.payload.oldPos) {
                const freedX = action.payload.oldPos.x;
                const freedY = action.payload.oldPos.y;
                tiles[freedY][freedX].occupant = undefined;
            }

            tiles[occupiedY][occupiedX].occupant = action.payload.creature.id;

            return {
                ...state,
                zoneData: {
                    ...state.zoneData,
                    tiles: tiles,
                    creatures: {
                        ...state.zoneData.creatures,
                        [action.payload.creature.faction]: state.zoneData.creatures[action.payload.creature.faction].map(
                            c => c.id !== action.payload.creature.id
                                ? c
                                : {
                                    ...c,
                                    pos: { x: occupiedX, y: occupiedY }
                                }
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
            const tiles = state.zoneData.tiles;
            tiles[action.payload.pos.y][action.payload.pos.x].occupant = undefined;
            return {
                ...state,
                zoneData: {
                    ...state.zoneData,
                    creatures: {
                        ...state.zoneData.creatures,
                        [action.payload.faction]: state.zoneData.creatures[action.payload.faction].filter(c => c.id !== action.payload.id)
                    }, tiles //: (() => { return state.zoneData.tiles; })()
                }
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

