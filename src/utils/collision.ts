import { Position, Dimensions } from '../types';

export default function collision(rect1: { pos: Position, size: Dimensions }, rect2: { pos: Position, size: Dimensions }) {

    return (rect1.pos.x < rect2.pos.x + rect2.size.w &&
        rect1.pos.x + rect1.size.w > rect2.pos.x &&
        rect1.pos.y < rect2.pos.y + rect2.size.h &&
        rect1.pos.y + rect1.size.h > rect2.pos.y);
}