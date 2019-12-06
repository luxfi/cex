import ReactGA from 'react-ga'

const padDollarAmount = amount => {
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

const googlePageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const formatCurrency = (num, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    num,
  )
}

const isStringInteger = stringInput => {
  // match a digit one or more times
  const rx = new RegExp(/^\d+(?:\.\d{1,2})?$/)
  return rx.test(stringInput)
}

const isStringUSCurrency = stringInput => {
  // match a digit one or more times
  const rx = new RegExp(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/)
  return rx.test(stringInput)
}

const isNumber = val => typeof val === 'number' && val === val

// pluralize(0, 'apple'); // 'apples'
// pluralize(1, 'apple'); // 'apple'
// pluralize(2, 'apple'); // 'apples'
const pluralize = (val, word, plural = word + 's') => {
  const _pluralize = (num, word, plural = word + 's') =>
    [1, -1].includes(Number(num)) ? word : plural
  if (typeof val === 'object')
    return (num, word) => _pluralize(num, word, val[word])
  return _pluralize(val, word, plural)
}

const textTruncate = (str, length, ending) => {
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
  } else {
    return str
  }
}

export {
  padDollarAmount,
  googlePageView,
  formatCurrency,
  isStringInteger,
  isStringUSCurrency,
  isNumber,
  pluralize,
  textTruncate,
}
