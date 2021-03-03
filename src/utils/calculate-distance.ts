import { Position } from '../types/general';
import { diagonalMovement } from '../data/settings/general';

export function calculateDistance(pos1: Position, pos2: Position) {
    return Math.sqrt(Math.pow((pos2.x - pos1.x), 2) + Math.pow((pos2.y - pos1.y), 2));
}

export function isInMeleeRange(pos1: Position, pos2: Position) {
    if (pos1 && pos2) {
        return calculateDistance(pos1, pos2) < (diagonalMovement ? 1.6 : 1.2);
    }
    return false;
}

export function isInRange(pos1: Position, pos2: Position, range: number) {
    if (pos1 && pos2) {
        return calculateDistance(pos1, pos2) < range;
    }
    return false;
}