import { Creature, ZoneStatus } from '../../../../types';
import { ZoneName } from '../../../../data/zones';
import {
    SET_GAME_OVER, GameActions, SAVE_PLAYER,
    LOAD_ZONE,
    SAVE_VISITED_ZONE,
    REMOVE_VISITED_ZONE,
    RESET_PLAYER,
    LOAD_SAVED_ZONE,
} from './types';

export function SetGameOver(gameOver: boolean): GameActions {
    return {
        type: SET_GAME_OVER,
        payload: gameOver
    };
}

export function SavePlayer(player: Creature): GameActions {
    return {
        type: SAVE_PLAYER,
        payload: player
    };
}

export function ResetPlayer(): GameActions {
    return {
        type: RESET_PLAYER
    };
}

export const LoadZone = (zoneName: ZoneName): GameActions => {
    return {
        type: LOAD_ZONE,
        payload: zoneName
    };
};

export const LoadSavedZone = (zoneName: ZoneName): GameActions => {
    return {
        type: LOAD_SAVED_ZONE,
        payload: zoneName
    };
};

export const SaveVisitedZone = (zoneStatus: ZoneStatus): GameActions => {
    return {
        type: SAVE_VISITED_ZONE,
        payload: zoneStatus
    };
};

export const RemoveVisitedZone = (zoneName: ZoneName): GameActions => {
    return {
        type: REMOVE_VISITED_ZONE,
        payload: zoneName
    };
};


