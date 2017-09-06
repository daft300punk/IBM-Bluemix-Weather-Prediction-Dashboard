import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Map from 'components/Map';
import TimelinePlay from 'components/TimelinePlay';
import './styles.scss';

const chDefault = require('../../../assets/images/ic-checked.png');
const chRainy = require('../../../assets/images/ic-rainy-blue.png');
const chHail = require('../../../assets/images/ic-hail-blue.png');
const chTemp = require('../../../assets/images/ic-temp-blue.png');
const chWind = require('../../../assets/images/ic-wind-blue.png');
const unchDefault = require('../../../assets/images/ic-unchecked.png');
const unchRainy = require('../../../assets/images/ic-rainy-gray.png');
const unchHail = require('../../../assets/images/ic-hail-gray.png');
const unchTemp = require('../../../assets/images/ic-temp-gray.png');
const unchWind = require('../../../assets/images/ic-wind-gray.png');


/**
 * Page available at /dashboard/map route.
 * TODO: connection with redux, so data is rendered dynamically. also, the play
 * pause feature needs considrable work.
 */
export default class FullMapview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessAsUsual: false,
      optimistic: false,
      pessimistic: false,
      rainy: false,
      hail: false,
      wind: false,
      temp: false,
    };
    this.toggleState = this.toggleState.bind(this);
  }

  toggleState(stateString) {
    const currentValue = this.state[stateString];
    this.setState({
      [stateString]: !currentValue,
    });
  }

  render() {
    const { location, history, mapCoordinates } = this.props;
    return (
      <div styleName="container">
        <Header />
        <div styleName="mainBodyContainer">
          <div styleName="mapContainer">
            <Map
              noButtons
              location={location}
              history={history}
              coordinatePoints={mapCoordinates}
              mapZoom={4}
            />
          </div>
          <div styleName="controlsContainer">
            <div styleName="controls">
              <h4>Period</h4>
              <select>
                <option>Next 3 Months</option>
                <option>Next 6 Months</option>
              </select>
              <h4>Map Layers</h4>
              <div styleName="mapLayers">
                <button onClick={() => this.toggleState('rainy')}><img src={this.state.rainy ? chRainy : unchRainy} alt="rainy" /></button>
                <button onClick={() => this.toggleState('hail')}><img src={this.state.hail ? chHail : unchHail} alt="hail" /></button>
                <button onClick={() => this.toggleState('temp')}><img src={this.state.temp ? chTemp : unchTemp} alt="temp" /></button>
                <button onClick={() => this.toggleState('wind')}><img src={this.state.wind ? chWind : unchWind} alt="wind" /></button>
              </div>
              <h4>Scenario Layers</h4>
              <div styleName="checkboxOption" onClick={() => this.toggleState('businessAsUsual')} role="button" tabIndex={0}>
                <img
                  src={this.state.businessAsUsual ? chDefault : unchDefault}
                  alt="Business As Usual toggle"
                />
                <p>Business as Usual</p>
              </div>
              <div styleName="checkboxOption" onClick={() => this.toggleState('optimistic')} role="button" tabIndex={0}>
                <img
                  src={this.state.optimistic ? chDefault : unchDefault}
                  alt="Optimistic toggle"
                />
                <p>Business as Usual</p>
              </div>
              <div styleName="checkboxOption" onClick={() => this.toggleState('pessimistic')} role="button" tabIndex={0}>
                <img
                  src={this.state.pessimistic ? chDefault : unchDefault}
                  alt="Pessimistic Toggle"
                />
                <p>Business as Usual</p>
              </div>
            </div>
            <div styleName="timelineContainer">
              <TimelinePlay />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FullMapview.propTypes = {
  location: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  mapCoordinates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
