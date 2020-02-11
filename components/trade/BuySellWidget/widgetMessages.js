import { pluralize } from '../../../util'

const errorNotEnoughFunds = (total, shares, ticker) => {
  const title = 'Not Enough Buying Power'
  const p1 = `You don’t have enough buying power to buy ${shares} ${pluralize(
    shares,
    'share',
  )} of ${ticker}`
  const p2 = `Please deposit $${total} to purchase ${shares} ${pluralize(
    shares,
    'share',
  )} at market price.`
  const body = [p1, p2]
  return { title, body }
}

const errorNotEnoughShares = (shares, ticker) => {
  const title = 'Error'
  const p1 = `Your sell quantity exceeds your available shares. Please check your portfolio and/or open orders.`
  const p2 = `You currently own ${shares} ${pluralize(
    shares,
    'share',
  )} of ${ticker}`
  const body = [p1, p2]
  return { title, body }
}

const validNumberOfShares = (total, shares, ticker) => {
  const title = 'Error'
  const p1 = `Please enter a valid number of shares.`
  const body = [p1]
  return { title, body }
}

const QUOTE_NOT_MARKET_WARNING = `The quote you see may not be the price at which your order is executed.`

export {
  errorNotEnoughFunds,
  validNumberOfShares,
  errorNotEnoughShares,
  QUOTE_NOT_MARKET_WARNING,
}
