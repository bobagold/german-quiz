const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'core-js/fn/object/assign',
    'core-js/fn/array/from',
    'core-js/fn/string/includes',
    'core-js/fn/number/parse-int',
    './index.js'
  ],
  output: {
    filename: 'build/[name].[hash].bundle.js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.js$/, include: /text-quiz-game/, loader: 'babel-loader' },
    ],
  },
  // devtool: 'eval-source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.src.html',
    }),
  ],
};
