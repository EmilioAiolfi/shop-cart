'use strict';

require('babel-register');
require.extensions['.scss'] = () => {
  return;
};
require('./server');