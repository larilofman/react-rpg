import React, { useEffect, useRef } from 'react';
import { Dimensions } from '../../../types';
import Text from '../text';
import './style.css';

interface Props {
    size: { width: number | string, height: number | string }
    contents: string | string[]
    autoScroll?: boolean
}

const Scrollbox: React.FC<Props> = ({ size, contents, autoScroll = false }) => {
    const contentsEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (contentsEndRef && contentsEndRef.current) {
            contentsEndRef.current.scrollTop = contentsEndRef.current.scrollHeight;
        }
    };

    // When contents change, automatically scroll to the bottom if so defined by autoScroll arg
    useEffect(scrollToBottom, [contents]);

    return (
        <div className="scroll-box" style={{ height: size.height, width: size.width }} ref={autoScroll ? contentsEndRef : null}>
            <div>
                {Array.isArray(contents) ?
                    contents.map((line, index) => (
                        <Text color="dark" size="small" key={index}>{line}</Text>))
                    :
                    <Text color="dark" size="small">{contents}</Text>
                }
            </div>
        </div>
    );
};

export default Scrollbox;