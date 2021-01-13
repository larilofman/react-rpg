import React, { useEffect, useState } from 'react';
import GameObject from '../game-object';
import useKeyPress from '../../hooks/use-key-press';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useSetPlayerPosition from '../state/action-hooks/useSetPlayerPosition';
import useUseTurn from '../state/action-hooks/useUseTurn';
import useCamera from '../../hooks/use-camera';
import { Direction, Position, Creature, Attack, DamageType } from '../../types';
import useCheckCollision from '../../hooks/use-check-collision';
import useOccupyTile from '../state/action-hooks/useOccupyTile';
import useMelee from '../../hooks/use-melee';


interface Props {
    skin: string
    startPos: Position
    data: Creature
}

const Player: React.FC<Props> = ({ skin, startPos, data }) => {
    const { setPlayerPosition } = useSetPlayerPosition();
    const { useTurn, canAct } = useUseTurn(data.faction);
    const { walk, position } = useWalk(startPos);
    const { dir, step, setAnimState } = useAnimation(3);
    const { updateCamera } = useCamera();
    const { checkCollision } = useCheckCollision();
    const { occupyTile } = useOccupyTile();
    const [creature, setCreature] = useState(data);
    const { meleeAttack } = useMelee(data);

    useEffect(() => {
        occupyTile(data, position);
    }, []);


    useKeyPress((e: KeyboardEvent) => {
        let keyPressed;
        switch (e.key) {
            case "s":
            case "ArrowDown":
                keyPressed = Direction.down;
                break;
            case "d":
            case "ArrowRight":
                keyPressed = Direction.right;
                break;
            case "w":
            case "ArrowUp":
                keyPressed = Direction.up;
                break;
            case "a":
            case "ArrowLeft":
                keyPressed = Direction.left;
                break;
            default:
                break;
        }

        if (keyPressed !== undefined && canAct) {
            const newPos = checkCollision(position, keyPressed);

            if (newPos) {
                if (newPos.occupant) {
                    const attack: Attack = {
                        type: DamageType.Physical,
                        damage: 5
                    };
                    meleeAttack(newPos.occupant, attack);
                } else {
                    if (newPos.passable) {
                        const newCreature: Creature = {
                            ...creature,
                            pos: newPos.position
                        };
                        occupyTile(newCreature, position);
                        setCreature(newCreature);
                        walk(newPos);
                    }
                }

            }
            useTurn();
            setAnimState(keyPressed);

        }
        // e.preventDefault();
    });

    useEffect(() => {
        setPlayerPosition(position);
        updateCamera(position);
    }, [position]);

    return <GameObject
        spriteData={{
            offset_x: step,
            offset_y: dir,
            image: `/sprites/skins/${skin}.png`,
            layer: 1
        }}
        position={position}
    />;

};

export default Player;
