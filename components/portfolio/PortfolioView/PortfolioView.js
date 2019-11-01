/* eslint-disable react/prop-types */
import React, { useState } from "react"

import PortfolioPagePortfolioMeta from '../PortfolioMeta/PortfolioMeta'
import WatchlistSection from '../WatchlistSection/WatchlistSection'

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
    removeFromWatchlist,
    topChips,
  } = props

  // Hide the tab
  if (tabIdx !== index) return null

  return (
    <div>
      <PortfolioPagePortfolioMeta
        holdings={holdings}
        weeklyChange={weeklyChange}
        rank={rank}
        rankPercent={rankPercent}
        benefits={benefits}
        benefitsMonthly={benefitsMonthly}
        topCategories={topCategories}
        topChips={topChips}
      />
      <WatchlistSection
        watchlist={watchlist}
        findMovie={findMovie}
        remove={removeFromWatchlist}
      />
    </div>
  )
}

export default PortfolioView
