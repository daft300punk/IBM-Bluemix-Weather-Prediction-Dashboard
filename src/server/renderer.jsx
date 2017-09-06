/**
 * This module implements ExpressJS middleware for server-side rendering of
 * the App.
 */

import _ from 'lodash';
import config from 'config';
import React from 'react';
import ReactDOM from 'react-dom/server'; // This may cause warning of PropTypes
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import serializeJs from 'serialize-javascript';

import App from '../shared';

/* This is always initial state of the store. Later we'll have to provide a way
 * to put the store into correct state depending on the demanded route. */
import storeFactory from '../shared/store-factory';

const sanitizedConfig = serializeJs(
  _.omit(config, [
    'LOG_ENTRIES_TOKEN',
  ]), {
    isJSON: true,
  },
);

export default (req, res) => {
  storeFactory(req).then((store) => {
    const context = {};
    const appHtml = ReactDOM.renderToString((
      <Provider store={store}>
        <StaticRouter
          context={context}
          location={req.url}
        >
          <App />
        </StaticRouter>
      </Provider>
    ));
    if (context.status) res.status(context.status);
    res.send((
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Isomorphic ReactJS App</title>
          <link rel="stylesheet" href="/style.css" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta charset="utf-8" />
          <meta
            content="width=device-width,initial-scale=1"
            name="viewport"
          />
        </head>
        <body>
          <div id="react-view">${appHtml}</div>
          <script type="application/javascript">
            window.CONFIG = ${sanitizedConfig}
            window.ISTATE = ${serializeJs(store.getState(), { isJSON: true })}
          </script>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>`
    ));
  });
};
