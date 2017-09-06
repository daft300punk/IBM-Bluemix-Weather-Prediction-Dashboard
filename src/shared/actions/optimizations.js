/**
 * Actions for fetching optimizationS data.
 */

import _ from 'lodash';
import { createActions } from 'redux-actions';
import OptimizationsService from 'services/optimizations';

function getOptimizationsDone() {
  return OptimizationsService.getOptimizations();
}

export default createActions({
  OPTIMIZATIONS: {
    GET_OPTIMIZATIONS_INIT: _.noop,
    GET_OPTIMIZATIONS_DONE: getOptimizationsDone,
  },
});
