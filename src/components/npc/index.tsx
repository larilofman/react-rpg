import React, { useEffect, useState } from 'react';
import GameObject from '../game-object';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useWander from '../../hooks/use-wander';
import { useStateValue } from '../state';
import { Position, BaseCreature, TileStatus, Faction, NPCAIState } from '../../types';
import useGetTiles from '../../hooks/use-get-tiles';
import useContact from '../../hooks/use-contact';
import calculateDistance from '../../utils/calculate-distance';
import usePathFinding from '../../hooks/use-pathfinding';
import useMoveCreature from '../state/action-hooks/useMoveCreature';

interface Props {
    skin: string,
    startPosition: Position
    data: BaseCreature
    useTurn: (faction: Faction) => void
    aggroDistance?: number
    stationary?: boolean
}

const Npc: React.FC<Props> = ({ skin, startPosition, data, useTurn, aggroDistance = 5, stationary = false }) => {
    const [{ mapLoaded, turn, playerPosition }] = useStateValue();
    const { getRandomNearbyPos } = useWander();
    const { getTileStatus, getRandomNearbyFloorTile } = useGetTiles();
    const { walk, position } = useWalk(startPosition);
    const { dir, step, setAnimState } = useAnimation(3);
    const { contact } = useContact();
    const [AIState, setAIState] = useState<NPCAIState>(NPCAIState.Idle);
    const { findPath } = usePathFinding();
    const { moveCreature } = useMoveCreature();

    const canAct = () => turn.faction === data.faction;

    useEffect(() => {
        if (mapLoaded) {
            moveCreature(data, startPosition);
        }
    }, [mapLoaded]);

    useEffect(() => {
        if (canAct()) {
            if (stationary) {
                setAIState(NPCAIState.Idle);
            } else if (calculateDistance(position, playerPosition) < 1.2) {
                setAIState(NPCAIState.Melee);
            } else if (calculateDistance(position, playerPosition) < aggroDistance) {
                setAIState(NPCAIState.Chase);
            } else {
                setAIState(NPCAIState.Wander);
            }
        }
    }, [turn]);

    useEffect(() => {
        if (canAct()) {
            switch (AIState) {
                case NPCAIState.Wander:
                    wander();
                    break;
                case NPCAIState.Chase: {
                    const nextPos = findPath(position, playerPosition);
                    // const nextPos = findPath(position, getRandomNearbyFloorTile(playerPosition, false).position );
                    if (nextPos) {
                        move(nextPos);
                    }
                    break;
                }
                case NPCAIState.Melee:
                    contactCreature(playerPosition);
                    break;
                case NPCAIState.Idle:
                    useTurn(data.faction);
                    break;
                default:
                    break;
            }
        }
    }, [AIState, turn]);

    const move = (newPos: Position) => {
        walk(data, newPos);
        setAnimState(position, newPos);
        useTurn(data.faction);
    };

    const contactCreature = (contactPos: Position) => {
        contact(data, contactPos);
        useTurn(data.faction);
        setAnimState(position, contactPos);
    };

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
