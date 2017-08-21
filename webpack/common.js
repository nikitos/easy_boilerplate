const webpack = require('webpack');
const path = require('path');
 
const srcPath  = path.join(__dirname, '../src');
const distPath = path.join(__dirname, '../dist');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
  node: {
    fs: 'empty'
  },
  devtool: '#cheap-module-eval-source-map',
  context: srcPath,
  entry: {
    app: './scripts/app.js',
  },
  output: {
      path: distPath,
      filename: 'js/[name].bundle.js',
  },
  resolve: {
      extensions: ['.js', '.styl', '.pug'],
      modules: ["node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/scripts'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'es2016'],
              cacheDirectory: true,
              plugins: ['transform-runtime']
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
              emitWarning: true,
              configFile: '.eslintrc'
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              exports: false
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'stylus-loader' ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: { outputPath: 'images/' }  
        }
      }
    ]
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('css/style.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new HtmlWebpackPlugin({
      template: 'templates/index.pug'
    })
  ]
};
