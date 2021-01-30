import React from 'react';
import { Faction } from '../../../types';
import FilledBar from '../filled-bar';
import { LerpColor } from '../../../utils/lerp-color';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';

const HealthDisplay: React.FC = () => {
    const { health, maxHealth } = useSelector((state: RootState) => (
        {
            health: state.zone.zoneStatus.creatures[Faction.Player][0] && state.zone.zoneStatus.creatures[Faction.Player][0].stats.health,
            maxHealth: state.zone.zoneStatus.creatures[Faction.Player][0] && state.zone.zoneStatus.creatures[Faction.Player][0].stats.maxHealth
        }));

    const healthFraction = health / maxHealth;

    // Find a color between green and red based on the health missing. Darker shades for the background(the empty portition of the bar).
    const fullFill = "#00ff00"; // bright green
    const emptyFill = "#ff0000"; // bright red
    const fullBg = "#003300"; // dark green
    const emptyBg = "#330000"; // dark red
    const text = "#eae0d5"; // almond;
    const lerpedFill = health >= 0 ? LerpColor(emptyFill, fullFill, healthFraction) : emptyFill; // if health drops below 0, use the color for empty
    const lerpedEmpty = health >= 0 ? LerpColor(emptyBg, fullBg, healthFraction) : emptyBg;

    return (
        <FilledBar
            label="Health"
            data={{ min: 0, max: maxHealth, current: health }}
            width="100%"
            height="24px"
            colors={{ filled: lerpedFill, background: lerpedEmpty, text: text }}
            gap="4px"
        />
    );

};

export default HealthDisplay;