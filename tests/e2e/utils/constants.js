const defaultNavigationTimeout = { waitUntil: 'networkidle0', timeout: 0 }
const defaultSelectorTimeout = {
  timeout: 30000,
}
const defaultWaitUntil = { waitUntil: 'load', timeout: 0 }
const defaultViewport = {
  desktop: {
    width: 1280,
    height: 1024,
  },
}
const ENVIRONMENTS = {
  DEV: {
    host: 'http://localhost:8080',
  },
  STAGING: {
    host: 'https://staging.entertainmentstockx.com',
  },
  PROD: {
    host: 'https://entertainmentstockx.com',
  },
}

module.exports = {
  defaultViewport,
  defaultNavigationTimeout,
  defaultSelectorTimeout,
  defaultWaitUntil,
  ENVIRONMENTS,
}
