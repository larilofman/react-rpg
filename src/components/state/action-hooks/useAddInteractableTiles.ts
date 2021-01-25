import {  InteractableTile } from '../../../types';
import { useStateValue, ActionType } from '../index';

export default function useAddInteractableTiles() {
    const [, dispatch] = useStateValue();

    const addInteractableTiles = (interactableTiles: InteractableTile[]) => {
        dispatch(
            {
                type: ActionType.ADD_INTERACTABLE_TILES,
                payload: interactableTiles
            });
    };

    return {
        addInteractableTiles
    };
}


