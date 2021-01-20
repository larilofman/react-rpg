import React, { CSSProperties } from 'react';
import './style.css';
import classList from '../../../utils/class-list';

interface Props {
    width?: string | number
    height?: string | number
    color?: 'light' | 'dark' | 'gunmetal'
    className?: string
    style?: CSSProperties | undefined
    m4?: boolean
    p4?: boolean
    b4?: boolean
}

const Container: React.FC<Props> = ({ width, height, m4, p4, b4, color, className, style, children }) => {
    const classes = classList('container',
        color === ('dark' || undefined) && 'container-dark',
        color === 'light' && 'container-light',
        color === 'gunmetal' && 'container-gunmetal',
        m4 && 'container-m4',
        p4 && 'container-p4',
        b4 && (color === 'light' ? 'container-b4d' : 'container-b4l'),
        className
    );

    console.log(classes);
    return (
        <div className={classes} style={{ width, height, ...style }}>
            {children}
        </div>

    );

};

export default Container;