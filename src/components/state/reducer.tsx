import { State, Action } from '../state';
import { Position } from '../../types';


export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PLAYER_POSITION":
            return {
                ...state,
                playerPosition: action.payload
            };
        default:
            return state;
    }
};

export const setPlayerPosition = (position: Position) => {
    console.log('reducer', position);
    return (
        {
            type: "SET_PLAYER_POSITION",
            payload: position
        }
    );
};

// export const setActiveList = async (user: User, dispatch: React.Dispatch<Action>) => {
//     const userFromApi: User = await userService.getUser(user.id);
//     const list = userFromApi.activeList;

//     if (list) {
//         if (list.guests.map(g => g.id).includes(userFromApi.id) || list.user.id === userFromApi.id) {
//             dispatch(
//                 {
//                     type: "SET_ACTIVE_LIST" as "SET_ACTIVE_LIST",
//                     payload: list
//                 }
//             );
//         }
//     }
// };