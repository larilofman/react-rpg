import { Position, Tile, Direction } from '../../types';
import { useStateValue } from '../../components/state';

export default function useCheckCollision() {
    const [{ mapData }] = useStateValue();

    const isInBounds = (pos: Position): boolean => {
        return (
            mapData.size.h > pos.y &&
            mapData.size.w > pos.x &&
            pos.y >= 0 &&
            pos.x >= 0
        );
    };

    const getTileAt = (pos: Position): Tile | undefined => {
        if (isInBounds(pos)) {
            return mapData.tiles[pos.y][pos.x];
        }
    };

    const checkCollision = (pos: Position, dir: Direction) => {
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
            default:
                break;
        }

        const tile = getTileAt(newPos);
        // return !tile ? false : tile.passable;
        return tile;
    };

    return {
        checkCollision
    };
}