const path = require('path');
const fs = require('fs');
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
    before: function (app) {
      app.get('/mock/*', function (req, res) {
        const fileName = req.params[0].split('/').pop();
        const filepath = path.resolve(__dirname, '../src/mock', `${fileName}.json`);
        try {
          const content = fs.readFileSync(filepath, 'utf-8');
          const data = JSON.parse(content);
          res.json({ code: 200, data })
        } catch (err) {
          console.error('your mock data filename should be', `${fileName}.json`);
          res.json({
            code: 1,
            msg: err.message
          });
        }
      });
    },
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
