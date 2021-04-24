import React from 'react';
import { Face } from './components/Face';
import { range } from 'd3';

const width = 166;
const height = 166;
const array = range(3*6);

export const App = () => array.map(() => (
    <Face
        width={width}
        height={height}
        centerX={width / 2}
        centerY={height / 2}
        strokeWidth={10}
        eyeOffsetX={30}
        eyeOffsetY={30}
        eyeRadius={5 + Math.random() * 10}
        mouthRadius={7 + Math.random() * 9}
        mouthWidth={2 + Math.random() * 10}
    />
));