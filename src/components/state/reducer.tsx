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
        case ActionType.OCCUPY_TILE: {
            const occupiedX = action.payload.creature.pos.x;
            const occupiedY = action.payload.creature.pos.y;
            const freedX = action.payload.oldPos.x;
            const freedY = action.payload.oldPos.y;
            const tiles = state.zoneData.tiles;
            tiles[freedY][freedX].occupant = undefined;
            tiles[occupiedY][occupiedX].occupant = action.payload.creature;

            return {
                ...state,
                zoneData: {
                    ...state.zoneData,
                    tiles: tiles
                }
            };
        }
        case ActionType.ADD_CREATURES: {
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
        }
        case ActionType.ATTACK_CREATURE: {
            const attackedCreature = state.zoneData.creatures[action.payload.target.faction].find(c => c.id === action.payload.target.id);
            console.log(attackedCreature);
            return {
                ...state,
                zoneData: {
                    ...state.zoneData,
                    creatures: {
                        ...state.zoneData.creatures,
                        [action.payload.target.faction]: state.zoneData.creatures[action.payload.target.faction].filter(c => c.id !== action.payload.target.id)
                    }
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

