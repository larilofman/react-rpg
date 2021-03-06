import React, { CSSProperties } from 'react';
import classList from '../../../utils/class-list';
import './style.css';

interface Props {
    size: "x-small" | "small" | "medium" | "large" | "x-large" | "xx-large"
    outline?: boolean
    bold?: boolean
    className?: string
    style?: CSSProperties | undefined
    color?: "light" | "dark"
    center?: boolean

}

const Text: React.FC<Props> = ({ size, outline, bold, children, className, style, color, center }) => {

    const classes = classList('text',
        size === 'x-small' && 'text-x-small',
        size === 'small' && 'text-small',
        size === 'medium' && 'text-medium',
        size === 'large' && 'text-large',
        size === 'xx-large' && 'text-xx-large',
        size === 'x-large' && 'text-x-large',
        outline && 'text-outline',
        bold && 'text-bold',
        color === ('light' || undefined) && 'text-light',
        color === 'dark' && 'text-dark',
        center && 'text-centered',
        className
    );
    return (
        <p className={classes} style={style}>{children}</p>

    );

};

export default Text;