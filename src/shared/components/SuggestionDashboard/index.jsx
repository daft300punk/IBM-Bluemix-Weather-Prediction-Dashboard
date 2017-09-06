import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from 'components/Header';
import Map from 'components/Map';
import NumberStat from 'components/NumberStat';
import SuggestionsCard from 'components/SuggestionsCard';
import Chatbar from 'components/Chatbar';
import Chatbox from 'components/Chatbox';
import DonutGraph from 'components/Graph/Donut';
import SalesVolumeGraph from 'components/Graph/SalesVolume';
import filters from '../../utils/filters.js';
import LineGraph from 'components/Graph/Line';
import './styles.scss';
import BackIcon from '../../../assets/images/back.svg';
import ArrowFillDown from '../../../assets/images/arrow-fill-down.svg';

const rainIcon = require('../../../assets/images/ic-rain.png');
/**
 * Renders route /dashboard/suggestions/:id
 */
export default function SuggestionDashboard({
  alert,
  optimization,
  salesVolumeByStoreGraph,
  changeSalesVolumeByStoreGraphSelectValue,
}) {
  const salesValue = alert.sales && alert.sales.value;
  let intParsedSale = 0;
  if (salesValue && salesValue.length) {
    intParsedSale = parseInt(
      salesValue.substring(0, salesValue.length - 1),
      10,
    );
  }
  console.log(alert);
  return (
    <div styleName="container">
      <Header />
      <div styleName="mainBodyContainer">
        <div styleName="leftContainer">
          <div styleName="top">
            {
              alert && alert.title &&
              <div>
                <div styleName="header">
                  <div><Link to="/dashboard"><BackIcon /></Link></div>
                  <div>
                    <h3>{`${alert.title}, ${alert.location}`}</h3>
                    <p>{`${alert.cause}, ${alert.effect}`}</p>
                  </div>
                </div>
                <div styleName="alertDetail">
                  <div styleName="donut">
                    <img src={rainIcon} />
                    <DonutGraph
                      innerData={[
                        { x: 1, y: intParsedSale },
                        { x: 2, y: 100 },
                      ]}
                      outerSales={alert.sales}
                    />
                  </div>
                  <div styleName="alertContent">
                    <p>{`${alert.detailsText}`}</p>
                    <div styleName="numberStats">
                      <NumberStat
                        percentage={alert.chance}
                        description="Chance"
                      />
                      <NumberStat
                        percentage={alert.sales.value}
                        isIncreasing={alert.sales.increasing}
                        isSevere={alert.sales.isSevere}
                        description="Sales"
                      />
                      <NumberStat
                        percentage={alert.costs.value}
                        isIncreasing={alert.costs.increasing}
                        isSevere={alert.costs.isSevere}
                        description="Costs"
                      />
                      <NumberStat
                        percentage={alert.acmeKpi.value}
                        isIncreasing={alert.acmeKpi.increasing}
                        isSevere={alert.acmeKpi.isSevere}
                        description="Acme Kpi"
                      />
                    </div>
                    <p styleName="impactsText">IMPACTS</p>
                    <div styleName="impacts">
                      {
                        alert.impacts && alert.impacts.length && alert.impacts.map(
                          (impactItem, index) => (
                            <div styleName="impactItem" key={index}>{`${impactItem}`}</div>
                          ),
                        )
                      }
                    </div>
                  </div>
                </div>
                <div styleName="suggestionsContainer">
                  <h3 styleName="suggestionsText">Suggestions</h3>
                  <div styleName="suggestionsCardContainer">
                    {
                      alert.suggestions.map((suggestion, index) => (
                        <SuggestionsCard {...suggestion} key={index} />
                      ))
                    }
                  </div>
                </div>
              </div>
            }
          </div>
          <Chatbox />
          <div styleName="spaceDummy" />
          <Chatbar />
        </div>
        <div styleName="rightContainer">
          <div styleName="mapContainer">
            <Map
              coordinatePoints={alert.coordinates && filters.mapCoordinateFromAlerts([alert])}
            />
          </div>
          <div styleName="impactedProductsContainer">
            <h4>Impacted Products</h4>
            <div styleName="mainDescContainer">
              <div styleName="optimizationNumber">
                <div styleName="number">
                  {optimization.percentage}
                  <ArrowFillDown fill="rgba(255, 255, 255, .5)" />
                </div>
              </div>
              <div styleName="textContainer">
                <h5>{`Highest Impact: ${optimization.title}`}</h5>
                <h6>{optimization.effect}</h6>
                <p>{optimization.desc}</p>
              </div>
            </div>
            <LineGraph />
          </div>
          <div styleName="salesContainer">
            <div styleName="titleContainer">
              <div styleName="title">
                <h4>Sales by Stores ({alert.location})</h4>
                <p>Affected by Weather Forecast</p>
              </div>
              <select
                defaultValue="7"
                onChange={
                  e => changeSalesVolumeByStoreGraphSelectValue(e.target.value)
                }
              >
                <option value="3">3 Day</option>
                <option value="5">5 Day</option>
                <option value="7">7 Day</option>
                <option value="10">10 Day</option>
              </select>
            </div>
            <SalesVolumeGraph
              {...salesVolumeByStoreGraph}
              domainY={[0, 5]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

SuggestionDashboard.defaultProps = {
  alert: {},
  optimization: {
    percentage: '5%',
    title: 'Product 1',
    effect: 'Decrease of Sales volume',
    desc: 'Description goes here lorem ipsum dolor sit amet consectec teture amet elite amet elite dolor',
  },
};

SuggestionDashboard.propTypes = {
  alert: PropTypes.shape({}),
  optimization: PropTypes.shape({}),
  changeSalesVolumeByStoreGraphSelectValue: PropTypes.func.isRequired,
  salesVolumeByStoreGraph: PropTypes.shape({}).isRequired,
};
