import React from 'react';
import CreatureManager from '../creature/manager';
import MapManager from '../map/manager';
import ObjectManager from '../objects/manager';

const GameManager: React.FC = () => {


    return (
        <>
            <MapManager />
            <ObjectManager />
            <CreatureManager />
        </>
    );
};

export default GameManager;