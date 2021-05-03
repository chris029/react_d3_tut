import React from 'react';
import { useState } from 'react';
import { scaleLinear, format, extent } from 'd3'; 
import { useData } from './useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Marks } from './components/Marks';
import { Dropdown } from './components/Dropdown';

const width = 960;
const height = 500;
const margin = {
  top: 20,
  right: 30,
  bottom: 100,
  left: 220
};

const attributes = [
  {value: 'sepal_length', label: 'Sepal length'},
  {value: 'sepal_width', label: 'Sepal width'},
  {value: 'petal_length', label: 'Petal length'},
  {value: 'petal_width', label: 'Petal width'},
  {value: 'species', label: 'Species'}
]

const getLabel = (value) => {
  for (let i=0; i<attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label
    }
  }
}

const xAxisTickFormat = (n) => (
  format(".4s")(n).replace('G', 'B')
)

export const App = () => {
  const data = useData();

  const initialXAttribute = 'petal_length';
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const initialYAttribute = 'petal_length';
  const [yAttribute, setYAttribute]  = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  if(!data) {
    return <pre>Loading...</pre>; 
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  
  // const yValue = (d) => d.sepal_width;
  // const yAxisLabel = 'Sepal Width';
  const yAxisLabelOffset = 50

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])

  return (
    <>
      <label htmlFor="x-select">X:</label>
      <Dropdown
        options={attributes}
        id="x-select"
        selectValue={xAttribute}
        onSelectedValueChange={setXAttribute}  
      />
      <label htmlFor="y-select">Y:</label>
      <Dropdown
        options={attributes}
        id="y-select"
        selectValue={yAttribute}
        onSelectedValueChange={setYAttribute}  
      />
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
    </>
  )
};