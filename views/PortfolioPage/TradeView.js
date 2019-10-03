/* eslint-disable react/prop-types */
import React, { useState } from "react"

import TrendingInvestments from "./Sections/TrendingInvestments"
import TopPicks from "./Sections/TopInvestmentPicks"

const TradeView = props => {
  const { tabIdx, index, store } = props

  // Hide the tab
  if (tabIdx !== index) return null

  return (
    <div>
      <TopPicks store={store} />
      <TrendingInvestments store={store} />
    </div>
  )
}

export default TradeView
