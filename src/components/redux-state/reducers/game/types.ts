import { Creature } from "../../../../types";
export const SET_GAME_OVER = 'SET_GAME_OVER';
export const SAVE_PLAYER = 'SAVE_PLAYER';

interface SetGameOver {
    type: typeof SET_GAME_OVER,
    payload: boolean
}

interface SavePlayer {
    type: typeof SAVE_PLAYER,
    payload: Creature
}

export type GameActions =
    SetGameOver |
    SavePlayer

export type GameState = {
    gameOver: boolean
    player: Creature
}

