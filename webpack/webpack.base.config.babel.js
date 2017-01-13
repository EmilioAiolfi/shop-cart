'use strict';

import path from 'path';
import webpack from 'webpack';
import validate, { Joi } from 'webpack-validator';

import ManifestPlugin from 'webpack-manifest-plugin';

import WebpackNotifierPlugin from 'webpack-notifier';
// import ProgressBarPlugin from 'progress-bar-webpack-plugin';
// import PolyfillsPlugin from 'webpack-polyfill-service-plugin';
import SvgStore from 'webpack-svgstore-plugin';


const configBase = {
  context: __dirname,
  entry: {
    // vendors
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'history'
    ]
  },
  
  output: {
    path: path.resolve(__dirname, '../public', 'static'),
    publicPath: '/static/',

  },
  
  module: {

    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],

    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: 'babel_cache',
          presets: ['airbnb', 'es2015', 'react'],
          plugins: [
            'transform-runtime',
            'transform-object-rest-spread'
          ],
          env: {
            development: {
              presets: ['react-hmre']
            },
            production: {
              plugins: [
                'transform-react-remove-prop-types',
                'transform-react-constant-elements',
                'transform-react-inline-elements'
              ]
            }
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /src/,
        loaders: ['style', 'css', 'scss']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(jpg|png|ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'file-loader!url-loader?limit=100000'
      }
    ]
  },

  resolve: {
    modulesDirectories: ['./src', './node_modules'],
    extensions: ['', '.webpack.js', '.js', '.jsx', '.scss', '.json'],
  },

  sassLoader: {
    sourceMap: true,
    includePaths: [ path.resolve(__dirname, '../src', 'style') ]
  },

  plugins: [
    //   new ProgressBarPlugin({ width: 40 }),

    // new PolyfillsPlugin({
    //     minify: false,
    //     features: {
    //     'fetch':  { flags: ['always', 'gated'] },
    //     'Intl.~locale.pt-BR': { flags: ['always'] }
    //     }
    // }),
    new ManifestPlugin({
      fileName: 'build-manifest.json',
      publicPath: '/static/',
      writeToFileEmit: true
    }),
    
    new SvgStore.Options({
      svgoOptions: {
        plugins: [
          { removeTitle: true }
        ]
      }
    }),
    
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    
    new webpack.NoErrorsPlugin(),
    new WebpackNotifierPlugin(),
  ]
  
};


export default validate(configBase, {
  schemaExtension: Joi.object({
    sassLoader: Joi.any(),
  }),
});