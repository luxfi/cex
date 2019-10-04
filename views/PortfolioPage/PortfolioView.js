/* eslint-disable react/prop-types */
import React, { useState } from "react"

import PortfolioMeta from './Sections/PortfolioMeta'
import Watchlist from './Sections/Watchlist'

const PortfolioView = (props) => {
  const { 
    tabIdx, 
    index,
    findMovie,
    holdings,
    weeklyChange,
    rank,
    rankPercent,
    benefits,
    benefitsMonthly,
    topCategories,
    watchlist,
    removeFromWatchlist
  } = props

  // Hide the tab
  if (tabIdx !== index) return null

  return (
    <div>
      <PortfolioMeta
        holdings={holdings}
        weeklyChange={weeklyChange}
        rank={rank}
        rankPercent={rankPercent}
        benefits={benefits}
        benefitsMonthly={benefitsMonthly}
        topCategories={topCategories}
      />
      <Watchlist
        watchlist={watchlist}
        findMovie={findMovie}
        remove={removeFromWatchlist}
      />
    </div>
  )
}

export default PortfolioView
