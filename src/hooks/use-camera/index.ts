import { Position } from '../../types';
import clamp from '../../utils/clamp';
import settings from '../../data/settings.json';
import { useDispatch } from 'react-redux';
import { SetCameraPosition } from '../../components/redux-state/reducers/camera-position/actions';

import { useSelector } from 'react-redux';
import { RootState } from '../../components/redux-state/store';

export default function useCamera() {
    const zoneSize = useSelector((state: RootState) => state.zone.zoneStatus.size);
    const dispatch = useDispatch();

    const displaySize = settings.displaySize;

    const updateCamera = (pos: Position) => {
        const x_adjust = displaySize.w % 2 !== 0 ? 0.5 : 0;
        const y_adjust = displaySize.h % 2 !== 0 ? 0.5 : 0;

        let x = pos.x - (displaySize.w / 2) + x_adjust;
        let y = pos.y - (displaySize.h / 2) + y_adjust;
        if (zoneSize.h > displaySize.h && zoneSize.w > displaySize.w) {
            x = clamp(0, zoneSize.w - displaySize.w, x);
            y = clamp(0, zoneSize.h - displaySize.h, y);
        } else {
            x = Math.floor(zoneSize.w / 2) - Math.floor(displaySize.w / 2);
            y = Math.floor(zoneSize.h / 2) - Math.floor(displaySize.h / 2);
        }

        dispatch(SetCameraPosition({ x, y }));
    };

    return {
        updateCamera
    };
}