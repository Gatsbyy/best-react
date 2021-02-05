module.exports = {
  env: {
    production: {
      plugins: ['transform-react-remove-prop-types']
    }
  },
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' }, corejs: 3 }],
    ['@babel/preset-react']
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import']
};
