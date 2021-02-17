import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';
import CreatureSpawner from '../spawner';
import CreatureRenderer from '../renderer';
import TurnManager from '../../turn-manager';

const CreatureManager: React.FC = () => {
    const { zoneName, creaturesLoaded, tilesLoaded } = useSelector((state: RootState) => (
        {
            zoneName: state.game.currentZone.name,
            creaturesLoaded: state.zone.creaturesLoaded,
            tilesLoaded: state.zone.tilesLoaded
        }
    ));

    if (!tilesLoaded) return null;

    return (
        <>
            <CreatureSpawner
                zoneName={zoneName}
                creaturesLoaded={creaturesLoaded} />
            <TurnManager />
            <CreatureRenderer />
        </>
    );


};

export default CreatureManager;