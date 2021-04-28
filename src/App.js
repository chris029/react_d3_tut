import React from 'react';
import { scaleBand, scaleLinear, max, format } from 'd3'; 
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
  const yValue = (d) => d.Country;
  const xValue = (d) => d.Population;

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.2);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth])

    console.log(xScale.ticks())


  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft
          yScale={yScale}
        />
        <text textAnchor={'middle'} fontSize={'2em'} x={innerWidth / 2} y={innerHeight+60}>Population</text>
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