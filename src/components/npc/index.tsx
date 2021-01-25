import React, { useEffect } from 'react';
import Sprite from '../sprite';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useWander from '../../hooks/use-wander';
import { useStateValue } from '../state';
import { Position, BaseCreature, TileStatus } from '../../types';
import useGetTiles from '../../hooks/use-get-tiles';
import useContact from '../../hooks/use-contact';
import { isInMeleeRange, isInRange } from '../../utils/calculate-distance';
import usePathFinding from '../../hooks/use-pathfinding';
import useMoveCreature from '../state/action-hooks/useMoveCreature';

interface Props {
    skin: string,
    startPosition: Position
    data: BaseCreature
    useTurn: (creature: BaseCreature) => void
    aggroDistance?: number
    stationary?: boolean,
    hostile?: boolean
}

const Npc: React.FC<Props> = ({ skin, startPosition, data, useTurn, aggroDistance = 5, stationary = false, hostile = true }) => {
    const [{ mapLoaded, turn, playerPosition }] = useStateValue();
    const { getRandomNearbyPos } = useWander();
    const { getTileStatus } = useGetTiles();
    const { walk, position } = useWalk(startPosition);
    const { dir, step, setAnimState } = useAnimation(3);
    const { contact } = useContact();
    const { findPath } = usePathFinding();
    const { moveCreature } = useMoveCreature();

    useEffect(() => {
        if (mapLoaded) {
            moveCreature(data, startPosition);
        }
    }, [mapLoaded]);

    useEffect(() => {
        if (turn.creature === data.id && turn.faction === data.faction) {
            if (stationary) { // Idle
                useTurn(data);
            } else if (hostile && isInMeleeRange(position, playerPosition)) { // Melee
                contactCreature(playerPosition);
            } else if (hostile && isInRange(position, playerPosition, aggroDistance)) { // Chase
                const nextPos = findPath(position, playerPosition);
                if (nextPos) {
                    move(nextPos);
                }
            } else {
                wander(); // Wander
            }
        }
    }, [turn]);

    const move = (newPos: Position) => {
        walk(data, newPos);
        setAnimState(position, newPos);
        useTurn(data);
    };

    const contactCreature = (contactPos: Position) => {
        contact(data, contactPos);
        useTurn(data);
        setAnimState(position, contactPos);
    };

    const wander = () => {
        const newPos = getRandomNearbyPos(position);

        const tileStatus = getTileStatus(newPos);
        if (tileStatus === TileStatus.Passable) {
            walk(data, newPos);
        }

        useTurn(data);
        setAnimState(position, newPos);
    };

    return <Sprite
        data={{
            offset_x: step,
            offset_y: dir,
            image: `/sprites/skins/${skin}.png`,
            layer: 3
        }}
        position={position}
    />;

};

export default Npc;
