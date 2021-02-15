import { Position, InteractableTileType, InteractableTile } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../components/redux-state/store';
import { useEffect, useState } from 'react';
import useChangeZone from '../use-change-zone';
import { SetInfoMessage } from '../../components/redux-state/reducers/messages/actions';

export default function useInteract() {
    const { changeZone } = useChangeZone();
    const dispatch = useDispatch();
    const interactableTiles = useSelector((state: RootState) => state.zone.interactableTiles);
    const [interactedTile, setInteractedTile] = useState<InteractableTile | undefined>();
    const [prevInteractedTile, setPrevInteractedTile] = useState(false); // was last tile stood on interactable? used to keep welcome message on screen

    const checkInteraction = (pos: Position) => {
        const tile = interactableTiles.find(t => t.position.x === pos.x && t.position.y === pos.y);
        setInteractedTile(tile);
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
        if (interactedTile) {
            if (interactedTile.popUpMessage) {
                dispatch(SetInfoMessage(interactedTile.popUpMessage));
            }
            setPrevInteractedTile(true);
        } else if (prevInteractedTile) {
            dispatch(SetInfoMessage(""));
            setPrevInteractedTile(false);
        }
    }, [interactedTile]);


    return {
        interact, checkInteraction
    };
}