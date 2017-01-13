import devConfig from './webpack/webpack.dev.config.babel.js';
import prodConfig from './webpack/webpack.prod.config.babel.js';

var config;

switch (process.env.NODE_ENV) {
case 'development':
  config = devConfig;
  break;
case 'production':
  config = prodConfig;
  break;
default:
  config = devConfig;
  break;
}

module.exports = config;