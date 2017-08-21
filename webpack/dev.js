const config = require('./common');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(config, {
  plugins:[
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ]
});
