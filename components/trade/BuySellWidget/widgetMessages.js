import { pluralize } from '../../../util/generic'

const errorNotEnoughFunds = (total, shares, ticker) => {
  const title = 'Not Enough Buying Power'
  const p1 = `You don’t have enough buying power to buy ${shares} ${pluralize(
    shares,
    'share',
  )} of ${ticker}`
  const p2 = `Please deposit $${total} to purchase ${shares} ${pluralize(
    shares,
    'share',
  )} at market price (5% collar included).`
  const p3 =
    'Market orders on ESX are placed as limit orders up to 5% above the market price in order to protect customers from spending more than they have in their ESX account.'
  const body = [p1, p2, p3]
  return { title, body }
}

const VALID_SHARES_ERROR = `Error
  Please enter a valid number of shares.`

const QUOTE_NOT_MARKET_WARNING = `The quote you see may not be the price at which your order is executed.`

export { errorNotEnoughFunds, VALID_SHARES_ERROR, QUOTE_NOT_MARKET_WARNING }
