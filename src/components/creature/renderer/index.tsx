import React from 'react';
import Npc from '../../npc';
import { Faction, Position } from '../../../types';
import settings from '../../../data/settings/general.json';
import Player from '../../player';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';

interface Props {
    useTurn: () => void
}

const CreatureRenderer: React.FC<Props> = ({ useTurn }) => {
    const { player, cameraPosition, creatures, creaturesLoaded } = useSelector((state: RootState) => (
        {
            cameraPosition: state.cameraPosition,
            creatures: state.zone.creatures,
            creaturesLoaded: state.zone.creaturesLoaded,
            player: state.zone.creatures[Faction.Player][0]
        }
    ));

    const isVisible = (pos: Position) => {
        if (pos.x >= cameraPosition.x &&
            pos.x < cameraPosition.x + settings.displaySize.w &&
            pos.y >= cameraPosition.y &&
            pos.y < cameraPosition.y + settings.displaySize.h) {
            return true;
        }
        return false;
    };

    if (!creaturesLoaded) return null;

    return (
        <>
            {
                player && <Player skin={player.sprite} data={{ id: player.id, faction: player.faction }} useTurn={useTurn} />
            }
            {creatures[Faction.Hostile].map(e => (
                <Npc
                    key={e.id}
                    skin={e.sprite}
                    startPosition={e.pos}
                    data={{ id: e.id, faction: e.faction }}
                    useTurn={useTurn}
                    isVisible={isVisible(e.pos)} />
            ))}
            {creatures[Faction.Friendly].map(e => (
                <Npc
                    key={e.id}
                    skin={e.sprite}
                    startPosition={e.pos}
                    data={{ id: e.id, faction: e.faction }}
                    useTurn={useTurn}
                    isVisible={isVisible(e.pos)}
                    hostile={false} />
            ))}
        </>
    );
};


export default CreatureRenderer;