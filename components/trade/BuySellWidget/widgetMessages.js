import { pluralize } from '../../../util/generic'

const errorNotEnoughFunds = ({ total, shares, funds, ticker }) => {
  return `
Not Enough Buying Power
You don’t have enough buying power to buy 1 share of ${ticker}.

Please deposit $${total} to purchase ${shares} ${pluralize(shares, 'share')} at market price (5% collar included).

Market orders on ESX are placed as limit orders up to 5% above the market price in order to protect customers from spending more than they have in their ESX account.`
}

const VALID_SHARES_ERROR = `Error
  Please enter a valid number of shares.`

const QUOTE_NOT_MARKET_WARNING = `The quote you see may not be the price at which your order is executed.`

export { errorNotEnoughFunds, VALID_SHARES_ERROR, QUOTE_NOT_MARKET_WARNING }