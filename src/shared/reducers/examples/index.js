/**
 * This module contains an example of reducer for Flux Standard Actions for
 * Redux.
 * For details read https://github.com/acdlite/redux-actions.
 */

import { combineReducers } from 'redux';
import { resolveReducers } from 'utils/redux';

import { factory as dataFetchFactory } from './data-fetch';

export function factory(req) {
  return resolveReducers({
    dataFetch: dataFetchFactory(req),
  }).then(reducers => combineReducers({
    ...reducers,
  }));
}

export default undefined;
