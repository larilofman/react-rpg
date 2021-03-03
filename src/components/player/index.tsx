import React, { useEffect, useState } from 'react';
import Sprite from '../sprite';
import useKeyPress from '../../hooks/use-key-press';
import useMouseClick from '../../hooks/use-mouse-click';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useCamera from '../../hooks/use-camera';
import { Direction, Position } from '../../types/general';
import useCheckCollision from '../../hooks/use-get-tiles';
import useContact from '../../hooks/use-contact';
import usePathFinding from '../../hooks/use-pathfinding';
import { isInMeleeRange } from '../../utils/calculate-distance';
import useGetCreature from '../../hooks/use-get-creature';
import useInteract from '../../hooks/use-interact';
import { firstStepDelay, diagonalMovement } from '../../data/settings/general';
import { keyboardMap } from '../../data/settings/keyboard';
import { useSelector } from 'react-redux';
import { RootState } from '../redux-state/store';
import useUseTurn from '../../hooks/use-use-turn';
import { BaseCreature, Faction } from '../../types/creature';
import { TileStatus } from '../../types/tile';

interface Props {
    skin: string
    data: BaseCreature
}

const Player: React.FC<Props> = ({ skin, data }) => {
    const { turn, creaturesLoaded, player, gameOver, interactableTiles } = useSelector((state: RootState) => (
        {
            turn: state.turn,
            creaturesLoaded: state.zone.creaturesLoaded,
            player: state.zone.creatures[Faction.Player][0],
            gameOver: state.game.gameOver,
            interactableTiles: state.zone.interactableTiles
        }));
    const { walk, position } = useWalk(player.pos);
    const { dir, step, setAnimState } = useAnimation(3);
    const { updateCamera } = useCamera();
    const { getTileInDirection, getTileStatus } = useCheckCollision();
    const { contact } = useContact();
    const { creatureClicked, posClicked } = useMouseClick();
    const { findPath, onRoute, cancelPath } = usePathFinding();
    const { keyPressed } = useKeyPress();
    const { getCreatureById } = useGetCreature();
    const { interact, checkInteraction } = useInteract();
    const [canAct, setCanAct] = useState(true);
    const { useTurn } = useUseTurn();

    useEffect(() => {
        if (creaturesLoaded) {
            walk(data, player.pos);
            updateCamera(player.pos);
        }
    }, [creaturesLoaded, gameOver]);

    // If a tile is clicked on and standing next to an occupied tile, contact with the creature on the tile, otherwise find a path to the tile
    useEffect(() => {
        if (posClicked) {
            if (getTileStatus(posClicked) === TileStatus.Occupied && isInMeleeRange(position, posClicked)) {
                contactCreature(posClicked);
            } else {
                findPath(position, posClicked);
            }

        }
    }, [posClicked]);

    // When pressing a new key, add a little delay after the first step before character starts running
    useEffect(() => {
        let actTimer: NodeJS.Timeout | undefined;
        if (keyPressed) {
            setCanAct(false);
            actTimer = setTimeout(() => setCanAct(true), firstStepDelay);
        } else {
            setCanAct(true);
            if (actTimer) {
                clearTimeout(actTimer);
            }
        }
        return () => actTimer && clearTimeout(actTimer);
    }, [keyPressed]);

    useEffect(() => {
        act();
    }, [turn.creature, turn.count, keyPressed, onRoute, canAct]); // creature is tracked for when there are other creatures on the zone, count for when player is alone

    const act = () => {
        if (turn.faction === data.faction && turn.creature === data.id && canAct) {
            // player has died, skip turn so npcs will keep wandering
            if (gameOver) {
                useTurn();
                return;
            }

            if (keyPressed) {
                // cancel path on any key press
                if (onRoute) {
                    cancelPath();
                }

                // find a direction of the key press or act other ways
                const dir = getActionFromKey(keyPressed);
                if (dir !== undefined) {
                    const newTile = getTileInDirection(position, dir);
                    if (newTile) {
                        if (newTile.status === TileStatus.Occupied) {
                            contactCreature(newTile.pos);
                        } else if (newTile.status === TileStatus.Passable) {
                            move(newTile.pos);
                            setAnimState(position, newTile.pos);
                        } else {
                            setAnimState(position, newTile.pos, false);
                        }
                    }
                }
            } else if (onRoute && posClicked) {
                // if no key was pressed and finding a path
                // if latest click was on a creature, see if in melee range of it and contact if so
                if (creatureClicked) {
                    const creatureChased = getCreatureById(creatureClicked);
                    if (creatureChased && isInMeleeRange(position, creatureChased.pos)) {
                        cancelPath();
                        contactCreature(creatureChased.pos);
                        return;
                    }
                }
                // otherwise continue on the path
                const nextPos = findPath(position, posClicked);
                if (nextPos) {
                    move(nextPos);
                }
            }
        }
    };

    const getActionFromKey = (key: string) => {
        let dir;
        if (keyboardMap["up"].includes(key)) dir = Direction.up;
        if (keyboardMap["right"].includes(key)) dir = Direction.right;
        if (keyboardMap["down"].includes(key)) dir = Direction.down;
        if (keyboardMap["left"].includes(key)) dir = Direction.left;
        if (keyboardMap["upRight"].includes(key)) dir = diagonalMovement ? Direction.upRight : undefined;
        if (keyboardMap["downRight"].includes(key)) dir = diagonalMovement ? Direction.downRight : undefined;
        if (keyboardMap["downLeft"].includes(key)) dir = diagonalMovement ? Direction.downLeft : undefined;
        if (keyboardMap["upLeft"].includes(key)) dir = diagonalMovement ? Direction.upLeft : undefined;
        if (keyboardMap["useTurn"].includes(key)) useTurn();
        if (keyboardMap["interact"].includes(key)) interact();

        return dir;
    };

    const move = (newPos: Position) => {
        walk(data, newPos);
        setAnimState(position, newPos);
        useTurn();
    };

    const contactCreature = (contactPos: Position) => {
        contact(data, contactPos);
        useTurn();
        setAnimState(position, contactPos);
    };

    useEffect(() => {
        updateCamera(position);
        checkInteraction(position);
    }, [position]);

    useEffect(() => {
        checkInteraction(position);
    }, [interactableTiles]);

    if (gameOver) return null;
    return <Sprite
        data={{
            offset_x: step,
            offset_y: dir,
            image: `/sprites/skins/${skin}.png`,
            layer: 3
        }}
        position={position}
    />;

};

export default Player;
