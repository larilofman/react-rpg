import { useState } from 'react';
import { Position } from '../../types/general';
import { useDispatch } from 'react-redux';
import { MoveCreature } from '../../components/redux-state/reducers/zone/actions';
import { BaseCreature } from '../../types/creature';

export default function useWalk(startPos?: Position) {
    const [position, setPosition] = useState<Position>(startPos || { x: 0, y: 0 });
    const dispatch = useDispatch();

    function walk(creature: BaseCreature, pos: Position) {
        setPosition(pos);
        dispatch(MoveCreature(creature, pos));
    }

    return {
        walk, position
    };
}