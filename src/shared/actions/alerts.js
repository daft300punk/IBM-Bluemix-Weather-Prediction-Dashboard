/**
 * Actions for fetching alerts data.
 */

import _ from 'lodash';
import { createActions } from 'redux-actions';
import AlertsService from 'services/alerts';

function getAlertsDone() {
  return AlertsService.getAlerts();
}

export default createActions({
  ALERTS: {
    GET_ALERTS_INIT: _.noop,
    GET_ALERTS_DONE: getAlertsDone,
  },
});
