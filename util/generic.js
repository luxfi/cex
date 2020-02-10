import ReactGA from 'react-ga'

const isNumber = val => typeof val === 'number' && val === val
const isServer = () => typeof window === 'undefined'

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

function textTruncate(str, length, ending) {
  if (length == null) {
    length = 48
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
    const parts = location.pathname.split('/')
    return parts[parts.length-1]
  } catch (err) {
    return ''
  }
}

export {
  formatCurrency,
  googlePageView,
  isNumber,
  isServer,
  isStringInteger,
  isStringUSCurrency,
  padDollarAmount,
  pluralize,
  slugFromPath,
  textTruncate,
  toDashString,
}
