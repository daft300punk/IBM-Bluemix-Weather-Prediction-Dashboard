/**
 * Client-side rendering of the App.
 */

import { BrowserRouter, browserHistory } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import shortId from 'shortid';

import storeFactory from '../shared/store-factory';

/* Isomorphic code may rely on this environment variable to check whether it is
 * executed client- or server-side. */
if (!process.env.FRONT_END) {
  throw new Error(
    'process.env.FRONT_END must evaluate to true at the client side');
}

/**
 * Authentication method
 * The result should be stored in the Redux store, for example inside
 * state.auth
 *
 * @param {Object} store Redux store.
 */
let firstAuth = true;
function authenticate(store) { // eslint-disable-line no-unused-vars
  if (firstAuth) {
    firstAuth = false;
    // Initialize authentication params here
  }

  // Authentication code goes here...
  /*
   * The following snippets comes from
   * https://github.com/topcoder-platform/community-app/blob/develop/src/client/index.jsx
   * It demonstrate how authentication can be implemented, and also how
   * to refresh the auth token automatically using setTimeout().
   *
  getFreshToken().then((tctV3) => {
    const tctV2 = cookies.get('tcjwt');
    logger.log('Authenticated as:', decodeToken(tctV3));
    if (!tctV2) logger.error('Failed to fetch API v2 token!');
    return ({ tctV2, tctV3 });
  }).catch(() => {
    logger.warn('Authentication failed!');
    return ({});
  }).then(({ tctV2, tctV3 }) => {
    const auth = store.getState().auth;
    if (auth.tokenV3 !== (tctV3 || null)) {
      store.dispatch(actions.auth.setTcTokenV3(tctV3));
    }
    if (auth.tokenV2 !== (tctV2 || null)) {
      store.dispatch(actions.auth.setTcTokenV2(tctV2));
    }
    store.dispatch(actions.auth.loadProfile(tctV3));

    // Automatic refreshment of auth tokens
    let time = Number.MAX_VALUE;
    if (tctV2) time = decodeToken(tctV2).exp;
    if (tctV3) time = Math.min(time, decodeToken(tctV3).exp);
    if (time < Number.MAX_VALUE) {
      time = 1000 * (time - config.REAUTH_TIME);
      time = Math.max(0, time - Date.now());
      logger.log('Reauth scheduled in', time / 1000, 'seconds');
      setTimeout(() => authenticate(store), time);
    }
  });
  */
}

storeFactory(undefined, window.ISTATE).then((store) => {
  authenticate(store);

  function render() {
    const App = require('../shared').default; // eslint-disable-line global-require
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('react-view'),
    );
  }

  render();

  if (module.hot) {
    module.hot.accept('../shared', render);

    /* This block of code forces reloading of style.css file each time
     * webpack hot middleware reports about update of the code. */
    /* eslint-disable no-underscore-dangle */
    const hotReporter = window.__webpack_hot_middleware_reporter__;
    const hotSuccess = hotReporter.success;
    hotReporter.success = () => {
      const link = document.querySelectorAll('link[rel=stylesheet]')[0];
      link.href = `/style.css?v=${shortId.generate()}`;
      hotSuccess();
    };
  }
});
