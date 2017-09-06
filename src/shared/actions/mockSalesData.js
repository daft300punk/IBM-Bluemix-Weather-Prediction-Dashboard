/**
 * Actions for the Mock Sales Data Fetch example.
 */

import _ from 'lodash';
import { createActions } from 'redux-actions';
import MockSalesDataService from '../services/watson/MockSalesDataService';

function fetchDataDone() {
  return MockSalesDataService.generateSalesData()
    .then(data => data.json()).then(data => data);
}

export default createActions({
  MOCK: {
    DATA_FETCH: {
      FETCH_DATA_INIT: _.noop,
      FETCH_DATA_DONE: fetchDataDone,
    },
  },
});
