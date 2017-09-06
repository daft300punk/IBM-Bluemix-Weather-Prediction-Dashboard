import React from 'react';
import PropTypes from 'prop-types';
import { VictoryAxis, VictoryLine, VictoryChart } from 'victory';

/*
* See line graph rendered on route /dashboard/suggestions/2
*/
const LineGraph = ({
  data1,
  data2,
  data3,
}) => (
  <VictoryChart
    interpolation="natural"
    height={250}
    width={400}
  >
    <VictoryLine
      interpolation="natural"
      data={data1}
      labels={d => (d.x === 1 ? 'Product 1' : '')}
      style={{
        data: {
          stroke: '#eb2020', strokeWidth: 2,
        },
      }}
    />
    <VictoryLine
      interpolation="natural"
      data={data2}
      labels={d => (d.x === 1 ? 'Product 2' : '')}
      style={{
        data: {
          stroke: '#f38b00', strokeWidth: 2,
        },
      }}
    />
    <VictoryLine
      interpolation="natural"
      data={data3}
      labels={d => (d.x === 1 ? 'Product 3' : '')}
      style={{
        data: {
          stroke: '#5596e6', strokeWidth: 2,
        },
      }}
    />
    <VictoryAxis
      crossAxis
      domain={[1, 5]}
      style={{
        tickLabels: { fontSize: 0 },
      }}
    />
  </VictoryChart>
);

LineGraph.defaultProps = {
  data1: [
    { x: 1, y: 4 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 1 },
    { x: 5, y: 0 },
  ],
  data2: [
    { x: 1, y: 2 },
    { x: 2, y: 3.2 },
    { x: 3, y: 3 },
    { x: 4, y: 2 },
    { x: 5, y: 1 },
  ],
  data3: [
    { x: 1, y: 3 },
    { x: 2, y: 4 },
    { x: 3, y: 4.5 },
    { x: 4, y: 4 },
    { x: 5, y: 3 },
  ],
};

LineGraph.propTypes = {
  data1: PropTypes.arrayOf(PropTypes.shape({})),
  data2: PropTypes.arrayOf(PropTypes.shape({})),
  data3: PropTypes.arrayOf(PropTypes.shape({})),
};

export default LineGraph;
