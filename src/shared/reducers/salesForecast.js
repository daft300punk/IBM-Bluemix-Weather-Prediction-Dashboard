import actions from 'actions/salesForecast';
import { handleActions } from 'redux-actions';
import filters from '../utils/filters';

function create(initialState) {
  return handleActions({
    [actions.salesForecast.getSalesForecastInit]: state => ({
      ...state,
      isLoading: true,
      loadingFailure: false,
      items: null,
      alerts: null,
    }),
    [actions.salesForecast.getSalesForecastDone]: (state, action) => ({
      ...state,
      isLoading: false,
      loadingFailure: action.error || false,
      items: action.error ? null : action.payload,
      alerts: action.error ? null : filters.alertsFilter(action.payload),
      salesVolumeAll: action.error ? null : filters.salesVolumeAll(action.payload),
    }),
    [actions.ui.changeSalesVolumeAllGraphSelectValue]: (state, action) => ({
      ...state,
      salesVolumeAllGraphSelectValue: action.payload,
    }),
    [actions.ui.changeSalesVolumeByStoreGraphSelectValue]: (state, action) => ({
      ...state,
      salesVolumeByStoreGraphSelectedValue: action.payload,
    }),
  }, initialState || {
    isLoading: false,
    loadingFailure: false,
    items: {},
    alerts: [],
    salesVolumeAll: [],
    salesVolumeAllGraphSelectValue: 7,
    salesVolumeByStoreGraphSelectedValue: 7,
  });
}

export function factory(req) {
  if (req) {
    // TODO: isomorphism
  }
  return Promise.resolve(create());
}

export default create();
