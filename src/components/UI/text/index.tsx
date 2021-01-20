import React, { CSSProperties } from 'react';
import './style.css';

interface Props {
    size: "small" | "medium" | "large" | "x-large"
    outline?: boolean
    bold?: boolean
    style?: CSSProperties | undefined

}

function classList(...classes: Array<string | boolean | undefined>) {
    return classes
        .filter(item => !!item)
        .join(' ');
}

const Text: React.FC<Props> = ({ size, outline, bold, children, style }) => {

    const classes = classList('text',
        size === 'small' && 'text-small',
        size === 'medium' && 'text-medium',
        size === 'large' && 'text-large',
        size === 'x-large' && 'text-x-large',
        outline && 'text-outline',
        bold && 'text-bold'
    );

    return (
        <p className={classes} style={style}>{children}</p>
    );

};

export default Text;