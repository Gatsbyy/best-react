const path = require('path');

module.exports = {
  rootDir: path.join(__dirname),
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>src/__mocks__/fileMock.js',
    '\\.(css|less|sass)$': 'identity-obj-proxy',
    '^@src(.*)$': '<rootDir>src$1',
    '^@components(.*)$': '<rootDir>src/components$1',
    '^@containers(.*)$': '<rootDir>src/containers$1',
    '^@enum(.*)$': '<rootDir>src/enum$1',
    '^@hooks(.*)$': '<rootDir>src/hooks$1',
    '^@stores(.*)$': '<rootDir>src/stores$1',
    '^@utils(.*)$': '<rootDir>src/utils$1',
  },
};