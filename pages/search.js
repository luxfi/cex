import React from 'react'

import { useStockStore } from '../stores/hooks'
import { SearchView } from '../components/search'

export default ({ closeSearch }) => {
  const stockStore = useStockStore()
  return (<SearchView stockStore={stockStore} closeSearch={closeSearch}/>)
}