import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatureManager from '../creature/manager';
import MapManager from '../map/manager';
import ObjectManager from '../objects/manager';
import { ResetTurn } from '../redux-state/reducers/turn/actions';
import { InitZone } from '../redux-state/reducers/zone/actions';
import { RootState } from '../redux-state/store';

const GameManager: React.FC = () => {
    const dispatch = useDispatch();
    const currentZone = useSelector((state: RootState) => state.game.currentZone);

    useEffect(() => {
        dispatch(InitZone(currentZone.name));
        dispatch(ResetTurn());
    }, [currentZone]);

    return (
        <>
            <MapManager />
            <ObjectManager />
            <CreatureManager />
        </>
    );
};

export default GameManager;