import React from 'react';
import { Faction, } from '../../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';
import CreatureSpawner from '../spawner';
import CreatureRenderer from '../renderer';
import useUseTurn from '../../../hooks/use-use-turn';


const CreatureManager: React.FC = () => {
    const { useTurn } = useUseTurn();
    const { player, zoneName, creaturesLoaded, tilesLoaded } = useSelector((state: RootState) => (
        {
            zoneName: state.zone.name,
            creaturesLoaded: state.zone.creaturesLoaded,
            tilesLoaded: state.zone.tilesLoaded,
            player: state.zone.creatures[Faction.Player][0]
        }
    ));

    if (!tilesLoaded) return null;

    return (
        <>
            <CreatureSpawner
                zoneName={zoneName}
                player={player}
                creaturesLoaded={creaturesLoaded} />
            <CreatureRenderer useTurn={useTurn} />

        </>
    );


};

export default CreatureManager;