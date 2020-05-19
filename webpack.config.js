
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ["@babel/polyfill", './src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(jpg|png)$/, loader: 'url?limit=25000' },
      { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      path: path.resolve(__dirname, 'dist')
    })
  ]
};