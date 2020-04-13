const { exec } = require('child_process')
const http = require('http')
const path = require('path')
const { Spinner } = require('cli-spinner')
const jest = require('jest')
const handler = require('serve-handler')
const yargs = require('yargs')

// require('regenerator-runtime')
const jestE2EConfig = require('../../jest.config.integration')
const { ENVIRONMENTS } = require('./utils/constants')

const testDir = __dirname
let filePathObj
let server
let testHost

const {
  show,
  slow,
  devtools,
  serial,
  _,
  noBuild,
} = yargs.argv

const puppeteerConfig = {
  args: ['--incognito', '--no-sandbox'],
  headless: !show,
  timeout: 30000,
  slowMo: slow || 0,
  devtools: devtools || false,
}

if (yargs.argv._.length) {
  filePathObj = [`${__dirname}/${_[0]}`]
}

if (process.env.NODE_ENV === 'prod') {
  testHost = ENVIRONMENTS.PROD.host
} else if (process.env.NODE_ENV === 'staging') {
  testHost = ENVIRONMENTS.STAGING.host
} else {
  testHost = ENVIRONMENTS.DEV.host
}

jestE2EConfig.testEnvironmentOptions = {
  puppeteerConfig,
  testHost,
  _: filePathObj,
}

const runTest = async () => {
  console.log('<<<<<<<<<<  Running E2E tests  >>>>>>>>>>')
  jest
    .runCLI({ _: jestE2EConfig.testEnvironmentOptions._, runInBand: serial, ...jestE2EConfig }, [testDir])
    .then((success) => {
      server.close()
    })
    .catch((failure) => {
      server.close()
      console.error(failure)
    })
}

const runServer = () => {
  server = http.createServer((request, response) => handler(request, response, {
    public: path.resolve(__dirname, '../../out'),
  }))

  server.listen(8080, () => {
    console.log('Serving static files at http://localhost:8080')
    runTest()
  })
}

runServer()
