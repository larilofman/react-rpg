import { Position, TileType, Direction, TileStatus } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/redux-state/store';

export default function useGetTiles() {
    const creatures = useSelector((state: RootState) => state.zone.creatures);
    const tiles = useSelector((state: RootState) => state.zone.tiles);
    const size = useSelector((state: RootState) => state.zone.size);

    const isInBounds = (pos: Position): boolean => {
        return (
            size.h > pos.y &&
            size.w > pos.x &&
            pos.y >= 0 &&
            pos.x >= 0
        );
    };

    const getTileAt = (pos: Position): TileType | undefined => {
        if (isInBounds(pos)) {
            return tiles[pos.y][pos.x];
        }
    };

    const getTileStatus = (pos: Position): TileStatus => {
        let walkable = TileStatus.Passable;
        for (const faction of Object.values(creatures)) {
            faction.forEach(creature => {
                if (creature.pos.x === pos.x && creature.pos.y === pos.y) {
                    walkable = TileStatus.Occupied;
                }
            });
        }
        const tile = getTileAt(pos);
        if (!tile || !tile.passable) {
            walkable = TileStatus.NonPassable;
        }
        return walkable;
    };

    const getTileInDirection = (pos: Position, dir: Direction): { status: TileStatus, pos: Position } => {
        let newPos = pos;

        switch (dir) {
            case Direction.down:
                newPos = { x: pos.x, y: pos.y + 1 };
                break;
            case Direction.up:
                newPos = { x: pos.x, y: pos.y - 1 };
                break;
            case Direction.left:
                newPos = { x: pos.x - 1, y: pos.y };
                break;
            case Direction.right:
                newPos = { x: pos.x + 1, y: pos.y };
                break;
            case Direction.upRight:
                newPos = { x: pos.x + 1, y: pos.y - 1 };
                break;
            case Direction.downRight:
                newPos = { x: pos.x + 1, y: pos.y + 1 };
                break;
            case Direction.downLeft:
                newPos = { x: pos.x - 1, y: pos.y + 1 };
                break;
            case Direction.upLeft:
                newPos = { x: pos.x - 1, y: pos.y - 1 };
                break;
            default:
                break;
        }

        return { status: getTileStatus(newPos), pos: newPos };
    };

    const getRandomNearbyFloorTile = (pos: Position, diagonal = false) => {
        const nearbyFloors = [];
        for (let y = pos.y - 1; y < pos.y + 2; y++) {
            for (let x = pos.x - 1; x < pos.x + 2; x++) {
                if (diagonal) {
                    const tile = getTileAt({ x, y });
                    if (tile && tile.passable && !(tile.position.x === pos.x && tile.position.y === pos.y)) {
                        nearbyFloors.push(tile);
                    }
                } else {
                    const tile = getTileAt({ x, y });
                    if (tile && tile.passable &&
                        (tile.position.x === pos.x || tile.position.y === pos.y) &&
                        !(tile.position.x === pos.x && tile.position.y === pos.y)) {
                        nearbyFloors.push(tile);
                    }
                }

            }
        }

        const randomTile = nearbyFloors[Math.floor(Math.random() * nearbyFloors.length)];
        return randomTile;
    };

    return {
        getTileInDirection, getTileStatus, getTileAt, getRandomNearbyFloorTile
    };
}