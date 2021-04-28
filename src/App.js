import React from 'react';
import { scaleLinear, format, extent } from 'd3'; 
import { useData } from './useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Marks } from './components/Marks';

const width = 960;
const height = 500;
const margin = {
  top: 20,
  right: 30,
  bottom: 100,
  left: 220
};

const xAxisTickFormat = (n) => (
  format(".4s")(n).replace('G', 'B')
)

export const App = () => {
  const data = useData();
  

  if(!data) {
    return <pre>Loading...</pre>; 
  } 

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const xValue = (d) => d.sepal_length;
  const xAxisLabel = 'Sepal Length';
  const yValue = (d) => d.sepal_width;
  const yAxisLabel = 'Sepal Width';
  const yAxisLabelOffset = 50

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <text 
          textAnchor={'middle'} 
          fontSize={'2em'} 
          x={-yAxisLabelOffset} 
          y={innerHeight / 2}
          transform={`translate(${-yAxisLabelOffset-200},${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
        />
        <text textAnchor={'middle'} fontSize={'2em'} x={innerWidth / 2} y={innerHeight+60}>{xAxisLabel}</text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  )
};