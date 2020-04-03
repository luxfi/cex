module.exports = {
  setupFiles: ['<rootDir>/tests/setup.js'],
  preset: 'jest-puppeteer',
  testRegex: '\\.test\\.js$',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
}
