const jest = require('jest')
const yargs = require('yargs')
const jestE2EConfig = require('../../jest.config.integration')

const {
  show,
  slow,
  devtools,
  _,
} = yargs.argv

let testPath = __dirname

const puppeteerConfig = {
  args: ['--incognito', '--no-sandbox'],
  headless: !show,
  timeout: 30000,
  slowMo: slow || 0,
  devtools: devtools || false,
}

jestE2EConfig.testEnvironmentOptions = { puppeteerConfig }

if (yargs.argv._.length) {
  // eslint-disable-next-line prefer-destructuring
  testPath = `${__dirname}/${_[0]}`
}

jest
  .runCLI(jestE2EConfig, [testPath])
  .then((success) => {
    console.log('<<<< Test completed >>>>')
  })
  .catch((failure) => {
    console.error(failure)
  })
