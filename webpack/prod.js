const webpack = require('webpack');
const config = require('./common');
const merge = require('webpack-merge');

module.exports = merge(config, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false,
      sourceMap: false,
      minimize: true,
      comments: false,
      beautify: false,
      debug: false
    })
  ]
});
