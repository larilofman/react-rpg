import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';
import ObjectRenderer from '../renderer';
import ObjectLoader from '../loader';

const ObjectManager: React.FC = () => {
    const { tilesLoaded, zoneName, objectsLoaded, cameraPosition } = useSelector((state: RootState) => (
        {
            tilesLoaded: state.zone.tilesLoaded,
            zoneName: state.game.currentZone.name,
            objectsLoaded: state.zone.objectsLoaded,
            cameraPosition: state.cameraPosition
        }
    ));

    if (!tilesLoaded) return null;

    return (
        <>
            <ObjectLoader objectsLoaded={objectsLoaded} zoneName={zoneName} />
            <ObjectRenderer cameraPosition={cameraPosition} objectsLoaded={objectsLoaded} />
        </>
    );
};

export default ObjectManager;
