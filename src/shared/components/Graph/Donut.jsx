import React from 'react';
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory';

/*
* See the donut graph at route /dashboard/suggestions/:id.
* This is hacky at best. We render threen Victory pie graphs,
* one inside another. You may need to play with data to get
* hold of this.
*
* The fill colors can be rendered dynamically depending on data,
* see how it is done by passing a function.
*/
const SalesVolumeGraph = ({
  innerData,
  outerData,
  outerSales,
}) => (
  <svg viewBox="0 0 400 400" width="100%" height="100%">
    <VictoryPie
      style={{
        data: {
          fill: (d) => {
            const color = d.y <= 6 ? '#516674' : '#284254';
            return color;
          },
        },
      }}
      labels={() => ''}
      innerRadius={100}
      data={outerData}
    />
    <VictoryPie
      style={{
        data: {
          fill: () => '#1c3649',
        },
      }}
      innerRadius={120}
      data={[
        { x: 1, y: 5 },
      ]}
      labels={() => ''}
    />
    <VictoryPie
      style={{
        data: {
          fill: (d) => {
            let color;
            if (outerSales.increasing) {
              color = '#00b4a0';
            } else if (outerSales.isSevere) {
              color = '#e80000';
            } else {
              color = '#f38b00';
            }
            return d.x === 1 ? color : '#284254';
          },
        },
      }}
      labels={() => ''}
      innerRadius={130}
      data={innerData}
    />
  </svg>
);

SalesVolumeGraph.defaultProps = {
  innerData: [
    { x: 1, y: 6 },
    { x: 2, y: 10 },
  ],
  outerData: [
    { x: 1, y: 5 },
    { x: 2, y: 25 },
  ],
};

SalesVolumeGraph.propTypes = {
  innerData: PropTypes.arrayOf(PropTypes.shape({})),
  outerData: PropTypes.arrayOf(PropTypes.shape({})),
  outerSales: PropTypes.shape({}).isRequired,
};

export default SalesVolumeGraph;
