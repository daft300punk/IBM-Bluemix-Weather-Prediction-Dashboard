import React from 'react';
import PropTypes from 'prop-types';
import salesForecastActions from 'actions/salesForecast';
import SuggestionDashboard from 'components/SuggestionDashboard';
import { connect } from 'react-redux';
import filters from '../../utils/filters';

class SuggestionDashboardContainer extends React.Component {
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
      alerts,
      location,
      salesForecast,
      changeSalesVolumeByStoreGraphSelectValue,
      salesVolumeByStoreGraphSelectedValue,
    } = this.props;
    const splitPath = location.pathname.split('/');
    const index = splitPath[splitPath.length - 1];

    const alertProp = (alerts && alerts.length && alerts[index - 1]) || {};
    const salesVolumeByStoreGraph = filters
      .salesVolumeAllGraph(
          filters.salesVolumeByStore(
          salesForecast,
          alertProp.location,
        ),
        salesVolumeByStoreGraphSelectedValue,
      );
    return (
      <SuggestionDashboard
        alert={alertProp}
        changeSalesVolumeByStoreGraphSelectValue={
          changeSalesVolumeByStoreGraphSelectValue
        }
        salesVolumeByStoreGraph={salesVolumeByStoreGraph}
      />
    );
  }
}

SuggestionDashboardContainer.defaultProps = {
  alerts: [],
  salesForecast: undefined,
};

SuggestionDashboardContainer.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.shape({})),
  location: PropTypes.shape({}).isRequired,
  salesForecast: PropTypes.shape({}),
  getSalesForecastAll: PropTypes.func.isRequired,
  isLoadingSalesForecast: PropTypes.bool.isRequired,
  changeSalesVolumeByStoreGraphSelectValue: PropTypes.func.isRequired,
  salesVolumeByStoreGraphSelectedValue: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.salesForecast.alerts,
  isLoadingAlerts: state.alerts.isLoadingAlerts,
  salesForecast: state.salesForecast.items,
  isLoadingSalesForecast: state.salesForecast.isLoading,
  salesVolumeByStoreGraphSelectedValue: state
    .salesForecast.salesVolumeByStoreGraphSelectedValue,
});

const mapDispatchToProps = dispatch => ({
  getSalesForecastAll: () => {
    dispatch(salesForecastActions.salesForecast.getSalesForecastInit());
    dispatch(salesForecastActions.salesForecast.getSalesForecastDone());
  },
  changeSalesVolumeByStoreGraphSelectValue: (value) => {
    dispatch(salesForecastActions.ui.changeSalesVolumeByStoreGraphSelectValue(value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuggestionDashboardContainer);
