import _ from 'lodash';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'utils/logger';
import loggerMiddleware from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';
import requestIp from 'request-ip';
import stream from 'stream';
import { toJson as xmlToJson } from 'utils/xml2json';
import loadRoutes from '../shared/utils/loadRoutes';
import routes from './routes';

import renderer from './renderer';

/* Isomorphic code may rely on this environment variable to check whether it is
 * executed client- or server-side. */
if (process.env.FRONT_END) {
  throw new Error(
    'process.env.FRONT_END must evaluate to false at the server side');
}

const USE_DEV_TOOLS = Boolean(process.env.DEV_TOOLS);

const app = express();

app.use(favicon(path.resolve(__dirname, '../assets/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(requestIp.mw());

/* Log Entries service proxy. */
app.use('/api/logger', (req, res) => {
  logger.log(`${req.clientIp} > `, ...req.body.data);
  res.end();
});

loggerMiddleware.token('ip', req => req.clientIp);

app.use(loggerMiddleware(':ip > :status :method :url :response-time ms :res[content-length] :referrer :user-agent', {
  stream: new stream.Writable({
    decodeStrings: false,
    write: (chunk, encoding, cb) => {
      if (!chunk.match(/ELB-HealthChecker\/2.0/)) {
        logger.log(chunk);
      }
      cb();
    },
  }),
}));

/* Setup of Webpack Hot Reloading for development environment.
 * These dependencies are not used nor installed in production deployment,
 * hence some import-related lint rules are disabled. */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
if (USE_DEV_TOOLS) {
  const webpack = require('webpack');
  const webpackConfig = require('../../config/webpack/development');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  compiler.apply(new webpack.ProgressPlugin());
  app.use(webpackDevMiddleware(compiler, {
    name: 'bundle.js',
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true,
  }));
  app.use(webpackHotMiddleware(compiler));
}
/* eslint-enable global-require */
/* eslint-enable import/no-extraneous-dependencies */
/* eslint-enable import/no-unresolved */

app.use(express.static(path.resolve(__dirname, '../../build')));

/**
 * Auxiliary endpoint for xml -> json conversion (the most popular npm library
 * for such conversion works only in the node :(
 */
app.use('/api/xml2json', (req, res) => {
  xmlToJson(req.body.xml).then(json => res.json(json));
});

/**
 * Load routes. Note the related services are not isomorphic because they use urls
 * with credentials. We can only call them on server. Also we cache calls to
 * the route returning sales forecast for all locations so that we don't make unnecessary
 * api calls.
 */
const apicache = require('apicache');

const cache = apicache.middleware;
// Cache for one day, since weather forecast for next 10 days changes only
// next day. You can shorten this period if you feel so.
app.use('/api/salesForecast/all', cache('1 day'));

const apiRouter = new express.Router();
loadRoutes(apiRouter, routes);
app.use('/api', apiRouter);

app.use(renderer);

/* Catches 404 and forwards it to error handler. */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* Error handler. */
app.use((err, req, res) => {
  /* Sets locals. Errors are provided only in dev. */
  _.assign(res, {
    locals: {
      error: req.app.get('env') === 'development' ? err : {},
      message: err.message,
    },
  });

  /* Returns the error page. */
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

export default app;
