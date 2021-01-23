import React, { useEffect, useState } from 'react';
import Text from '../text';
import Container from '../container';
import './style.css';

interface Props {
    width?: string
    height?: string
    label?: string
    options: string[] | number[]
    initialOption?: string | number
}

const Select: React.FC<Props> = ({ width, height, label, options, initialOption }) => {
    const [value, setValue] = useState(initialOption || options[0]);

    return (
        <Container className="select-container" style={{ width: width, height: height }}>
            <Text bold size="x-large" className="select-label-text">
                {label}
            </Text>
            <select className="select" value={value} onChange={(e) => setValue(e.target.value)}>
                {(options as Array<string | number>).map(
                    (option: string | number) =>
                        <option className={value === option ? "option-selected" : "option"} key={option} value={option}>{option}</option>)}
            </select>
        </Container>
    );
};

export default Select;