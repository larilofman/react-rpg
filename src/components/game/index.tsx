import React, { useEffect } from 'react';
import './style.css';
import { displaySize, tileSize } from '../../data/settings/general.json';
import { useDispatch, useSelector } from 'react-redux';
import CreatureManager from '../creature/manager';
import MapManager from '../map/manager';
import ObjectManager from '../objects/manager';
import { ResetTurn } from '../redux-state/reducers/turn/actions';
import { InitZone } from '../redux-state/reducers/zone/actions';
import { RootState } from '../redux-state/store';

const Game: React.FC = () => {
    const dispatch = useDispatch();
    const currentZone = useSelector((state: RootState) => state.game.currentZone);

    useEffect(() => {
        dispatch(InitZone(currentZone.name));
        dispatch(ResetTurn());
    }, [currentZone]);

    return (
        <div
            id="zone-container"
            style={{
                width: displaySize.w * tileSize.w,
                height: displaySize.h * tileSize.h
            }}>
            <MapManager />
            <ObjectManager />
            <CreatureManager />
        </div>
    );
};

export default Game;