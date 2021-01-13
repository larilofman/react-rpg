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
            const turnOf = action.payload === Faction.Player ? Faction.Hostile : Faction.Player;
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
                    creatures: state.zoneData.creatures.concat(action.payload)
                }
            };
        }
        case ActionType.ATTACK_CREATURE: {
            const attackedCreature = state.zoneData.creatures.find(c => c.id === action.payload.target.id);
            console.log(attackedCreature);
            return {
                ...state,
                zoneData: {
                    ...state.zoneData,
                    creatures: state.zoneData.creatures.filter(c => c.id !== action.payload.target.id)
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

