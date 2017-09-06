import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import optimizationsActions from 'actions/optimizations';
import salesForecastActions from 'actions/salesForecast';
import Dashboard from 'components/Dashboard';
import filters from '../../utils/filters';

class DashboardContainer extends React.Component {
  componentDidMount() {
    if (this.props.optimizations &&
      !this.props.optimizations.length &&
      !this.props.isLoadingOptimizations
    ) {
      this.props.getOptimizations();
    }

    if (
      Object.keys(this.props.salesForecast).length === 0 &&
      !this.props.isLoadingSalesForecast
    ) {
      this.props.getSalesForecastAll();
    }
  }

  render() {
    const {
      alerts,
      isLoadingAlerts,
      optimizations,
      isLoadingOptimizations,
      salesVolumeAllGraph,
      changeSalesVolumeAllGraphSelectValue,
      mapCoordinates,
    } = this.props;
    return (
      <Dashboard
        alerts={alerts}
        optimizations={optimizations}
        isLoadingAlerts={isLoadingAlerts}
        isLoadingOptimizations={isLoadingOptimizations}
        salesVolumeAllGraph={salesVolumeAllGraph}
        changeSalesVolumeAllGraphSelectValue={changeSalesVolumeAllGraphSelectValue}
        mapCoordinates={mapCoordinates}
      />
    );
  }
}

DashboardContainer.defaultProps = {
  alerts: [],
  optimizations: [],
  salesForecast: undefined,
  salesVolumeAllGraph: {},
};

DashboardContainer.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.shape({})),
  optimizations: PropTypes.arrayOf(PropTypes.shape({})),
  isLoadingAlerts: PropTypes.bool.isRequired,
  getOptimizations: PropTypes.func.isRequired,
  isLoadingOptimizations: PropTypes.bool.isRequired,
  salesForecast: PropTypes.shape({}),
  isLoadingSalesForecast: PropTypes.bool.isRequired,
  getSalesForecastAll: PropTypes.func.isRequired,
  salesVolumeAllGraph: PropTypes.shape({}),
  changeSalesVolumeAllGraphSelectValue: PropTypes.func.isRequired,
  mapCoordinates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  alerts: state.salesForecast.alerts,
  isLoadingAlerts: state.alerts.isLoadingAlerts,
  isLoadingOptimizations: state.optimizations.isLoadingOptimizations,
  optimizations: state.optimizations.items,
  salesForecast: state.salesForecast.items,
  isLoadingSalesForecast: state.salesForecast.isLoading,
  salesVolumeAllGraph: filters.salesVolumeAllGraph(
    state.salesForecast.salesVolumeAll,
    state.salesForecast.salesVolumeAllGraphSelectValue,
  ),
  mapCoordinates: filters.mapCoordinateFromAlerts(state.salesForecast.alerts),
});

const mapDispatchToProps = dispatch => ({
  getOptimizations: () => {
    dispatch(optimizationsActions.optimizations.getOptimizationsInit());
    dispatch(optimizationsActions.optimizations.getOptimizationsDone());
  },
  getSalesForecastAll: () => {
    dispatch(salesForecastActions.salesForecast.getSalesForecastInit());
    dispatch(salesForecastActions.salesForecast.getSalesForecastDone());
  },
  changeSalesVolumeAllGraphSelectValue: (value) => {
    dispatch(salesForecastActions.ui.changeSalesVolumeAllGraphSelectValue(value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardContainer);
