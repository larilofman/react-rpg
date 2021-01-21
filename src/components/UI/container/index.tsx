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
    bb4?: boolean
    bnt4?: boolean
    vcenter?: boolean
    row?: boolean
}

const Container: React.FC<Props> = ({ width, height, m4, p4, b4, bb4, bnt4, color, vcenter, className, row, style, children }) => {
    const classes = classList('container',
        color === ('dark' || undefined) && 'container-dark',
        color === 'light' && 'container-light',
        color === 'gunmetal' && 'container-gunmetal',
        m4 && 'container-m4',
        p4 && 'container-p4',
        b4 && (color === 'light' ? 'container-b4d' : 'container-b4l'),
        bb4 && (color === 'light' ? 'container-bb4d' : 'container-bb4l'),
        bnt4 && (color === 'light' ? 'container-bnt4d' : 'container-bnt4l'),
        vcenter && 'container-vcenter',
        row && 'container-row',
        className
    );

    return (
        <div className={classes} style={{ width, height, ...style }}>
            {children}
        </div>

    );

};

export default Container;