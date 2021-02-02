import { Position, InteractableTileType, InteractableTile, Creature } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../components/redux-state/store';
import { useEffect, useState } from 'react';
import { LoadZone } from '../../components/redux-state/reducers/zone/actions';
import { SavePlayer } from '../../components/redux-state/reducers/game/actions';

export default function useInteract() {
    const dispatch = useDispatch();
    const interactableTiles = useSelector((state: RootState) => state.zone.interactableTiles);
    const [interactedTile, setInteractedTile] = useState<InteractableTile | undefined>();

    const checkInteraction = (pos: Position) => {
        const tile = interactableTiles.find(t => t.position.x === pos.x && t.position.y === pos.y);
        setInteractedTile(tile);
    };

    function interact(player: Creature) {
        switch (interactedTile?.type) {
            case InteractableTileType.ZoneRoute:
                dispatch(SavePlayer({ ...player, pos: interactedTile.linkedRoute.position }));
                dispatch(LoadZone(interactedTile.linkedRoute.zoneName));
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