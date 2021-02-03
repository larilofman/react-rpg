import { Faction, ZoneStatus } from '../../../../types';
import { loadZoneData } from '../../../../utils/load-data';
import {
    SET_TILES, MOVE_CREATURE,
    ADD_CREATURES, SET_CREATURES,
    DAMAGE_CREATURE, REMOVE_CREATURE,
    LOAD_ZONE,
    SAVE_VISITED_ZONE, SET_OBJECTS,
    ZoneState, ZoneActions,
    REMOVE_VISITED_ZONE,
    LOAD_ZONE_BY_NAME,
    SET_OBJECTS_LOADED,
    SET_CREATURES_LOADED
} from './types';

const initialState: ZoneState = {
    name: "zone0",
    size: { w: 0, h: 0 },
    tiles: [],
    creatures: { [Faction.Player]: [], [Faction.Friendly]: [], [Faction.Hostile]: [] },
    interactableTiles: [],
    tilesLoaded: false,
    objectsLoaded: false,
    creaturesLoaded: false,
    visitedZones: [],
    gameOver: false
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
        case SET_OBJECTS:
            return {
                ...state,
                interactableTiles: action.payload,
                objectsLoaded: true
            };
        case SET_OBJECTS_LOADED:
            return {
                ...state,
                objectsLoaded: action.payload
            };
        case SET_CREATURES_LOADED:
            return {
                ...state,
                creaturesLoaded: action.payload
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
        case SET_CREATURES:
            return {
                ...state,
                creaturesLoaded: true,
                creatures: action.payload
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

            return {
                ...initialState,
                name: action.payload,
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
                    objectsLoaded: false,
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
                        objectsLoaded: false,
                        name: zoneToLoad.name,
                        creatures: zoneToLoad.creatures,
                        interactableTiles: [],
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