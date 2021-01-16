import { useState } from 'react';
import { Position, Creature } from '../../types';
import useMoveCreature from '../../components/state/action-hooks/useMoveCreature';

export default function useWalk(startPos?: Position) {
    const [position, setPosition] = useState<Position>(startPos || { x: 0, y: 0 });
    const { moveCreature } = useMoveCreature();

    function walk(creature: Creature, newPos: Position) {
        setPosition(newPos);
        moveCreature({ ...creature, pos: newPos });
    }

    return {
        walk, position
    };
}