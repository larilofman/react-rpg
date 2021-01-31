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
    const { player, zoneName, zoneLoaded } = useSelector((state: RootState) => (
        {
            zoneName: state.zone.name,
            zoneLoaded: state.zone.zoneLoaded,
            player: state.zone.creatures[Faction.Player][0]
        }
    ));

    if (!zoneLoaded) return null;

    return (
        <>
            <CreatureSpawner
                freshZone={freshZone}
                zoneName={zoneName}
                player={player}
                zoneLoaded={zoneLoaded} />
            <CreatureRenderer useTurn={useTurn} />

        </>
    );


};

export default CreatureManager;