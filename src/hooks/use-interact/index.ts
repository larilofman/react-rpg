import { Position, InteractableTileType, InteractableTile } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../components/redux-state/store';
import { useEffect, useState } from 'react';
import { LoadZone } from '../../components/redux-state/reducers/zone/actions';

export default function useInteract() {
    const dispatch = useDispatch();
    const interactableTiles = useSelector((state: RootState) => state.zone.interactableTiles);
    const [interactedTile, setInteractedTile] = useState<InteractableTile | undefined>();

    const checkInteraction = (pos: Position) => {
        const tile = interactableTiles.find(t => t.position.x === pos.x && t.position.y === pos.y);
        setInteractedTile(tile);
    };

    function interact() {
        switch (interactedTile?.type) {
            case InteractableTileType.ZoneRoute:
                dispatch(LoadZone(interactedTile));
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (interactedTile) {
            console.log(interactedTile.popUpMessage);
        }
    }, [interactedTile]);


    return {
        interact, checkInteraction
    };
}