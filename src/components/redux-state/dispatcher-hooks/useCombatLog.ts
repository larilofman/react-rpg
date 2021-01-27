import { Creature } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';

export enum CombatLogEntryType {
    Damaged,
    Died
}

interface BaseCombatLogEntry {
    type: CombatLogEntryType
}

export interface CombatLogEntryDamaged extends BaseCombatLogEntry {
    type: CombatLogEntryType.Damaged
    data: { attacker: Creature, target: Creature, damage: number }
}

export interface CombatLogEntryDied extends BaseCombatLogEntry {
    type: CombatLogEntryType.Died
    data: { creature: Creature }
}

export type CombatLogEntry = CombatLogEntryDamaged | CombatLogEntryDied

export default function UseCombatLog() {
    const dispatch = useDispatch();

    const AddEntry = (entry: string) => {
        // let entry = "";

        // switch (entry.type) {
        //     case CombatLogEntryType.Damaged:
        //         entry = `${entry.data.attacker.name} hits ${entry.data.target.name} for ${entry.data.damage} damage.`;
        //         break;
        //     case CombatLogEntryType.Died:
        //         entry = `${entry.data.creature.name} dies.`;
        //         break;
        //     default:
        //         break;
        // }

        dispatch(
            {
                type: 'ADD_ENTRY',
                payload: entry
            });
    };

    // export const addEntry = (entry: string) => {
    //     return {
    //         type: 'ADD_ENTRY',
    //         payload: entry
    //     };
    // };

    return { AddEntry };
}