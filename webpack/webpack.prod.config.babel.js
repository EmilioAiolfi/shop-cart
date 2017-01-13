'use strict';

import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import validate, { Joi } from 'webpack-validator';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import baseConfig from './webpack.base.config.babel';


// Style configuration
// ---
const CSS_CHUNK_NAMING = '[name]__[local]___[hash:base64:5]';
const STYLE_LOADERS = [
  'css?modules&importLoaders=1&localIdentName=' + CSS_CHUNK_NAMING,
  'postcss-loader',
  'sass?&sourceMap',
];

const configPROD = {
  devtool: 'cheap-module-source-map',

  entry: {
    app: path.resolve(__dirname, '../src', 'app-client.js'),
  },

  output: {
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  
  target: 'web',

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader : ExtractTextPlugin.extract('style', STYLE_LOADERS)
      },
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'bundle.[name].js',
      minChunks: Infinity
    }),
    
    new ExtractTextPlugin('style.[name].[chunkhash].css', {
      disable: false,
      allChunks: true //extract all css from async chunks as well
    }),

    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
      sourcemap: false,
      beautify: false,
      dead_code: true
    }),


    //new webpack.optimize.OccurenceOrderPlugin(true),

  ]
};


export default validate(merge(baseConfig, configPROD), {
  schemaExtension: Joi.object({
    sassLoader: Joi.any(),
  }),
});