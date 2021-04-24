import React from 'react'

export const BackgroundCircle = ({ radius, strokeWidth }) => (
    <circle
        r = {radius}
        fill="#fed42d"
        stroke="black"
        strokeWidth={strokeWidth}
    />
);