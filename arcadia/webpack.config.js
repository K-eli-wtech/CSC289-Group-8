// This file is to use webpacks to use polyfill and help with all the errors we are getting
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
        "crypto": false,
        "path": false,
        "stream": false,
        "timers": false,
        "querystring": false,
        "zlib": false,
        "buffer": false,
        "process": false,
        "url": false,
        "http": false,
        "util": false,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};