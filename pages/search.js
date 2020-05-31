import React from 'react'

import { useStockStore } from '../stores/hooks'
import { SearchView } from '../components/search'

export default (props) => {
  const stockStore = useStockStore()
  //console.log(JSON.stringify(stockStore, null, 2))
  //return <h1> TEST</h1>
  return (<SearchView stockStore={stockStore} />)
}