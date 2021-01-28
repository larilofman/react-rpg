import React, { useEffect } from 'react';
import Sprite from '../sprite';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useWander from '../../hooks/use-wander';
import { useStateValue } from '../state';
import { Position, BaseCreature, TileStatus, Faction } from '../../types';
import useGetTiles from '../../hooks/use-get-tiles';
import useContact from '../../hooks/use-contact';
import { isInMeleeRange, isInRange } from '../../utils/calculate-distance';
import usePathFinding from '../../hooks/use-pathfinding';
import useMoveCreature from '../state/action-hooks/useMoveCreature';


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
    const [{ mapLoaded }] = useStateValue();
    const { walk, position } = useWalk(props.startPosition);
    const { moveCreature } = useMoveCreature();
    const { dir, step, setAnimState } = useAnimation(3);

    const { playerPosition, turn } = useSelector((state: RootState) => ({ playerPosition: state.playerPosition, turn: state.turn }));

    useEffect(() => {
        if (mapLoaded) {
            moveCreature(props.data, props.startPosition);
        }
    }, [mapLoaded]);

    // On creature's turn render the sprite and inner component, setting it idle if not visible on the camera
    // If not creature's turn and it's visible, just render the sprite
    return (
        <>
            {turn.creature === props.data.id && <MemoizedInnerNPC
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
    const { contact } = useContact();
    const { findPath } = usePathFinding();
    const { getRandomNearbyPos } = useWander();
    const { getTileStatus } = useGetTiles();

    // console.log('inner npc renders');

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

// const areEqual = (prevProps: Readonly<React.PropsWithChildren<InnerProps>>, nextProps: Readonly<React.PropsWithChildren<InnerProps>>) => {
//     // if (prevProps.playerPosition.x !== nextProps.playerPosition.x) return false;
//     // if (prevProps.playerPosition.y !== nextProps.playerPosition.y) return false;
//     // console.log('nothing changed on npc', prevProps.data.id);
//     return true;
// };

const MemoizedInnerNPC = React.memo(InnerNPC);

export default Npc;
