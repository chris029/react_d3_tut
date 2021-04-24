import React from 'react';
import { arc } from 'd3';

const mouthArc = arc()

export const Mouth = ({ mouthRadius, mouthWidth }) => {
    return <path d={mouthArc({
            innerRadius: mouthRadius,
            outerRadius: mouthRadius + mouthWidth,
            startAngle: Math.PI / 2,
            endAngle: Math.PI * 3 / 2
        })}
    />
}