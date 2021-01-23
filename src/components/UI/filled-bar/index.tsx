import React from 'react';
import './style.css';
import Text from '../text';
import Container from '../container';

interface Props {
    width: number | string,
    height: number | string,
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
    },
    gap: string
}

const FilledBar: React.FC<Props> = ({ width, height, label, data, colors, gap }) => {

    const fillPercent = data.current / data.max * 100;

    // flip gradient over when going under 50%... for whatever reason?
    const barStyle = fillPercent >= 50 ?
        { background: `linear-gradient(to right, ${colors.filled} ${fillPercent}%, ${colors.background} ${100 - fillPercent}%)` }
        :
        { background: `linear-gradient(to left, ${colors.background} ${100 - fillPercent}%, ${colors.filled} ${fillPercent}%)` }
        ;
    const paddingRight = gap ? gap : '';
    return (
        <Container row justify className="filled-bar-container" style={{ width, height }}>
            <Text size="x-large" bold style={{ paddingRight }}>{label}</Text>
            <Container height="100%" justify className="filled-bar" style={barStyle}>
                <Text size="large" outline bold>{`${data.current} / ${data.max}`}</Text>
            </Container>
        </Container>

    );

};

export default FilledBar;