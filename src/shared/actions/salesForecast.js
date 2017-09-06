/**
 * Action for the Sales Forecast data.
 */

import _ from 'lodash';
import { createActions } from 'redux-actions';
import SalesForecastService from '../services/watson/SalesForecastService';

function getSalesFroecastDone() {
  return SalesForecastService.getSalesDataForecast();
}

export default createActions({
  SALES_FORECAST: {
    GET_SALES_FORECAST_INIT: _.noop,
    GET_SALES_FORECAST_DONE: getSalesFroecastDone,
  },
  UI: {
    CHANGE_SALES_VOLUME_ALL_GRAPH_SELECT_VALUE: newVal => newVal,
    CHANGE_SALES_VOLUME_BY_STORE_GRAPH_SELECT_VALUE: newVal => newVal,
  },
});
