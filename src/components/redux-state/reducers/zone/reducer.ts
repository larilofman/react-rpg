import { Faction, ZoneStatus } from '../../../../types';
import { loadZoneData } from '../../../../utils/load-data';
import {
    SET_TILES, MOVE_CREATURE,
    ADD_CREATURES, ZoneActions,
    DAMAGE_CREATURE, REMOVE_CREATURE,
    LOAD_ZONE,
    SAVE_VISITED_ZONE, SET_INTERACTABLE_TILES,
    ZoneState,
    REMOVE_VISITED_ZONE,
    LOAD_ZONE_BY_NAME
} from './types';

const initialState: ZoneState = {
    name: "zone0",
    size: { w: 0, h: 0 },
    tiles: [],
    creatures: { [Faction.Player]: [], [Faction.Friendly]: [], [Faction.Hostile]: [] },
    interactableTiles: [],
    tilesLoaded: false,
    zoneLoaded: false,
    visitedZones: [],
    gameOver: false,
    zoneRouteUsed: undefined
};

const reducer = (state = initialState, action: ZoneActions) => {
    switch (action.type) {
        case SET_TILES:
            return {
                ...state,
                tiles: action.payload,
                size: { w: action.payload.length, h: action.payload[0].length },
                tilesLoaded: true
            };
        case SET_INTERACTABLE_TILES:
            return {
                ...state,
                interactableTiles: action.payload,
                zoneLoaded: true
            };
        case MOVE_CREATURE: {
            return {
                ...state,
                creatures: {
                    ...state.creatures,
                    [action.payload.creature.faction]: state.creatures[action.payload.creature.faction].map(
                        c => c.id !== action.payload.creature.id
                            ? c
                            : { ...c, pos: action.payload.pos }
                    )
                }
            };
        }
        case ADD_CREATURES:
            return {
                ...state,
                creatures: {
                    ...state.creatures,
                    [action.payload.faction]: state.creatures[action.payload.faction].concat(action.payload.creatures)
                }

            };
        case DAMAGE_CREATURE:
            return {
                ...state,
                creatures: {
                    ...state.creatures,
                    [action.payload.faction]: state.creatures[action.payload.faction].map(
                        c => c.id === action.payload.id ? action.payload : c
                    )
                }
            };
        case REMOVE_CREATURE: {
            return {
                ...state,
                ...state,
                creatures: {
                    ...state.creatures,
                    [action.payload.faction]: state.creatures[action.payload.faction].filter(c => c.id !== action.payload.id)
                },
                gameOver: action.payload.faction === Faction.Player
            };
        }
        case LOAD_ZONE: {
            const savedZoneData = {
                name: state.name,
                creatures: state.creatures,
                tiles: state.tiles,
                size: state.size,
                interactableTiles: state.interactableTiles
            };

            let zoneToLoad: ZoneStatus;
            // Find if the zone has already been visited
            const visitedZone = state.visitedZones.find(z => z.name === action.payload.linkedRoute.zone);
            if (visitedZone) {
                // Find the linked counterpart
                const linkedRoute = loadZoneData(action.payload.linkedRoute.zone).zoneRoutes.find(route => route.id === action.payload.linkedRoute.id);
                zoneToLoad = {
                    name: visitedZone.name,
                    creatures: {
                        ...visitedZone.creatures,
                        [Faction.Player]: state.creatures[Faction.Player].map(// set player's position as linkedRoute's position if one was found
                            c => c.id === 'player' ? { ...c, pos: linkedRoute ? linkedRoute.position : c.pos } : c)
                    },
                    interactableTiles: visitedZone.interactableTiles,
                    tiles: visitedZone.tiles,
                    size: visitedZone.size
                };
            } else {
                const zone = loadZoneData(action.payload.linkedRoute.zone);
                const linkedRoute = zone.zoneRoutes.find(route => route.id === action.payload.linkedRoute.id);
                zoneToLoad = {
                    name: zone.name,
                    creatures: {
                        [Faction.Player]: state.creatures[Faction.Player].map(
                            c => c.id === 'player' ? { ...c, pos: linkedRoute ? linkedRoute.position : c.pos } : c),
                        [Faction.Friendly]: [], // Set npcs empty so creature manager can take care of that
                        [Faction.Hostile]: []
                    },
                    interactableTiles: [], // object manager will fill these
                    tiles: [], // map will load or generate tiles
                    size: { w: 0, h: 0 }
                };
            }

            return {
                ...state,
                tilesLoaded: false,
                zoneLoaded: false,
                name: zoneToLoad.name,
                tiles: zoneToLoad.tiles,
                size: zoneToLoad.size,
                creatures: zoneToLoad.creatures,
                interactableTiles: zoneToLoad.interactableTiles,
                visitedZones: state.visitedZones.map(z => z.name).includes(state.name)
                    ? state.visitedZones.map(z => z.name === state.name ? savedZoneData : z) // zone has already been saved so replace it
                    : state.visitedZones.concat(savedZoneData) // zone hasn't been saved before
            };
        }
        case LOAD_ZONE_BY_NAME: {
            const savedZoneData = action.payload.savePrevious
                ?
                {
                    name: state.name,
                    creatures: state.creatures,
                    tiles: state.tiles,
                    size: state.size,
                    interactableTiles: state.interactableTiles
                }
                : undefined;

            const visitedZones = savedZoneData ? state.visitedZones.concat(savedZoneData) : state.visitedZones;

            if (action.payload.fresh) {
                return {
                    ...state,
                    tilesLoaded: false,
                    zoneLoaded: false,
                    name: action.payload.zoneName,
                    creatures: {
                        [Faction.Player]: state.creatures[Faction.Player].map(
                            c => c.id === 'player' ? { ...c, pos: { x: 0, y: 0 } } : c),
                        [Faction.Friendly]: [],
                        [Faction.Hostile]: []
                    },
                    interactableTiles: [],
                    tiles: [],
                    size: { w: 0, h: 0 },
                    visitedZones: visitedZones.filter(z => z.name !== action.payload.zoneName)
                };
            } else {
                const zoneToLoad = state.visitedZones.find(z => z.name === action.payload.zoneName);
                if (zoneToLoad) {
                    return {
                        ...state,
                        tilesLoaded: false,
                        zoneLoaded: false,
                        name: zoneToLoad.name,
                        creatures: zoneToLoad.creatures,
                        interactableTiles: zoneToLoad.interactableTiles,
                        tiles: zoneToLoad.tiles,
                        size: zoneToLoad.size,
                        visitedZones
                    };
                }
            }
            return state;

        }
        case SAVE_VISITED_ZONE: {
            const zoneToSave = {
                name: state.name,
                creatures: state.creatures,
                interactableTiles: state.interactableTiles,
                tiles: state.tiles,
                size: state.size
            };
            return {
                ...state,
                visitedZones: state.visitedZones.map(z => z.name).includes(zoneToSave.name)
                    ? state.visitedZones.map(z => z.name === zoneToSave.name ? zoneToSave : z) // zone has already been saved so replace it
                    : state.visitedZones.concat(zoneToSave) // zone hasn't been saved before
            };
        }
        case REMOVE_VISITED_ZONE: {
            return {
                ...state,
                visitedZones: state.visitedZones.filter(z => z.name !== action.payload)
            };
        }
        default:
            return state;
    }
};

export default reducer;