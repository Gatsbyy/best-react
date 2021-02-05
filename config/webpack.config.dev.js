const path = require('path');
const webpack = require('webpack');
const env = require('./dev.env');
const base = require('./webpack.config.base');
const config = require('./dev');
const ip = require('ip');

const address = ip.address();


base.output.publicPath = `http://${address}:${config.dev.port}/`;

base.plugins.unshift(
  new webpack.DefinePlugin(env),
  new webpack.HotModuleReplacementPlugin({})
);

module.exports = Object.assign(base, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
    hot: true,
    host: address,
    port: config.dev.port,
    // proxy: {
    //   '/api/*': {
    //     target: config.dev.apiUrl,
    //     changeOrigin: true,
    //     secure: true,
    //   },
    // },
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' }
      ]
    }
  },
  devtool: 'source-map'
});
