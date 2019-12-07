import moment from 'moment'

const faker = require('faker')

const randomIndex = (max) => Math.floor(Math.random() * Math.floor(max))

const permissionGranted = [
  'user profile',
  'trading activity',
  'watchlist',
  'portfolio contents',
]

const browsers = [
  'Safari',
  'Chrome (Mac)',
  'Chrome (Windows)',
  'Firefox (Mac)',
  'Firefox (Windows)',
  'iPhone (other)',
  'Android (other)',
]


const apiUsage = () => {
  return {
    application: faker.commerce.productName(),
    permissions: `access your ${permissionGranted[randomIndex(permissionGranted.length-1)]}`,
    date: moment(faker.date.recent(180)).toNow(true) + " ago"
  }
}

const webSession = () => {
  return {
    date: moment(faker.date.recent(180)).toNow(true) + " ago",
    browser: browsers[randomIndex(browsers.length - 1)] + " ",
    ip: faker.internet.ip(),
    location: faker.address.country() + ", " + faker.address.city()
  }
}

export default () => {
  const result = {
    thirdPartyApps: [],
    webSessions: [],
  }
  for (let i = 0; i < 5; i++) {
    result.thirdPartyApps.push(apiUsage())
  }
  for (let i = 0; i < 10; i++) {
    result.webSessions.push(webSession())
  }
  return result
}
