/* eslint-disable react/prop-types */
import React, { useState } from "react"

import TrendingInvestments from "./TrendingInvestments"
import TopPicks from "./TopInvestmentPicks"

const TradeView = props => {
  const { tabIdx, index, investments, findMovieByTicker, store } = props

  // Hide the tab
  if (tabIdx !== index) return null

  return (
    <div>
      <TopPicks store={store} />
      <TrendingInvestments investments={investments} findMovieByTicker={findMovieByTicker} />
    </div>
  )
}

export default TradeView
