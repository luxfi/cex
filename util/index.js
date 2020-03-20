import useEventListener from './useEventListener'

import ReactGA from 'react-ga'

const isNumber = val => typeof val === 'number' && val === val
const isPassword = (value) => value && typeof value === 'string' && value.length > 6
const isServer = () => typeof window === 'undefined'

function isEmail(value) {
  const re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return re.test(value)
}

function isPhone(v) {
  let num = parseInt(v, 10)
  if (!isNaN(v) && ('' + num === '' + v) && ('' + v).length == 10) {
    return '' + num
  }
  throw Error('Invalid phone number.')
}

function isRequired(value) {
  return !!value
}

function isStringInteger(str) {
  // match a digit one or more times
  const re = new RegExp(/^\d+(?:\.\d{1,2})?$/)
  return re.test(str)
}

function isStringUSCurrency(stringInput) {
  // match a digit one or more times
  const re = new RegExp(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/)
  return re.test(stringInput)
}

function googlePageView() {
  ReactGA.pageview(window.location.pathname + window.location.search)
}

function formatCurrency(num, currency = 'USD', decimal = true) {
  let formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(num)

  if (!decimal) {
    formatted = formatted.split('.')[0]
  }

  return formatted
}

function padDollarAmount(amount) {
  let _amount = amount
  if (typeof _amount === 'number') _amount = _amount.toString()
  if (_amount.indexOf('.') === -1) {
    return `${_amount}.00`
  }

  const splitAmount = _amount.split('.')
  if (splitAmount.length === 1) {
    return `${splitAmount[0]}.00`
  } else if (splitAmount[1].length === 2) {
    return `${_amount}`
  } else {
    return `${splitAmount[0]}.${splitAmount[1].padEnd(2, '0').slice(0, 2)}`
  }
}

// pluralize(0, 'apple'); // 'apples'
// pluralize(1, 'apple'); // 'apple'
// pluralize(2, 'apple'); // 'apples'
function pluralize(val, word, plural = word + 's') {
  const _pluralize = (num, word, plural = word + 's') =>
    [1, -1].includes(Number(num)) ? word : plural
  if (typeof val === 'object')
    return (num, word) => _pluralize(num, word, val[word])
  return _pluralize(val, word, plural)
}

function truncate(str, length, ending) {
  if (length == null) {
    length = 20
  }

  if (ending == null) {
    ending = '...'
  }

  if (Array.from(str).length > length) {
    return (
      str
        .split(' ')
        .slice(0, length)
        .join(' ') + ending
    )
  }

  return str
}

function toDashString(str) {
  if (!str) {
    throw 'toDashString str parameter is undefined!'
  }

  const arr = str
    .split(' ')
    .filter(x => x)
    .map(x => x.charAt(0).toLowerCase() + x.slice(1))

  return arr.join('-').replace(/[A-Z]/g, m => '-' + m.toLowerCase())
}

function slugFromPath() {
  try {
    // const parts = location.pathname.split('/')
    const parts = location.pathname.match(/[^/]+/g)
    return parts[parts.length-1]
  } catch (err) {
    return ''
  }
}

function getYoutubeId(trailerUrl) {
  const videoUrlArray = trailerUrl.split('/')
  return videoUrlArray[videoUrlArray.length - 1]
}

function creditCardFormat(value = '') {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const matches = v.match(/\d{4,16}/g)
  const match = matches ? matches[0] : ''
  const parts = []

  for (let i = 0; i < match.length; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join(' ')
  }
  return value
}

function getCreditCardType(value) {
  const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
  const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/
  const amexpRegEx = /^(?:3[47][0-9]{13})$/
  const discoverRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/

  const creditCardNumber = value.replace(/\s/g, '')
  let creditCardType = ''

  if (visaRegEx.test(creditCardNumber)) {
    creditCardType = 'visaCard'
  } else if (mastercardRegEx.test(creditCardNumber)) {
    creditCardType = 'masterCard'
  } else if (amexpRegEx.test(creditCardNumber)) {
    creditCardType = 'amexCard'
  } else if (discoverRegEx.test(creditCardNumber)) {
    creditCardType = 'discoverCard'
  }

  return creditCardType
}

export {
  formatCurrency,
  googlePageView,
  isEmail,
  isNumber,
  isPassword,
  isPhone,
  isRequired,
  isServer,
  isStringInteger,
  isStringUSCurrency,
  padDollarAmount,
  pluralize,
  slugFromPath,
  truncate,
  toDashString,
  useEventListener,
  creditCardFormat,
  getCreditCardType,
  getYoutubeId,
}
