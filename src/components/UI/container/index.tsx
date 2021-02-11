import React from 'react';
import './style.css';
import classList from '../../../utils/class-list';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
    width?: string | number
    height?: string | number
    color?: 'light' | 'dark' | 'gunmetal' | 'light-brown' | 'dark-brown'
    m4?: boolean // margin 4px
    p4?: boolean // padding 4px
    br2?: boolean // border right 2px
    bl2?: boolean // border left 2px
    b4?: boolean // border 4px
    bt4?: boolean // border top 4px
    br4?: boolean // border right 4px
    bb4?: boolean // border bottom 4px
    bl4?: boolean // border left 4px
    bnt4?: boolean // border of 4px on other sides but top
    bnb4?: boolean // border on other sides but bottom
    justify?: boolean // justify content
    align?: boolean // align content
    row?: boolean
    id?: string
}

const Container: React.FC<ContainerProps> = (
    {
        width, height, m4, p4, br2, bl2, b4, bt4, br4, bb4, bl4, bnt4, bnb4,
        color, justify, align, className, row, style, id, children,
        onMouseDown, onClick
    }
) => {
    const classes = classList(
        'container',
        b4 && 'container-b4',
        bt4 && 'container-bt4',
        br4 && 'container-br4',
        bb4 && 'container-bb4',
        bl4 && 'container-bl4',
        bnt4 && 'container-bnt4',
        bnb4 && 'container-bnb4',
        br2 && 'container-br2',
        bl2 && 'container-bl2',
        color === ('dark' || undefined) && 'container-dark',
        color === 'light' && 'container-light',
        color === 'gunmetal' && 'container-gunmetal',
        color === 'light-brown' && 'container-light-brown',
        color === 'dark-brown' && 'container-dark-brown',
        m4 && 'container-m4',
        p4 && 'container-p4',
        justify && 'container-justify',
        align && 'container-align',
        row && 'container-row',
        className
    );

    return (
        <div onMouseDown={onMouseDown} className={classes} id={id} style={{ width, height, ...style }} onClick={onClick}>
            {children}
        </div>

    );

};

export default Container;