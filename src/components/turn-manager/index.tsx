import { useEffect } from 'react';
import { Faction } from '../../types/creature';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../components/redux-state/store';
import { ResetCreatureIndex, SetCreatureTurn, SetFactionTurn } from '../../components/redux-state/reducers/turn/actions';
import { turnDelay } from '../../data/settings/general';
import delay from 'lodash.delay';
import React from 'react';


const TurnManager: React.FC = () => {

    const turnOfFaction = useSelector((state: RootState) => state.turn.faction);
    const creatureIndex = useSelector((state: RootState) => state.turn.creatureIndex);
    const creatures = useSelector((state: RootState) => state.zone.creatures);
    const creaturesLoaded = useSelector((state: RootState) => state.zone.creaturesLoaded);
    const gameOver = useSelector((state: RootState) => state.game.gameOver);
    const dispatch = useDispatch();

    // used for adding a delay for every nth turn if more than x creatures on faction to avoid reaching max render depth
    const amountForDelay = 20;
    const delayModulo = 10;
    const creatureDelay = 5;

    useEffect(() => {
        if (creaturesLoaded) {
            // More creatures on the faction left, so set next one's turn
            const numCreatures = creatures[turnOfFaction].length;
            if (creatureIndex < numCreatures) {
                const nextCreature = creatures[turnOfFaction][creatureIndex].id;
                // Amount of creatures is greater than the threshold and index works with the modulo, add delay
                if (numCreatures > amountForDelay && creatureIndex % delayModulo === 0) {
                    delay((creature) => {
                        dispatch(SetCreatureTurn(creature));
                    }, creatureDelay, nextCreature);
                } else {
                    dispatch(SetCreatureTurn(nextCreature));
                }
            } else {
                // Give turn to next faction and reset the index, adding a delay before each player turn, increasing it when player is dead
                const nextFaction = getNextFaction();
                if (nextFaction === Faction.Player) {
                    delay((faction) => {
                        dispatch(SetFactionTurn(faction));
                    }, gameOver ? turnDelay * 4 : turnDelay, nextFaction);
                } else {
                    dispatch(SetFactionTurn(nextFaction));
                }
            }
        }

    }, [creatureIndex]);

    useEffect(() => {
        dispatch(ResetCreatureIndex());
    }, [turnOfFaction]);

    // If other factions are empty, give turn to player. Otherwise give the turn to the next faction if it has creatures
    const getNextFaction = () => {
        let nextFaction = Faction.Player;
        switch (turnOfFaction) {
            case Faction.Player:
                nextFaction = creatures[Faction.Friendly].length ? Faction.Friendly : Faction.Hostile;
                break;
            case Faction.Friendly:
                nextFaction = creatures[Faction.Hostile].length ? Faction.Hostile : Faction.Player;
                break;
            case Faction.Hostile:
                nextFaction = Faction.Player;
                break;
            default:
                break;
        }
        return nextFaction;
    };

    return null;
};

export default TurnManager;
