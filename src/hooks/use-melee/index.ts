import { useState } from 'react';
import { Creature, Attack } from '../../types';
import { useStateValue } from '../../components/state';
import useAttackCreature from '../../components/state/action-hooks/useAttackCreature';

export default function useMelee(attacker: Creature) {
    const { attackCreature } = useAttackCreature();

    function meleeAttack(target: Creature, attack: Attack) {
        attackCreature(target, attack, attacker);
    }

    return {
        meleeAttack
    };
}