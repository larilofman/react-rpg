import { useState } from 'react';
import { Creature, Attack } from '../../types';
import { useStateValue } from '../../components/state';
import useDamageCreature from '../../components/state/action-hooks/useDamageCreature';

export default function useMelee(attacker: Creature) {
    const { damageCreature } = useDamageCreature();

    function meleeAttack(target: Creature, attack: Attack) {
        damageCreature(target, attack, attacker);
    }

    return {
        meleeAttack
    };
}