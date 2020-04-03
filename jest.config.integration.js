const config = require('./jest.config')

config.testRegex = '\\.spec\\.js$'
config.testTimeout = 50000
config.testEnvironment = './tests/testEnvironment'
module.exports = config
