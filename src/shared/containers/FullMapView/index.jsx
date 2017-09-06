import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FullMapView from 'components/FullMapView';
import filters from '../../utils/filters';
import salesForecastActions from '../../actions/salesForecast';

class FullMapViewContainer extends React.Component {
  componentDidMount() {
    if (
      Object.keys(this.props.salesForecast).length === 0 &&
      !this.props.isLoadingSalesForecast
    ) {
      this.props.getSalesForecastAll();
    }
  }

  render() {
    const {
      mapCoordinates,
      location,
      history,
    } = this.props;
    return (
      <FullMapView
        mapCoordinates={mapCoordinates}
        location={location}
        history={history}
      />
    );
  }
}

FullMapViewContainer.defaultProps = {
  alerts: [],
  optimizations: [],
  salesForecast: undefined,
  salesVolumeAllGraph: {},
  mapCoordinates: [],
};

FullMapViewContainer.propTypes = {
  salesForecast: PropTypes.shape({}),
  isLoadingSalesForecast: PropTypes.bool.isRequired,
  getSalesForecastAll: PropTypes.func.isRequired,
  mapCoordinates: PropTypes.arrayOf(PropTypes.shape({})),
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  isLoadingSalesForecast: state.salesForecast.isLoading,
  salesForecast: state.salesForecast.items,
  mapCoordinates: filters.mapCoordinateFromAlerts(state.salesForecast.alerts),
});

const mapDispatchToProps = dispatch => ({
  getSalesForecastAll: () => {
    dispatch(salesForecastActions.salesForecast.getSalesForecastInit());
    dispatch(salesForecastActions.salesForecast.getSalesForecastDone());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FullMapViewContainer);
