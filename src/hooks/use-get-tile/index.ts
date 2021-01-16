import { Position, Tile, Direction, Creature, TileStatus } from '../../types';
import { useStateValue } from '../../components/state';

export default function useGetTileInDirection() {
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

    const getTileStatus = (pos: Position): TileStatus => {
        let walkable = TileStatus.Passable;
        for (const faction of Object.values(zoneData.creatures)) {
            faction.forEach(creature => {
                if (creature.pos.x === pos.x && creature.pos.y === pos.y) {
                    walkable = TileStatus.Occupied;
                }
            });
        }
        // for (const [key, value] of Object.entries(zoneData.creatures)) {
        //     // console.log(key + ':' + value);
        //     value.forEach(creature => {

        //         if (creature.pos.x === pos.x && creature.pos.y === pos.y) {
        //             walkable = TileStatus.Occupied;
        //             // console.log(creature.id, creature.pos.x, creature.pos.y, "originPos: ", pos.x, pos.y);
        //         }
        //         creatures.push(creature);
        //     });
        // }
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
            default:
                break;
        }

        return { status: getTileStatus(newPos), pos: newPos };
    };

    return {
        getTileInDirection, getTileStatus, getTileAt
    };
}