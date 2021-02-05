const path = require('path');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const src = path.resolve(__dirname, '../src');
const isDev = process.env.NODE_ENV !== 'production';

const base = {
  entry: {
    index: path.resolve(src, 'index.js')
  },
  output: {
    filename: 'index.js',
    chunkFilename: 'common/[name]/[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                isDev && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: 'happypack/loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        use: [
          !isDev ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          } : 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          !isDev ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          } :
            'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.module\.\w+$/i,
                exportLocalsConvention: 'camelCase',
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader'
        ]
      }, {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less'],
    modules: [
      src,
      path.resolve(__dirname, '../node_modules'),
    ],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@containers': path.resolve(__dirname, '../src/containers'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@enum': path.resolve(__dirname, '../src/enum'),
      '@less': path.resolve(__dirname, '../src/less'),
      '@fonts': path.resolve(__dirname, '../src/fonts'),
      '@stores': path.resolve(__dirname, '../src/stores'),
      '@utils': path.resolve(__dirname, '../src/utils'),
    }
  },
  plugins: [
    !isDev ?
      new MiniCssExtractPlugin({
        filename: 'index.css',
      }) :
      null,
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'index.html'),
      filename: 'index.html'
    }),
    isDev && new ReactRefreshWebpackPlugin(),
    new HappyPack({
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                targets: ['> 1%', 'last 2 versions', 'IE >= 10'],
                corejs: '3',
              }
            ],
            '@babel/preset-react'
          ],
          plugins: [
            ['@babel/plugin-proposal-decorators', {
              legacy: true
            }],
            ['@babel/plugin-proposal-class-properties', {
              loose: true
            }],
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-proposal-nullish-coalescing-operator',
          ]
        }
      }]
    })
  ],
};

base.plugins = base.plugins.filter((item) => {
  if (item !== null) {
    return item;
  }
  return false;
});

module.exports = base;