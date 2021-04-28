export const AxisLeft = ({ yScale }) => (
    yScale.domain().map(tickValue => (
        <g className="tick" key={tickValue}>
            <text 
                style={{textAnchor: 'end'}}
                dy=".32em"
                x={-3}
                y={yScale(tickValue) + yScale.bandwidth() / 2}>
                {tickValue}
            </text>
        </g>
    ))
)