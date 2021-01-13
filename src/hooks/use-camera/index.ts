import { Position } from '../../types';
import { useStateValue } from '../../components/state';
import useSetCameraPosition from '../../components/state/action-hooks/useSetCameraPosition';
import clamp from '../../utils/clamp';

export default function useCamera() {
    const [{ zoneData, displaySize }] = useStateValue();
    const { setCameraPosition } = useSetCameraPosition();

    const updateCamera = (pos: Position) => {
        const x_adjust = displaySize.w % 2 !== 0 ? 0.5 : 0;
        const y_adjust = displaySize.h % 2 !== 0 ? 0.5 : 0;

        const x = clamp(0, zoneData.size.w - displaySize.w, pos.x - (displaySize.w / 2) + x_adjust);
        const y = clamp(0, zoneData.size.h - displaySize.h, pos.y - (displaySize.h / 2) + y_adjust);

        setCameraPosition({ x, y });
    };

    return {
        updateCamera
    };
}