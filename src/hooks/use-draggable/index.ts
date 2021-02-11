import React, { useEffect, useState } from 'react';
import { Position } from '../../types';

export default function useDraggable(id: string, startPos: Position = { x: 0, y: 0 }) {
    const [element, setElement] = useState(document.getElementById(id));
    const [dragInfo, setDragInfo] = useState<{ isDragging: boolean, offset: Position, translation: Position }>({
        isDragging: false,
        offset: { x: 0, y: 0 },
        translation: startPos
    });

    useEffect(() => {
        const elem = document.getElementById(id);
        if (elem) {
            setElement(elem);
            elem.style.cursor = "grab";
        }

    }, []);

    useEffect(() => {
        if (element) {
            if (dragInfo.isDragging) {
                element.addEventListener('mousemove', handleMouseMove);
                element.addEventListener('mouseup', handleMouseUp);
            } else {
                element.removeEventListener('mousemove', handleMouseMove);
                element.removeEventListener('mouseup', handleMouseUp);
            }
        }

        return (() => {
            if (element) {
                element.removeEventListener('mousemove', handleMouseMove);
                element.removeEventListener('mouseup', handleMouseUp);
            }
        });
    }, [dragInfo.isDragging]);

    function handleMouseUp() {
        if (element) {
            setDragInfo(prev => (
                {
                    ...prev,
                    isDragging: false
                }));
        }
    }

    function handleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (element) {
            const elemRect = element.getBoundingClientRect();
            const offsetX = e.clientX - elemRect.x;
            const offsetY = e.clientY - elemRect.y;

            setDragInfo(prev => (
                {
                    ...prev,
                    offset: { x: offsetX, y: offsetY },
                    isDragging: true
                }
            ));
        }
    }

    function handleMouseMove(e: MouseEvent) {
        const translation = { x: e.clientX - dragInfo.offset.x, y: e.clientY - dragInfo.offset.y };
        setDragInfo(prev => (
            {
                ...prev,
                translation
            }));
    }

    return { position: dragInfo.translation, handleMouseDown };
}
