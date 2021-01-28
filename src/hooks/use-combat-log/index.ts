import { useDispatch } from 'react-redux';
import { AddCombatLogEntry } from '../../components/redux-state/reducers/combat-log/actions';
import { Creature } from '../../types';

interface BaseCombatLogEntry {
    type: CombatLogEntryType
}

export enum CombatLogEntryType {
    Damaged,
    Died
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

    const AddEntry = (entry: CombatLogEntry) => {
        let message = "";

        // lisää turn.count vielä messageen

        switch (entry.type) {
            case CombatLogEntryType.Damaged:
                message = `${entry.data.attacker.name} hits ${entry.data.target.name} for ${entry.data.damage} damage.`;
                break;
            case CombatLogEntryType.Died:
                message = `${entry.data.creature.name} dies.`;
                break;
            default:
                break;
        }

        dispatch(AddCombatLogEntry(message));
    };

    return { AddEntry };
}