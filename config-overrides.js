// config-overrides.js
const path = require('path');

module.exports = function override(config, env) {
  // Agrega los alias a la configuración de Webpack
  config.resolve.alias = {
    ...config.resolve.alias,
    '@components': path.resolve(__dirname, 'src/components/'),
    '@containers': path.resolve(__dirname, 'src/containers/'),
    '@pages': path.resolve(__dirname, 'src/pages/'),
    '@styles': path.resolve(__dirname, 'src/styles/'),
    '@assets': path.resolve(__dirname, 'src/assets/'),
    '@hooks': path.resolve(__dirname, 'src/app/hooks/'),
    '@features': path.resolve(__dirname, 'src/features/'),
  };

  return config;
};
