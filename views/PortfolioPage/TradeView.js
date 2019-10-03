/* eslint-disable react/prop-types */
import React, { useState } from "react"

import TrendingInvestments from './Sections/TrendingInvestments'
import TopPicks from './Sections/TopInvestmentPicks'

const TradeView = props => {
  const { tabIdx, index, investments, findMovieByTicker } = props

  // Hide the tab
  if (tabIdx !== index) return null

  return (
    <div>
      <TopPicks />
      <TrendingInvestments investments={investments} findMovieByTicker={findMovieByTicker} />
    </div>
  )
}

export default TradeView
