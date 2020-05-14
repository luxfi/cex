const { exec } = require('child_process')
const http = require('http')
const path = require('path')
const { Spinner } = require('cli-spinner')
const express = require('express')
const jest = require('jest')
const next = require('next')
const handler = require('serve-handler')
const yargs = require('yargs')


// require('regenerator-runtime')
const jestE2EConfig = require('../../jest.config.integration')
const { ENVIRONMENTS } = require('./utils/constants')

const testDir = __dirname
let filePathObj
let testHost

const {
  show,
  slow,
  devtools,
  serial,
  _,
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
      process.exit(0)
    })
    .catch((failure) => {
      console.error(failure)
      process.exit(1)
    })
}

const runServer = () => {
  const app = next({ dev: false })
  const handle = app.getRequestHandler()
  const port = process.env.PORT || 8080

  app.prepare().then(() => {
    const server = express()
    server.all('*', (req, res) => handle(req, res))
    server.listen(port, (err) => {
      if (err) {
        throw err
      }
      console.log(`> App running on localhost:${port}`)
      runTest()
    })
  }).catch(e => {
    console.error(e)
    process.exit(1)
  })
}

runServer()
