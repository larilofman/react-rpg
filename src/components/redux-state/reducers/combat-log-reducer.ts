
const initialState: string[] = [];

const reducer = (state: string[] = initialState, action: any) => {
    switch (action.type) {
        case 'ADD_ENTRY':
            return [...state, action.payload];
        default:
            return state;
    }
};

// export const initializeAnecdotes = () => {
//     return async dispatch => {
//         const anecdotes = await anecdoteService.getAll()
//         dispatch({
//             type: 'INIT_ANECDOTES',
//             data: anecdotes
//         })
//     }
// }

export default reducer;