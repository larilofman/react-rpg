import { Creature } from '../../../../types';
import { SET_GAME_OVER, GameActions, SAVE_PLAYER } from './types';

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


