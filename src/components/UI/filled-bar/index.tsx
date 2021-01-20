import React from 'react';
import './style.css';
import Text from '../text';

interface Props {
    size: {
        width: number | string,
        height: number | string
    },
    label: string,
    data: {
        min:
        number,
        max: number,
        current: number
    },
    colors: {
        filled: string,
        background: string,
        text: string
    }
}

const FilledBar: React.FC<Props> = ({ size, label, data, colors }) => {

    const fillPercent = data.current / data.max * 100;

    // flip gradient over when going under 50%... for whatever reason?
    const barStyle = fillPercent >= 50 ?
        { background: `linear-gradient(to right, ${colors.filled} ${fillPercent}%, ${colors.background} ${100 - fillPercent}%)` }
        :
        { background: `linear-gradient(to left, ${colors.background} ${100 - fillPercent}%, ${colors.filled} ${fillPercent}%)` }
        ;
    return (
        <div className="filled-bar-container">
            <h4 className="filled-bar-label">{label}</h4>
            <div className="filled-bar" style={barStyle}>
                <Text size="large" outline bold style={{ color: colors.text }}>{`${data.current} / ${data.max}`}</Text>
            </div>
        </div>

    );

};

export default FilledBar;