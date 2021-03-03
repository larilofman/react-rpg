import React from 'react';
import StaticObject from '.';
import { ZoneRouteType } from '../../types/tile';

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
