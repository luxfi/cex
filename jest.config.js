module.exports = {
  setupFiles: ['<rootDir>/tests/setup.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  preset: 'jest-puppeteer',
  testRegex: '\\.test\\.js$',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
}
