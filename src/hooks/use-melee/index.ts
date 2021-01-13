import { useState } from 'react';
import { Creature } from '../../types';
import { useStateValue } from '../../components/state';

export default function useMelee() {

    function meleeAttack(target: Creature) {
        console.log('attacked ', target);
    }

    return {
        meleeAttack
    };
}