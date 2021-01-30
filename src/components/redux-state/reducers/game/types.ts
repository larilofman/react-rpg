export const SET_GAME_OVER = 'SET_GAME_OVER';


interface SetGameOver {
    type: typeof SET_GAME_OVER,
    payload: boolean
}

export type GameActions = SetGameOver

export type GameState = {
    gameOver: boolean
}

