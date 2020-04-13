const NodeEnvironment = require('jest-environment-node')
const puppeteer = require('puppeteer')

class PuppeteerTestEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup()

    const { puppeteerConfig, testHost } = this.context

    this.browser = await puppeteer.launch(puppeteerConfig)
    this.global.browser = this.browser
    this.global.host = testHost
  }

  async teardown() {
    await super.teardown()
    await this.browser.close()
  }

  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = PuppeteerTestEnvironment
