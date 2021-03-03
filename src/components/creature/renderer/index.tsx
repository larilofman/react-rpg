import React from 'react';
import Npc from '../../npc';
import { displaySize } from '../../../data/settings/general';
import Player from '../../player';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';
import { Faction } from '../../../types/creature';
import { Position } from '../../../types/general';

const CreatureRenderer: React.FC = () => {
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
            pos.x < cameraPosition.x + displaySize.w &&
            pos.y >= cameraPosition.y &&
            pos.y < cameraPosition.y + displaySize.h) {
            return true;
        }
        return false;
    };

    if (!creaturesLoaded) return null;

    return (
        <>
            {
                player &&
                <Player
                    skin={player.sprite}
                    data={{ id: player.id, faction: player.faction }}
                />
            }
            {creatures[Faction.Hostile].map(e => (
                <Npc
                    key={e.id}
                    skin={e.sprite}
                    startPosition={e.pos}
                    data={{ id: e.id, faction: e.faction }}
                    isVisible={isVisible(e.pos)} />
            ))}
            {creatures[Faction.Friendly].map(e => (
                <Npc
                    key={e.id}
                    skin={e.sprite}
                    startPosition={e.pos}
                    data={{ id: e.id, faction: e.faction }}
                    isVisible={isVisible(e.pos)}
                    hostile={false} />
            ))}
        </>
    );
};


export default CreatureRenderer;