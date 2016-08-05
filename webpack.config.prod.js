var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.less$/,
      loaders: ['style', 'css', 'less'],
      include: path.join(__dirname, 'src/style')
    }, {
      test: /aws-sdk/,
      loaders: ['transform?aws-sdk/dist-tools/transform']
    }, {
      test: /\.json$/,
      loaders: ['json']
    }]
  }
};