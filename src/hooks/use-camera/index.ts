import { Position } from '../../types';
import { useStateValue } from '../../components/state';
import clamp from '../../utils/clamp';
import settings from '../../data/settings.json';
import { useDispatch } from 'react-redux';
import { SetCameraPosition } from '../../components/redux-state/reducers/camera-position/actions';

export default function useCamera() {
    const [{ zoneData }] = useStateValue();
    const dispatch = useDispatch();

    const displaySize = settings.displaySize;

    const updateCamera = (pos: Position) => {
        const x_adjust = displaySize.w % 2 !== 0 ? 0.5 : 0;
        const y_adjust = displaySize.h % 2 !== 0 ? 0.5 : 0;

        let x = pos.x - (displaySize.w / 2) + x_adjust;
        let y = pos.y - (displaySize.h / 2) + y_adjust;
        if (zoneData.size.h > displaySize.h && zoneData.size.w > displaySize.w) {
            x = clamp(0, zoneData.size.w - displaySize.w, x);
            y = clamp(0, zoneData.size.h - displaySize.h, y);
        } else {
            x = Math.floor(zoneData.size.w / 2) - Math.floor(displaySize.w / 2);
            y = Math.floor(zoneData.size.h / 2) - Math.floor(displaySize.h / 2);
        }
        console.log(x, y);

        dispatch(SetCameraPosition({ x, y }));
    };

    return {
        updateCamera
    };
}