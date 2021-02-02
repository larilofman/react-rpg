import React, { useEffect } from 'react';
import Sprite from '../sprite';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useWander from '../../hooks/use-wander';
import { Position, BaseCreature, TileStatus, Faction } from '../../types';
import useGetTiles from '../../hooks/use-get-tiles';
import useContact from '../../hooks/use-contact';
import { isInMeleeRange, isInRange } from '../../utils/calculate-distance';
import usePathFinding from '../../hooks/use-pathfinding';

import { useSelector } from 'react-redux';
import { RootState } from '../redux-state/store/';

interface Props {
    skin: string,
    startPosition: Position
    data: BaseCreature
    useTurn: (creature: BaseCreature) => void
    aggroDistance?: number
    stationary?: boolean,
    hostile?: boolean
    isVisible: boolean
}

const Npc: React.FC<Props> = (props) => {
    const { walk, position } = useWalk(props.startPosition);
    const { dir, step, setAnimState } = useAnimation(3);
    const { playerPosition, turn, creaturesLoaded } = useSelector((state: RootState) => (
        {
            playerPosition: state.zone.creatures[Faction.Player][0] && state.zone.creatures[Faction.Player][0].pos,
            turn: state.turn,
            creaturesLoaded: state.zone.creaturesLoaded
        }
    ));

    useEffect(() => {
        if (creaturesLoaded) {
            walk(props.data, props.startPosition);
        }
    }, [creaturesLoaded]);

    // On creature's turn render the sprite and inner component, setting it idle if not visible on the camera
    // If not creature's turn and it's visible, just render the sprite
    return (
        <>
            {turn.creature === props.data.id && <InnerNPC
                {...props}
                turn={turn}
                playerPosition={playerPosition}
                walk={walk}
                position={position}
                setAnimState={setAnimState}
                stationary={!props.isVisible}
            />}
            {props.isVisible && <Sprite
                data={{
                    offset_x: step,
                    offset_y: dir,
                    image: `/sprites/skins/${props.skin}.png`,
                    layer: 3
                }}
                position={position}
            />}
        </>
    );
};

interface InnerProps {
    data: BaseCreature
    useTurn: (creature: BaseCreature) => void
    aggroDistance?: number
    stationary?: boolean
    hostile?: boolean
    turn: { faction: Faction, count: number, creature: string }
    playerPosition: Position
    walk: (creature: BaseCreature, pos: Position) => void
    position: Position
    setAnimState: (oldPos: Position, newPos: Position, updateStep?: boolean) => void
}

const InnerNPC: React.FC<InnerProps> = (
    { data, useTurn, aggroDistance = 5, stationary = false, hostile = true, turn, playerPosition, walk, position, setAnimState }) => {
    const gameOver = useSelector((state: RootState) => state.game.gameOver);
    const { contact } = useContact();
    const { findPath } = usePathFinding();
    const { getRandomNearbyPos } = useWander();
    const { getTileStatus } = useGetTiles();

    useEffect(() => {
        if (turn.creature === data.id && turn.faction === data.faction) {
            if (stationary) { // Idle
                useTurn(data);
            } else if (hostile && !gameOver && isInMeleeRange(position, playerPosition)) { // Melee
                contactCreature(playerPosition);
            } else if (hostile && !gameOver && isInRange(position, playerPosition, aggroDistance)) { // Chase
                const nextPos = findPath(position, playerPosition);
                if (nextPos) {
                    move(nextPos);
                } else {
                    useTurn(data);
                }
            } else {
                wander(); // Wander
            }
        }
    }, [turn.creature]);

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

    return null;
};

export default Npc;
