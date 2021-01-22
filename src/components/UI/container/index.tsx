import React, { CSSProperties } from 'react';
import './style.css';
import classList from '../../../utils/class-list';

interface Props extends React.HTMLAttributes<HTMLElement> {
    width?: string | number
    height?: string | number
    color?: 'light' | 'dark' | 'gunmetal' | 'light-brown' | 'dark-brown'
    m4?: boolean
    p4?: boolean
    b4?: boolean
    bb4?: boolean
    bnt4?: boolean
    vcenter?: boolean
    row?: boolean
    id?: string
}

const Container: React.FC<Props> = ({ width, height, m4, p4, b4, bb4, bnt4, color, vcenter, className, row, style, id, children, onMouseDown }) => {
    const classes = classList(
        'container',
        color === ('dark' || undefined) && 'container-dark',
        color === 'light' && 'container-light',
        color === 'gunmetal' && 'container-gunmetal',
        color === 'light-brown' && 'container-light-brown',
        color === 'dark-brown' && 'container-dark-brown',
        m4 && 'container-m4', // margin 4px
        p4 && 'container-p4', // padding 4px
        b4 && (color === 'light' || color === 'light-brown' ? 'container-b4d' : 'container-b4l'), // border 4px
        bb4 && (color === 'light' || color === 'light-brown' ? 'container-bb4d' : 'container-bb4l'), // border bottom 4px
        bnt4 && (color === 'light' || color === 'light-brown' ? 'container-bnt4d' : 'container-bnt4l'), // border of 4px on other sides but top
        vcenter && 'container-vcenter', // justify content, so vertically with the default column setting
        row && 'container-row',
        className
    );

    return (
        <div onMouseDown={onMouseDown} className={classes} id={id} style={{ width, height, ...style }}>
            {children}
        </div>

    );

};

export default Container;