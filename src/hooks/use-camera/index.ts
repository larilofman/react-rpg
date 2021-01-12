import { Position } from '../../types';
import { useStateValue } from '../../components/state';
import useSetCameraPosition from '../../components/state/action-hooks/useSetCameraPosition';
import clamp from '../../utils/clamp';

export default function useCamera() {
    const [{ mapData, displaySize }] = useStateValue();
    const { setCameraPosition } = useSetCameraPosition();

    const updateCamera = (pos: Position) => {
        const x = clamp(0, mapData.size.w - displaySize.w, pos.x - (displaySize.w / 2));
        const y = clamp(0, mapData.size.h - displaySize.h, pos.y - (displaySize.h / 2));

        setCameraPosition({ x, y });
    };

    return {
        updateCamera
    };
}