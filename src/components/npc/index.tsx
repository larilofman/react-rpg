import React, { useEffect } from 'react';
import GameObject from '../game-object';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useWander from '../../hooks/use-wander';
import { useStateValue } from '../state';
import { Position, BaseCreature, TileStatus, Faction } from '../../types';
import useGetTileInDirection from '../../hooks/use-get-tile';
import useMoveCreature from '../state/action-hooks/useMoveCreature';
import useContact from '../../hooks/use-contact';

interface Props {
    skin: string,
    startPosition: Position
    data: BaseCreature
    useTurn: (faction: Faction) => void
}

const Npc: React.FC<Props> = ({ skin, startPosition, data, useTurn }) => {
    const [{ mapLoaded, turn }] = useStateValue();
    const { getRandomNearbyPos } = useWander();
    const { getTileStatus } = useGetTileInDirection();
    const { walk, position } = useWalk(startPosition);
    const { dir, step, setAnimState } = useAnimation(3);
    const { moveCreature } = useMoveCreature();
    const { contact } = useContact();

    useEffect(() => {
        if (mapLoaded) {
            moveCreature(data, startPosition);
        }
    }, [mapLoaded]);

    useEffect(() => {
        if (turn.faction === data.faction) {
            wander();
        }
    }, [turn]);

    const wander = () => {
        const newPos = getRandomNearbyPos(position);

        const tileStatus = getTileStatus(newPos);
        if (tileStatus === TileStatus.Passable) {
            walk(data, newPos);
        }

        useTurn(data.faction);
        setAnimState(position, newPos);
    };

    return <GameObject
        spriteData={{
            offset_x: step,
            offset_y: dir,
            image: `/sprites/skins/${skin}.png`,
            layer: 1
        }}
        position={position}
    />;

};

export default Npc;
