import React from 'react';
import Sprite from '../sprite';
import { Position, SpriteData, ZoneRouteType } from '../../types';
import StaticObject from '../object';

interface Props {
    zoneRoute: ZoneRouteType
}

const ZoneRoute: React.FC<Props> = ({ zoneRoute }) => {
    return <StaticObject
        sprite={`/sprites/objects/bazaar_portal.png`}
        position={zoneRoute.position}
    />;
};

export default ZoneRoute;
