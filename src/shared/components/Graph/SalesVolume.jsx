import React from 'react';
import PropTypes from 'prop-types';
import { VictoryBar, VictoryChart, VictoryArea, VictoryScatter, VictoryLine } from 'victory';


/*
* See the sales volume graph rendered on route /dashboard
* This is composed of 4 different graphs.
*/
const SalesVolumeGraph = ({
  barData,
  scatterData,
  areaData,
  lineData,
  domainY,
}) => (
  <VictoryChart
    height={250}
    width={400}
    domain={{ y: domainY || [0, 30] }}
  >
    <VictoryBar
      data={barData}
      style={{
        data: {
          fill: '#afcde2', width: 8,
        },
      }}
      width={10}
      padding={{ left: 100, right: 100 }}
    />
    {
      // <VictoryArea
      //   data={areaData}
      //   style={{
      //     data: {
      //       fill: '#00b4a0', opacity: 0.2,
      //     },
      //   }}
      //   interpolation="natural"
      // />
    }
    <VictoryScatter
      style={{ data: { fill: '#00b4a0' } }}
      size={7}
      data={scatterData}
    />
    {
      <VictoryLine
        style={{
          data: { stroke: '#00b4a0' },
        }}
        data={lineData}
        interpolation="natural"
      />
    }
  </VictoryChart>
);

// SalesVolumeGraph.defaultProps = {
//   barData: [
//     { week: 1, sales: 1 },
//     { week: 2, sales: 2 },
//     { week: 3, sales: 3 },
//     { week: 4, sales: 4 },
//   ],
//   areaData: [
//     { x: 1, y: 2, y0: 0.5 },
//     { x: 1.5, y: 2, y0: 0.5 },
//     { x: 2, y: 2.7, y0: 1.2 },
//     { x: 2.5, y: 3.3, y0: 1.8 },
//     { x: 3, y: 3.5, y0: 2 },
//     { x: 3.5, y: 4.5, y0: 3 },
//     { x: 4, y: 4.5, y0: 3 },
//   ],
//   lineData: [
//     { x: 1, y: 1 },
//     { x: 1.5, y: 1.2 },
//     { x: 2, y: 2 },
//     { x: 2.5, y: 2.5 },
//     { x: 3, y: 3 },
//     { x: 3.5, y: 3.8 },
//     { x: 4, y: 4 },
//   ],
//   scatterData: [
//     { x: 1, y: 1 },
//     { x: 2, y: 2 },
//     { x: 3, y: 3 },
//     { x: 4, y: 4 },
//   ]
// };

SalesVolumeGraph.propTypes = {
  barData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  scatterData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  lineData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // areaData: PropTypes.arrayOf(PropTypes.shape({})),
  domainY: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SalesVolumeGraph;
