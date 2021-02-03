module.exports = {
  env: {
    production: {
      plugins: ['transform-react-remove-prop-types']
    }
  },
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react']
  ],
};
