import React, { useEffect, useRef } from 'react';
import Text from '../text';
import './style.css';

interface Props {
    width?: string
    height?: string
    contents: string | string[]
    autoScroll?: boolean
}

const Scrollbox: React.FC<Props> = ({ contents, autoScroll = false }) => {
    const contentsEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (contentsEndRef && contentsEndRef.current) {
            contentsEndRef.current.scrollTop = contentsEndRef.current.scrollHeight;
        }
    };

    // When contents change, automatically scroll to the bottom if so defined by autoScroll arg
    useEffect(scrollToBottom, [contents]);

    return (
        <div style={{ padding: "4px" }} className="scroll-box" ref={autoScroll ? contentsEndRef : null}>
            {Array.isArray(contents) ?
                contents.map((line, index) => (
                    <Text color="dark" size="small" key={index}>{line}</Text>))
                :
                <Text color="dark" size="small">{contents}</Text>
            }
        </div>
    );
};

export default Scrollbox;