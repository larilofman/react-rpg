import React from 'react';
import { Creature, Faction } from '../../../types';
import FilledBar from '../filled-bar';
import { LerpColor } from '../../../utils/lerp-color';

interface Props {
    player: Creature
}

const HealthDisplay: React.FC<Props> = ({ player }) => {

    const healthFraction = player.stats.health / 100;

    const fullFill = "#00ff00"; // bright green
    const emptyFill = "#ff0000"; // bright red
    const fullEmpty = "#003300"; // dark green
    const emptyEmpty = "#330000"; // dark red
    const lerpedFill = LerpColor(emptyFill, fullFill, healthFraction);
    const lerpedEmpty = LerpColor(emptyEmpty, fullEmpty, healthFraction);

    return (
        <FilledBar
            label="Health: "
            data={{ min: 0, max: 100, current: player.stats.health }}
            size={{ width: "100%", height: 50 }}
            colors={{ filled: lerpedFill, empty: lerpedEmpty }}
        />
    );

};

export default HealthDisplay;