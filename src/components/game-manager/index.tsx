import React from 'react';
import CreatureManager from '../creature/manager';
import MapManager from '../map/manager';
import ObjectManager from '../object-manager';

import { useSelector } from 'react-redux';
import { RootState } from '../redux-state/store/index';

const GameManager: React.FC = () => {
    const { visitedZones, zoneStatus } = useSelector((state: RootState) => (
        {
            zoneLoaded: state.zone.zoneLoaded,
            visitedZones: state.zone.visitedZones,
            zoneStatus: state.zone.status
        }
    ));

    const freshZone = () => {
        return !visitedZones.map(z => z.name).includes(zoneStatus.name);
    };

    return (
        <>
            <MapManager />
            <CreatureManager freshZone={freshZone} />
            <ObjectManager freshZone={freshZone} />
        </>
    );
};

export default GameManager;