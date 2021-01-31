import React from 'react';
import Npc from '../../npc';
import { Faction, Position } from '../../../types';
import settings from '../../../data/settings.json';
import Player from '../../player';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';

interface Props {
    useTurn: () => void
}

const CreatureRenderer: React.FC<Props> = ({ useTurn }) => {
    const { player, cameraPosition, creatures, zoneLoaded, gameOver } = useSelector((state: RootState) => (
        {
            cameraPosition: state.cameraPosition,
            creatures: state.zone.status.creatures,
            zoneLoaded: state.zone.zoneLoaded,
            player: state.zone.status.creatures[Faction.Player][0],
            gameOver: state.zone.gameOver
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

    if (!zoneLoaded) return null;

    return (
        <>
            {
                player && !gameOver &&
                <Player skin={player.sprite} data={{ id: player.id, faction: player.faction }} useTurn={useTurn} />
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