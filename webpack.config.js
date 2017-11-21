const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
          }, {
            loader: "sass-loader",
        }]
        }),
      },
      {
        test: /\.(ttf|png)$/,
        use: [{
          loader: 'file-loader',
        }],
      },
    ],
  },

  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
  },

  plugins: [
    new HtmlPlugin({
      template: './src/html/index.html',
    }),
    new ExtractTextPlugin('css/styles.css'),
    new CopyWebpackPlugin([
      { from: './src/assets'}
    ])
  ]
};
