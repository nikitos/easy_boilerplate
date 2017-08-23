const config = require('./common');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(config, {
  plugins:[
  ],
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
  }
});
