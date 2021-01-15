import { Position, Tile, Direction, Creature } from '../../types';
import { useStateValue } from '../../components/state';

export default function useCheckCollision() {
    const [{ zoneData }] = useStateValue();

    const isInBounds = (pos: Position): boolean => {
        return (
            zoneData.size.h > pos.y &&
            zoneData.size.w > pos.x &&
            pos.y >= 0 &&
            pos.x >= 0
        );
    };

    const getTileAt = (pos: Position): Tile | undefined => {
        if (isInBounds(pos)) {
            return zoneData.tiles[pos.y][pos.x];
        }
    };

    const isWalkable = (pos: Position): boolean => {
        // const creatures: Creature[] = [];
        for (const [key, value] of Object.entries(zoneData.creatures)) {
            // console.log(key + ':' + value);
            value.forEach(creature => {
                if (creature.pos.x === pos.x && creature.pos.y === pos.y) {
                    console.log('collided');
                    return false;
                }
            });
        }
        return true;
        // console.log(creatures);
        // return false;
    };

    // const isWalkable = (pos: Position): boolean => {
    //     const tile = getTileAt(pos);
    //     if (tile) {
    //         if (!tile.occupant || !tile.passable) {
    //             return true;
    //         }
    //         return false;
    //     }
    //     return false;
    // };

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
        checkCollision, isWalkable
    };
}