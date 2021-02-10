import React from 'react';
import './style.css';
import Text from '../text';
import classList from '../../../utils/class-list';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    width?: string | number
    height?: string | number
    color?: 'light' | 'dark' | 'gunmetal' | 'light-brown' | 'dark-brown'
    m4?: boolean // margin 4px
    p4?: boolean // padding 4px
    b4?: boolean // border 4px
    align?: boolean
    id?: string
}

const Button: React.FC<Props> = ({ width, height, m4, p4, b4, color, align, className, style, id, children, onClick, ...props }) => {

    const classes = classList(
        'button',
        color === ('dark' || undefined) && (props.disabled ? 'button-dark-disabled' : 'button-dark'),
        color === 'light' && (props.disabled ? 'button-light-disabled' : 'button-light'),
        color === 'gunmetal' && (props.disabled ? 'button-gunmetal-disabled' : 'button-gunmetal'),
        color === 'light-brown' && (props.disabled ? 'button-light-brown-disabled' : 'button-light-brown'),
        color === 'dark-brown' && (props.disabled ? 'button-dark-brown-disabled' : 'button-dark-brown'),
        m4 && 'button-m4',
        p4 && 'button-p4',
        b4 && (color === 'light' || color === 'light-brown' ? 'button-b4d' : 'button-b4l'),
        align && 'button-align',
        className
    );

    return (
        <button {...props} onClick={onClick} className={classes} id={id} style={{ width, height, ...style }}>
            <Text size="medium" >{children}</Text>
        </button>
    );
};

export default Button;