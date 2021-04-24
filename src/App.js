import React, { useState, useCallback } from 'react';
import { Face } from './components/Face';
import { range } from 'd3';

const width = 166;
const height = 166;
const initialMousePosition = { x: width / 2, y: height / 2};

export const App = () => {
    const [mousePosition, setMousePosition] = useState(initialMousePosition);
 
    const handleMouseMove = useCallback(event => {
        const { clientX, clientY } = event;

        setMousePosition({ x: clientX, y: clientY });
    }, [setMousePosition]);

    return (
        <div className="container" onMouseMove={handleMouseMove}>
            <Face
                width={width}
                height={height}
                centerX={mousePosition.x}
                centerY={mousePosition.y}
                strokeWidth={10}
                eyeOffsetX={30}
                eyeOffsetY={30}
                eyeRadius={5 + Math.random() * 10}
                mouthRadius={7 + Math.random() * 50}
                mouthWidth={2 + Math.random() * 10}
            />
        </div>
    )
};