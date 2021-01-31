import { Position, InteractableTileType, InteractableTile } from '../../types';
import useLoadZone from '../use-load-zone';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/redux-state/store';
import { useEffect, useState } from 'react';

export default function useInteract() {
    const interactableTiles = useSelector((state: RootState) => state.zone.interactableTiles);
    const { changeZone } = useLoadZone();
    const [interactedTile, setInteractedTile] = useState<InteractableTile | undefined>();

    const checkInteraction = (pos: Position) => {
        setInteractedTile(interactableTiles.find(t => t.position.x === pos.x && t.position.y === pos.y));
    };

    function interact() {
        switch (interactedTile?.type) {
            case InteractableTileType.ZoneRoute:
                changeZone(interactedTile);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        console.log(interactedTile);
        if (interactedTile) {
            console.log(interactedTile.popUpMessage);
        }
    }, [interactedTile]);


    return {
        interact, checkInteraction
    };
}