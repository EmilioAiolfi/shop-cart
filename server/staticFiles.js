// Imports for Webpack Development Server
import path from 'path';
import Express from 'express';
// import config from './config';
import { webpackMiddleware, webpackHotMiddleware } from './webpackMiddleware';

const isDev = process.env.NODE_ENV === 'development';

/**
 * Links the webpack hot reload service into the express app
 * @param {express.Router} app the express application
 * @returns {express.Router} the express application
 */
function linkStaticFiles(app) {
  app.use('/static', Express.static(path.join(__dirname, '..', 'public', 'static')));

  app.use(webpackMiddleware);
  
  if (isDev) {
    app.use(webpackHotMiddleware);
  }

  return app;
}

export default linkStaticFiles;
