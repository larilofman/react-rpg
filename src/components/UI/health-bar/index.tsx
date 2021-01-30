import React from 'react';
import { Creature } from '../../../types';
import FilledBar from '../filled-bar';
import { LerpColor } from '../../../utils/lerp-color';

interface Props {
    player: Creature
}

const HealthDisplay: React.FC<Props> = ({ player }) => {

    const healthFraction = player.stats.health / player.stats.maxHealth;

    // Find a color between green and red based on the health missing. Darker shades for the background, or the empty portition of the bar.
    const fullFill = "#00ff00"; // bright green
    const emptyFill = "#ff0000"; // bright red
    const fullBg = "#003300"; // dark green
    const emptyBg = "#330000"; // dark red
    const text = "#eae0d5"; // almond;
    const lerpedFill = player.stats.health >= 0 ? LerpColor(emptyFill, fullFill, healthFraction) : emptyFill; // if health drops below 0, use the color for empty
    const lerpedEmpty = player.stats.health >= 0 ? LerpColor(emptyBg, fullBg, healthFraction) : emptyBg;

    return (
        <FilledBar
            label="Health"
            data={{ min: 0, max: player.stats.maxHealth, current: player.stats.health }}
            width="100%"
            height="24px"
            colors={{ filled: lerpedFill, background: lerpedEmpty, text: text }}
            gap="4px"
        />
    );

};

export default HealthDisplay;