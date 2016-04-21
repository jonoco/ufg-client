var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { exclude: /node_modules/, test: /\.js?$/, loader: 'babel' },
      { test: /\.jsx?$/, 
        loaders: ['react-hot', 'babel'], 
        include: path.join(__dirname,'src')
      }
    ],
    query: { presets: ['es2015', 'react', 'stage-2'] }
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
