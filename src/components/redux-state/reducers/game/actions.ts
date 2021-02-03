import { Creature, ZoneStatus } from '../../../../types';
import { ZoneName } from '../../../../utils/load-data';
import {
    SET_GAME_OVER, GameActions, SAVE_PLAYER,
    LOAD_ZONE,
    SAVE_VISITED_ZONE,
    REMOVE_VISITED_ZONE,
    LOAD_ZONE_BY_NAME,
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

export const LoadZone = (zoneName: ZoneName): GameActions => {
    return {
        type: LOAD_ZONE,
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

export const LoadZoneByName = (zoneName: ZoneName, fresh: boolean, savePrevious: boolean): GameActions => {
    return {
        type: LOAD_ZONE_BY_NAME,
        payload: { zoneName, fresh, savePrevious }
    };
};


