import React from 'react';
import CreatureManager from '../creature/manager';
import MapManager from '../map/manager';
import ObjectManager from '../object-manager';

import { useSelector } from 'react-redux';
import { RootState } from '../redux-state/store/index';

const GameManager: React.FC = () => {
    const { visitedZones, zoneName } = useSelector((state: RootState) => (
        {
            zoneLoaded: state.zone.zoneLoaded,
            visitedZones: state.zone.visitedZones,
            zoneName: state.zone.name
        }
    ));

    const freshZone = () => {
        return !visitedZones.map(z => z.name).includes(zoneName);
    };

    return (
        <>
            <MapManager />
            <ObjectManager freshZone={freshZone} />
            <CreatureManager freshZone={freshZone} />
        </>
    );
};

export default GameManager;