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
        case ActionType.USE_PLAYER_TURN:
            return {
                ...state,
                playerTurn: false
            };
        case ActionType.USE_ENEMY_TURN:
            return {
                ...state,
                playerTurn: true
            };
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
            tiles[occupiedY][occupiedX].occupant = action.payload.creature;
            tiles[freedY][freedX].occupant = null;


            return {
                ...state,
                zoneData: {
                    ...state.zoneData,
                    tiles: tiles
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

