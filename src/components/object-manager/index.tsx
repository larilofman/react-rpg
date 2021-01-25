import React, { useEffect } from 'react';
import { useStateValue } from '../state';
import { InteractableTileType } from '../../types';
import { loadZoneData, ZoneName } from '../../utils/load-zone-data';
import ZoneRoute from '../object/zoneRoute';
import useAddInteractableTiles from '../state/action-hooks/useAddInteractableTiles';

interface Props {
    freshZone: () => boolean
}

const ObjectManager: React.FC<Props> = ({ freshZone }) => {
    const [{ mapLoaded, zoneData }] = useStateValue();
    // const [routes, setRoutes] = useState<ZoneRouteType[]>();
    const { addInteractableTiles } = useAddInteractableTiles();

    useEffect(() => {
        if (mapLoaded && freshZone()) {
            loadRoutes();
        }
    }, [mapLoaded]);

    const loadRoutes = () => {
        const routesData = loadZoneData(zoneData.name as ZoneName).zoneRoutes;
        // setRoutes(routesData);
        addInteractableTiles(routesData.map(route => ({ ...route, type: InteractableTileType.ZoneRoute })));
        // const creaturesToSpawn: { creature: CreatureType, amount: number, faction: Faction }[] = [];
        // Object.values(creatureData).forEach(c => { // find the creature's data by its name
        //     creaturesToSpawn.push({ creature: creatures[c.name as CreatureName] as CreatureType, amount: c.amount, faction: c.faction as unknown as Faction });
        // });
    };

    return (
        <>
            {zoneData.interactableTiles?.map(r => <ZoneRoute key={r.id} zoneRoute={r} />)}
        </>
    );
};

export default ObjectManager;
