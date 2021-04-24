import React from 'react'

export const FaceContainer = ({ children, width, height, centerX, centerY }) => (
    <div className="container">
        <svg width={width} height={height}>
            <g transform={`translate(${centerX},${centerY})`}>
                {children}
            </g>
        </svg>
    </div>
)