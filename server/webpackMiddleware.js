import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.config.babel';

const compiler = webpack(config);

export const webpackMiddleware = devMiddleware(compiler, {
  target: 'node',
  contentBase: './src/server', //config.contentBase,
  publicPath: config.output.publicPath,
  noInfo: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  stats: {
    colors: true,
    children: false,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
  },
});

export const webpackHotMiddleware = hotMiddleware(compiler, {
  log: console.log
});
