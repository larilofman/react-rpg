import { Position } from '../types';

export default function calculateDistance(pos1: Position, pos2: Position) {
    return Math.sqrt(Math.pow((pos2.x - pos1.x), 2) + Math.pow((pos2.y - pos1.y), 2));
}