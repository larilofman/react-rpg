const ACTION =
{
    "SET_PLAYER_POSITION": "SET_PLAYER_POSITION",

};

export const reducer = (state, action) => {
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

export const setPlayerPosition = (position) => {
    console.log('reducer', position);
    return (
        {
            type: ACTION.SET_PLAYER_POSITION,
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