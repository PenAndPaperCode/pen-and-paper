const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = override(
  // Add path aliases for cleaner imports
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  
  // Add compression for production builds
  (config) => {
    if (process.env.NODE_ENV === 'production') {
      if (!config.plugins) {
        config.plugins = [];
      }
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }
    return config;
  }
);
