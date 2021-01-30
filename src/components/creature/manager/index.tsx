import React from 'react';
import { Faction, } from '../../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';
import CreatureSpawner from '../spawner';
import CreatureRenderer from '../renderer';
import useUseTurn from '../../../hooks/use-use-turn';

interface Props {
    freshZone: () => boolean
}

const CreatureManager: React.FC<Props> = ({ freshZone }) => {
    const { useTurn } = useUseTurn();
    const { player, zoneName, mapLoaded } = useSelector((state: RootState) => (
        {
            zoneName: state.zone.status.name,
            mapLoaded: state.zone.mapLoaded,
            player: state.zone.status.creatures[Faction.Player][0]
        }
    ));

    if (!mapLoaded) return null;

    return (
        <>
            <CreatureSpawner
                freshZone={freshZone}
                zoneName={zoneName}
                player={player}
                mapLoaded={mapLoaded} />
            <CreatureRenderer useTurn={useTurn} />

        </>
    );


};

export default CreatureManager;