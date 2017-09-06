import { handleActions } from 'redux-actions';
import alertsActions from 'actions/alerts';

function create(initialState) {
  return handleActions({
    [alertsActions.alerts.getAlertsInit]: state => ({
      ...state,
      isLoadingAlerts: true,
      loadingAlertsFailure: false,
      items: null,
    }),
    [alertsActions.alerts.getAlertsDone]: (state, action) => ({
      ...state,
      isLoadingAlerts: false,
      loadingAlertsFailure: action.error || false,
      items: action.error ? null : action.payload,
    }),
  }, initialState || {
    isLoadingAlerts: false,
    loadingAlertsFailure: false,
    items: [],
  });
}

export function factory(req) {
  if (req) {
    // TODO
  }
  return Promise.resolve(create());
}

export default create();
