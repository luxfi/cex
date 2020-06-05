import Strings from './Strings'

const CORE = {
  appTitleShortLower: 'esx',
  appTitleShortCaps: 'ESX',
  appTitleFull: 'Entertainment Stock Exchange',
  appTitleLegal: 'Entertainment Stock Exchange LLC',
  copyright: 'Copyright © 2020',
  allRights: 'All Rights Reserved',
  contactUs: 'Contact Us',
  searchResults: 'Search Results',
  product: 'film',
  productCaps: 'Film',
  productPlural: 'films',
  productPluralCaps: 'Films',
}
const APP_NAME = CORE.appTitleShortCaps
const inst = new Strings(CORE)

export default (key, d) => (inst.get(key, d))

export { APP_NAME }
