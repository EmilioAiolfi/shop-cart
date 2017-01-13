// start the server

const config = {
  env : process.env.NODE_ENV || 'production', //'development',
  server_port : process.env.PORT || 3000,
  isDev: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
};

module.exports = config;
