/**
 * This module contains the root reducer factory for the app's state. The
 * factory returns a promise which resolves to the reducer. It accepts
 * ExpressJS HTTP request object as its only optional arguments.
 *
 * In case the argument is provided, the factory assumes server-side rendering,
 * and it can use data available in the HTTP request to preload any necessary
 * data to use as the default state.
 *
 * In case no argument is provided, the factory assumes client-side rendering
 * and should not spend time on creating the default state, as the store will
 * be created with the initial state passed from server anyway.
 *
 * To understand reducers read http://redux.js.org/docs/basics/Reducers.html.
 */

import { combineReducers } from 'redux';
import { resolveReducers } from 'utils/redux';

import { factory as examplesFactory } from './examples';
import { factory as alertsFactory } from './alerts';
import { factory as optimizationsFactory } from './optimizations';
import { factory as mockSalesFactory } from './mockSalesData';
import { factory as salesForecastFactory } from './salesForecast.js';

export function factory(req) {
  return resolveReducers({
    examples: examplesFactory(req),
    alerts: alertsFactory(req),
    optimizations: optimizationsFactory(req),
    mock: mockSalesFactory(req),
    salesForecast: salesForecastFactory(req),
  }).then(reducers => combineReducers({
    ...reducers,
  }));
}

export default undefined;
