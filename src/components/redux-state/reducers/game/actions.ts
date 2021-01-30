import {SET_GAME_OVER, GameActions} from './types';

export function SetGameOver(gameOver: boolean): GameActions {
    return {
        type: SET_GAME_OVER,
        payload: gameOver
    };
}


