import React from 'react';
import Header from 'components/Header';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import Chatbar from 'components/Chatbar';
import Chatbox from 'components/Chatbox';
import Map from 'components/Map';
import OptimizationCard from 'components/OptimizationCard';
import SalesVolumeGraph from 'components/Graph/SalesVolume';
import './styles.scss';


/**
 * The page available at /dashboard route.
 */
export default function Dashboard({
  firstName,
  alerts,
  optimizations,
  salesVolumeAllGraph,
  changeSalesVolumeAllGraphSelectValue,
  mapCoordinates,
}) {
  return (
    <div styleName="container">
      <Header />
      <div styleName="mainBodyContainer">
        <div styleName="leftContainer">
          <div styleName="greeting">
            <h3>Hi {firstName}, how are you doing?</h3>
            <p>Here is today&#39;s analysis and suggestions.</p>
          </div>
          <div styleName="cardContainer">
            {
              alerts ? alerts.map(alert => <Card key={alert.id} {...alert} />) : null
            }
          </div>
          <Chatbox />
          <div styleName="spaceDummy" />
          <Chatbar />
        </div>
        <div styleName="rightContainer">
          <div styleName="mapContainer">
            <Map
              coordinatePoints={mapCoordinates}
            />
          </div>
          <div styleName="optimizeContainer">
            <OptimizationCard optimizations={optimizations} />
          </div>
          <div styleName="salesVolumeContainer">
            <div styleName="titleContainer">
              <div styleName="title">
                <h4>Sales Volume</h4>
                <p>Affected by Weather Forecast</p>
              </div>
              <select
                defaultValue="7"
                onChange={
                  e => changeSalesVolumeAllGraphSelectValue(e.target.value)
                }
              >
                <option value="3">3 Day</option>
                <option value="5">5 Day</option>
                <option value="7">7 Day</option>
                <option value="10">10 Day</option>
              </select>
            </div>
            {
              salesVolumeAllGraph.barData &&
              <SalesVolumeGraph
                {...salesVolumeAllGraph}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.defaultProps = {
  firstName: 'John',
  alerts: [],
  optimizations: [],
  salesVolumeAllGraph: {},
};

Dashboard.propTypes = {
  firstName: PropTypes.string,
  alerts: PropTypes.arrayOf(PropTypes.shape({})),
  optimizations: PropTypes.arrayOf(PropTypes.shape({})),
  salesVolumeAllGraph: PropTypes.shape({}),
  changeSalesVolumeAllGraphSelectValue: PropTypes.func.isRequired,
  mapCoordinates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
