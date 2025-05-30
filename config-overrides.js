const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

// Simplified config-overrides.js to test if the issue is with the compression plugin
module.exports = override(
  // Add path aliases for cleaner imports
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  })
);
