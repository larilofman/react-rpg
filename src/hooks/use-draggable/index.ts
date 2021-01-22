import React, { useEffect, useState } from 'react';
import { Position } from '../../types';

export default function useDraggable(id: string, startPos: Position = { x: 0, y: 0 }) {
    const [element, setElement] = useState(document.getElementById(id));
    const [dragInfo, setDragInfo] = useState<{ isDragging: boolean, offset: Position, translation: Position }>({
        isDragging: false,
        offset: { x: 0, y: 0 },
        translation: { x: 0, y: 0 }
    });

    useEffect(() => {
        const elem = document.getElementById(id);
        if (elem) {
            // elem.addEventListener("mousedown", handleMouseDown);
            setElement(elem);
            console.log(elem.clientLeft);
            // console.log('??');
            elem.addEventListener("mouseenter", handleMouseEnter);
            elem.addEventListener("mouseleave", handleMouseLeave);
        }

    }, []);

    const handleMouseEnter = (e: MouseEvent) => {
        console.log('mouse entered');
    };

    const handleMouseLeave = (e: MouseEvent) => {
        console.log('mouse left');
    };

    useEffect(() => {
        if (element) {
            if (dragInfo.isDragging) {
                element.addEventListener('mousemove', handleMouseMove);
                element.addEventListener('mouseup', handleMouseUp);
            } else {
                element.removeEventListener('mousemove', handleMouseMove);
                element.removeEventListener('mouseup', handleMouseUp);

                // console.log(console.log(dragInfo));

                // setDragInfo(prev => ({ ...prev, translation: { x: 0, y: 0 } }));
            }
        }

        return (() => {
            if (element) {
                element.removeEventListener('mousemove', handleMouseMove);
                element.removeEventListener('mouseup', handleMouseUp);
            }
        });
    }, [dragInfo.isDragging]);

    function handleMouseUp(e: MouseEvent) {
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
            // e.preventDefault();
            // element.style.pointerEvents = "none";
            const elemRect = element.getBoundingClientRect();
            const offsetX = e.clientX - elemRect.x;
            const offsetY = e.clientY - elemRect.y;
            console.log(offsetX, offsetY);

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
        // console.log(translation);
        setDragInfo(prev => (
            {
                ...prev,
                translation
            }));
    }

    const handleMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (element) {
            element.style.cursor = "crosshair";
        }

    };

    return { position: dragInfo.translation, handleMouseDown, handleMouseOver };
}
