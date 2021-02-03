/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const env = require('./dev.env');
const base = require('./webpack.config.base');
const config = require('./config');
const ip = require('ip');

const address = ip.address();

const mockUrl = 'http://mock.okcoin-inc.com';

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
    before(app) {
      app.all('/mock/api/tracker/v1/*', (req, res) => {
        const filename = (req.params[0] || '').split('/').pop();

        const filepath = path.resolve(__dirname, '../src/mock', `${filename}.json`);
        try {
          const content = fs.readFileSync(filepath, 'utf-8');
          const data = JSON.parse(content);
          const { timeout } = data;
          setTimeout(() => {
            res.json(data);
          }, timeout || 0);
        } catch (err) {
          console.error('your mock data filename should be', `${filename}.json`);
          res.json({
            code: 1,
            msg: err.message
          });
        }
      });
    },
    proxy: {
      '/rap/*': {
        target: mockUrl,
        changeOrigin: true,
        secure: true,
      },
      '/api/*': {
        target: config.dev.apiUrl,
        changeOrigin: true,
        secure: true,
      },
      '/cdn/*': {
        target: 'https://static.bafang.com',
        changeOrigin: true,
        secure: true,
      },

    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' }
      ]
    }
  },
  devtool: 'source-map'
});
