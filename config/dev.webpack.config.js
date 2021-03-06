/* global */
const { resolve } = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('@redhat-cloud-services/frontend-components-config');
const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, '../'),
  debug: true,
  https: false,
  sassPrefix: '.rbac, .my-user-access',
  ...(process.env.BETA && { deployment: 'beta/apps' }),
});

plugins.push(
  require('@redhat-cloud-services/frontend-components-config/federated-modules')({
    root: resolve(__dirname, '../'),
  })
);

module.exports = (env) => {
  env && env.analyze === 'true' && plugins.push(new BundleAnalyzerPlugin());

  return { ...webpackConfig, plugins };
};
