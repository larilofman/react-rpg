import React, { useEffect, useRef } from 'react';
import { Dimensions } from '../../../types';
import './style.css';

interface Props {
    size: Dimensions
    contents: string | string[]
    id: string
    autoScroll?: boolean
}

const Scrollbox: React.FC<Props> = ({ size, contents, id, autoScroll = false }) => {
    const contentsEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (contentsEndRef && contentsEndRef.current) {
            contentsEndRef.current.scrollTop = contentsEndRef.current.scrollHeight;
        }
    };

    // When contents change, automatically scroll to the bottom if so defined by autoScroll arg
    useEffect(scrollToBottom, [contents]);

    return (
        <div id={id} className="scroll-box" style={{ height: size.h, width: size.w }} ref={autoScroll ? contentsEndRef : null}>
            {Array.isArray(contents) ?
                contents.map((line, index) => (<p key={index}>{line}</p>))
                :
                <p>{contents}</p>
            }
        </div>
    );
};

export default Scrollbox;