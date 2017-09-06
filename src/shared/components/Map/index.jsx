import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Circle } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Play from '../../../assets/images/play.svg';
import fancyMapStyles from './mapStyle.json';
import './styles.scss';

const expandIcon = require('../../../assets/images/ic-expand.png');

/**
 * Google Map component with custom styling.
 * Refer to libraries' api for details.
 *
 * Also, you will need api key for this. See the url below using api key.
 */

const HOC = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    ref={_.noop}
    defaultZoom={props.mapZoom}
    defaultCenter={{ lat: props.mapCenter.lat, lng: props.mapCenter.lng }}
    onClick={_.noop}
    defaultOptions={{ styles: fancyMapStyles, disableDefaultUI: true }}
  >
    {
      props.coordinatePoints.map((point) => {
        if (point.fillColor === 'red') {
          return [
            <Circle
              center={{ lat: point.center.lat, lng: point.center.lng }}
              radius={point.radius}
              options={{
                fillColor: '#e80000',
                fillOpacity: 1,
                strokeWeight: 0,
              }}
              key={`${point.id}lowOpacity`}
              zIndex={0}
            />,
            <Circle
              center={{ lat: point.center.lat, lng: point.center.lng }}
              radius={point.radius + (point.radius * 0.4)}
              options={{
                fillColor: '#e80000',
                fillOpacity: 0.5,
                strokeWeight: 0,
              }}
              key={point.id}
              zIndex={0}
            />,
          ];
        }
        return (
          <Circle
            center={{ lat: point.center.lat, lng: point.center.lng }}
            radius={point.radius}
            options={{
              fillColor: point.fillColor === 'green' ? '#00b4a0' : '#f38b00',
              fillOpacity: 1,
              strokeWeight: 0,
            }}
            key={point.id}
            zIndex={0}
          />
        );
      })
    }
  </GoogleMap>
)));

const Map = (
  { noButtons, location, history, coordinatePoints, mapCenter, mapZoom },
) => (
  <div styleName="map">
    <HOC
      containerElement={
        <div style={{ height: '100%', width: '100%' }} />
      }
      mapElement={
        <div style={{ height: '100%', width: '100%' }} />
      }
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAnT-VmbJ2tN7zWfwMANVbD815qdwqaAPk"
      loadingElement={<div>Loading</div>}
      coordinatePoints={coordinatePoints}
      mapCenter={mapCenter}
      mapZoom={mapZoom}
    />
    <div styleName="expandMap">
      {
        location.pathname === '/dashboard/map' ?
          <button onClick={() => history.go(-1)}><img src={expandIcon} alt="expand" /></button> :
          <Link to="/dashboard/map"><img src={expandIcon} alt="expand" /></Link>
      }
    </div>
    {
      !noButtons &&
      <div styleName="mapButtonContainer">
        <Button style={{ padding: '6px 12px' }}>
          <div styleName="playForecast">
            <Play />
            <p>Play Forecast</p>
          </div>
        </Button>
        <select>
          <option value="weekly">Next Day</option>
          <option value="monthly">3 Day</option>
          <option value="monthly">5 Day</option>
          <option value="monthly">7 Day</option>
          <option value="monthly">10 Day</option>
        </select>
      </div>
    }
  </div>
);

Map.defaultProps = {
  noButtons: false,
  location: {},
  history: {},
  coordinatePoints: [
    {
      center: {
        lat: -25,
        lng: 131,
      },
      radius: 100000,
      fillColor: 'red',
      id: '1',
    },
    {
      center: {
        lat: -30,
        lng: 131,
      },
      radius: 100000,
      fillColor: 'green',
      id: '2',
    },
  ],
  mapCenter: {
    lat: 37,
    lng: -95,
  },
  mapZoom: 3,
};

Map.propTypes = {
  noButtons: PropTypes.bool,
  location: PropTypes.shape({}),
  history: PropTypes.shape({}),
  coordinatePoints: PropTypes.arrayOf(PropTypes.shape({})),
  mapCenter: PropTypes.shape({}),
  mapZoom: PropTypes.number,
};

export default Map;
