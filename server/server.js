'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import favicon from 'serve-favicon';
import compress from 'compression';
import cons from 'consolidate';
import { readFileSync } from 'jsonfile';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import config from './config';
import routes from '../src/routes';
import staticFiles from './staticFiles';
import NotFoundPage from '../src/components/NotFoundPage';

const app = new Express();
const server = new Server(app);

// set the engines
app.engine('.dust', cons.dust);
app.set('view engine', 'dust');
// set the view directory
app.set('views', path.join(__dirname, './views'));

// set Favicon
app.use(favicon(path.join(__dirname, '..', 'public', 'static', 'favicon.ico')));

app.use(compress());

staticFiles(app);

const manifestPath = `${process.cwd()}/public/static/build-manifest.json`;

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps} />);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage />);
        res.status(404);
      }

      const manifest = readFileSync(manifestPath);
      const styleBundle = manifest['app.css'];
      const jsBundle = manifest['app.js'];
      const vendorBundle = manifest['vendor.js'];

      // render the index template with the embedded React markup
      return res.render('index', { markup, vendorBundle, jsBundle, styleBundle });
    }
  );
});

server.listen(config.server_port, err => {
  if (err) {
    return console.error(err);
  }
  /* eslint-disable no-console */
  console.info(`Server running on http://localhost:${config.server_port} [${config.env}]`);
});
