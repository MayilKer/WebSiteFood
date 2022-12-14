"use strict";
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/script.js',
  output: {
    path: __dirname + '/js',
    filename: 'bundle.js',
  },
  watch: true,

  devtool: "source-map",

  module: {}
};