'use strict';

import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import validate, { Joi } from 'webpack-validator';
import baseConfig from './webpack.base.config.babel';

// Style configuration
// ---
const CSS_CHUNK_NAMING = '[name]__[local]___[hash:base64:5]';
const STYLE_LOADERS = [
  'css?modules&importLoaders=1&localIdentName=' + CSS_CHUNK_NAMING,
  'postcss-loader',
  'sass?&sourceMap',
];

const configDev = {
  debug: true,
  devtool: 'inline-source-map',

  entry: {
    app: [
      'webpack-hot-middleware/client', path.resolve(__dirname, '../src', 'app-client.js')
    ],
  },

  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[name].chunk.js'
  },
  
  target: 'web',

  devServer: {
    inline: true,
    port: process.env.PORT || 3000,
    contentBase: [
      './public',
      path.resolve(__dirname, '../public', 'static'),
    ],
    historyApiFallback: {
      index: '/index-static.html'
    },
    headers: { 'Access-Control-Allow-Origin': '*',  'Access-Control-Allow-Credentials': 'true' },
    host: 'localhost',
    noInfo: false,
    stats: {
      colors: true,
      children: false,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders : ['style?sourceMap'].concat(STYLE_LOADERS)
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'bundle.[name].js',
      minChunks: Infinity
    })
  ]
  
};


export default validate(merge(baseConfig, configDev), {
  schemaExtension: Joi.object({
    sassLoader: Joi.any(),
  }),
});