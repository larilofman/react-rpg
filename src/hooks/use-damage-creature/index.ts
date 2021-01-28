import { Creature } from '../../types';
import useGetCreature from '../use-get-creature';
import UseCombatLog, { CombatLogEntryType, CombatLogEntry } from '../use-combat-log';
import { useDispatch } from 'react-redux';
import { DamageCreature, RemoveCreature } from '../../components/redux-state/reducers/zone/actions';

export default function useDamageCreature() {
    const dispatch = useDispatch();
    const { getCreatureById } = useGetCreature();
    const { AddEntry } = UseCombatLog();

    function damageCreature(attackerId: string, target: Creature) {
        const attacker = getCreatureById(attackerId);

        // damageCreature(attackerId, target);

        if (target && attacker) {
            const entryDamaged: CombatLogEntry = { type: CombatLogEntryType.Damaged, data: { attacker, target, damage: attacker.stats.damage } };
            const healthRemaining = target.stats.health - attacker.stats.damage;
            AddEntry(entryDamaged);
            if (healthRemaining > 0) {
                target = {
                    ...target,
                    stats: {
                        ...target.stats,
                        health: healthRemaining
                    }
                };
                dispatch(DamageCreature(target));
            } else {
                const entryDied: CombatLogEntry = { type: CombatLogEntryType.Died, data: { creature: target } };
                AddEntry(entryDied);
                dispatch(RemoveCreature(target));
            }
        }
    }

    return {
        damageCreature
    };

}

// import { useStateValue, ActionType } from '../index';
// import { Creature } from '../../../types';
// import useRemoveCreature from './useRemoveCreature';
// import useGetCreature from '../../../hooks/use-get-creature';

// export default function useDamageCreature() {
//     const [, dispatch] = useStateValue();
//     const { removeCreature } = useRemoveCreature();
//     const { getCreatureById } = useGetCreature();

//     const damageCreature = (attackerId: string, target: Creature) => {
//         const attacker = getCreatureById(attackerId);

//         if (target && attacker) {
//             const healthRemaining = target.stats.health - attacker.stats.damage;

//             if (healthRemaining > 0) {
//                 target = {
//                     ...target,
//                     stats: {
//                         ...target.stats,
//                         health: healthRemaining
//                     }
//                 };
//                 dispatch(
//                     {
//                         type: ActionType.DAMAGE_CREATURE,
//                         payload: target
//                     });
//             } else {
//                 removeCreature(target);
//             }
//         }
//     };
//     return {
//         damageCreature
//     };

// }

