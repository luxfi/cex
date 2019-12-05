const { formatDistanceToNow } = require('date-fns')

const faker = require('faker')

//console.log('generating fake data...')
/*
const apis = {
	name: faker.name.findName(),
	email: faker.internet.email(),
	card: faker.helpers.createCard()
}
*/

const randomIndex = (max) => {
	return Math.floor(Math.random() * Math.floor(max))
}


const permissionGranted = [
	'user profile',
	'trading activity',
	'watchlist',
	'portfolio contents'
]

const browsers = [
	'Safari',
	'Chrome (Mac)',
	'Chrome (Windows)',
	'Firefox (Mac)',
	'Firefox (Windows)',
	'iPhone (other)',
	'Android (other)'
]


const apiUsage = () =>  {
	return {
		application: faker.commerce.productName(),
		permissions: `access your ${permissionGranted[randomIndex(permissionGranted.length-1)]}`,
		date: formatDistanceToNow(faker.date.recent(180)) + " ago"
	}
}

const webSession = () => {
	return {
		date: formatDistanceToNow(faker.date.recent(180)) + " ago",
		browser: browsers[randomIndex(browsers.length - 1)] + " ",
		ip: faker.internet.ip(),
		location: faker.address.country() + ", " + faker.address.city()
	}
}

export default () => {
	let result = {
		thirdPartyApps: [],
		webSessions: []
	}
	for (let i = 0; i < 5; i++) {
		result.thirdPartyApps.push(apiUsage())
	}
	for (let i = 0; i < 10; i++) {
		result.webSessions.push(webSession())
	}
	return result
}
