import React from 'react';
import { ZoneRouteType } from '../../types';
import StaticObject from '.';

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
