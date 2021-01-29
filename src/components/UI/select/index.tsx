import React, { useEffect, useState } from 'react';
import Text from '../text';
import Container from '../container';
import './style.css';

interface Props {
    width?: string
    height?: string
    label?: string
    options: string[] | number[]
    initialOption?: string | number,
    onChange: (value: string | number) => void,
}

const Select: React.FC<Props> = ({ width, height, label, options, initialOption, onChange }) => {
    const [value, setValue] = useState(initialOption || options[0]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (Number(e.target.value)) {
            setValue(Number(e.target.value));
        } else {
            setValue(e.target.value);
        }

    };

    useEffect(() => {
        onChange(value);
    }, [value]);

    useEffect(() => {
        // if (options.length && !value) {
        //     setValue(options[0]);
        // } else {
        //     setValue(options[options.length - 1]);
        // }
        if (!value && options.length) {
            setValue(options[options.length - 1]);
        }
    }, [options]);

    return (
        <Container className="select-container" style={{ width: width, height: height }}>
            <Text bold size="x-large" className="select-label-text">
                {label}
            </Text>
            <select value={value} className="select" onChange={handleChange}>
                {(options as Array<string | number>).map(
                    (option: string | number) =>
                        <option
                            className={value === option ? "option-selected" : "option"}
                            key={option}
                            value={option}
                        >
                            {option}</option>)}
            </select>
        </Container>
    );
};

export default Select;