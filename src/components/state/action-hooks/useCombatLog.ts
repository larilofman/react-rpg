import { Creature } from '../../../types';
import { useStateValue, ActionType } from '../index';

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
    const [, dispatch] = useStateValue();

    const AddEntry = (entry: CombatLogEntry) => {
        let message = "";

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

        dispatch(
            {
                type: ActionType.ADD_COMBAT_LOG_ENTRY,
                payload: message
            });
    };

    return { AddEntry };
}