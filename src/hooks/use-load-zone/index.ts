import { Faction, ZoneStatus, ZoneRouteType } from '../../types';
import { loadZoneData, ZoneName } from '../../utils/load-data';
import useAddVisitedZone from '../use-add-visited-zone';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../components/redux-state/store';
import { LoadZone, RemoveVisitedZone } from '../../components/redux-state/reducers/zone/actions';


export default function useLoadZone() {
    const { addVisitedZone } = useAddVisitedZone();
    const { visitedZones, zoneStatus } = useSelector((state: RootState) => ({ visitedZones: state.zone.visitedZones, zoneStatus: state.zone.status }));
    const dispatch = useDispatch();

    const changeZone = (zoneRoute: ZoneRouteType) => {
        // Save the zone player is leaving
        addVisitedZone();
        // Find if the zone has already been visited
        const visitedZone = visitedZones.find(z => z.name === zoneRoute.linkedRoute.zone);
        if (visitedZone) {
            // Find the linked counterpart
            const linkedRoute = loadZoneData(zoneRoute.linkedRoute.zone).zoneRoutes.find(route => route.id === zoneRoute.linkedRoute.id);
            const zoneToLoad: ZoneStatus = {
                name: visitedZone.name,
                creatures: {
                    ...visitedZone.creatures,
                    [Faction.Player]: zoneStatus.creatures[Faction.Player].map(// set player's position as linkedRoute's position if one was found
                        c => c.id === 'player' ? { ...c, pos: linkedRoute ? linkedRoute.position : c.pos } : c)
                },
                interactableTiles: visitedZone.interactableTiles,
                tiles: visitedZone.tiles,
                size: visitedZone.size
            };
            dispatch(LoadZone(zoneToLoad));
        } else {
            const zone = loadZoneData(zoneRoute.linkedRoute.zone);
            const linkedRoute = zone.zoneRoutes.find(route => route.id === zoneRoute.linkedRoute.id);
            const zoneToLoad: ZoneStatus = {
                name: zone.name,
                creatures: {
                    [Faction.Player]: zoneStatus.creatures[Faction.Player].map(
                        c => c.id === 'player' ? { ...c, pos: linkedRoute ? linkedRoute.position : c.pos } : c),
                    [Faction.Friendly]: [], // Set npcs empty so creature manager can take care of that
                    [Faction.Hostile]: []
                },
                interactableTiles: [], // object manager will fill these
                tiles: [], // map will load or generate tiles
                size: { w: 0, h: 0 }
            };
            dispatch(LoadZone(zoneToLoad));
        }
    };

    // Mostly for dev purposes
    const loadZone = (zoneName: ZoneName, fresh = true, savePrevious = false) => {
        if (zoneName !== zoneStatus.name && savePrevious) {
            addVisitedZone();
        }
        if (fresh) {
            dispatch(RemoveVisitedZone(zoneName));
            const zone = loadZoneData(zoneName);
            const zoneToLoad: ZoneStatus = {
                name: zone.name,
                creatures: {
                    [Faction.Player]: zoneStatus.creatures[Faction.Player].map(
                        c => c.id === 'player' ? { ...c, pos: { x: 0, y: 0 } } : c),
                    [Faction.Friendly]: [],
                    [Faction.Hostile]: []
                },
                interactableTiles: [],
                tiles: [],
                size: { w: 0, h: 0 }
            };
            dispatch(LoadZone(zoneToLoad));
        } else {
            const zoneToLoad = visitedZones.find(z => z.name === zoneName);
            if (zoneToLoad) {
                dispatch(LoadZone(zoneToLoad));
            }
        }
    };

    return {
        changeZone, loadZone
    };
}


