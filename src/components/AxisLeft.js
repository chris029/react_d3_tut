export const AxisLeft = ({ yScale, innerWidth }) => (
    yScale.ticks().map(tickValue => (
        <g className="tick" key={tickValue}>
            <line x2={innerWidth} y1={yScale(tickValue)} y2={yScale(tickValue)}/>
            <text 
                style={{textAnchor: 'end'}}
                dy=".32em"
                x={-3}
                y={yScale(tickValue)}>
                {tickValue}
            </text>
        </g>
    ))
)