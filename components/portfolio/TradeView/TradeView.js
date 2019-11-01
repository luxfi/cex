/* eslint-disable react/prop-types */
import React, { useState } from "react"

import { ActivePositions, TopInvestmentPicks} from "../../app"
import PortfolioPagePortfolioMeta from '../PortfolioMeta/PortfolioMeta'
import WatchlistSection from '../WatchlistSection/WatchlistSection'

const TradeView = props => {
  const {
    tabIdx,
    index,
    investments,
    findMovieByTicker,
    store,
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
      />
      <ActivePositions investments={investments} findMovieByTicker={findMovieByTicker} />
      <TopInvestmentPicks store={store} />
      <WatchlistSection
        watchlist={watchlist}
        findMovie={findMovie}
        remove={removeFromWatchlist}
      />
      <br />
      <br />
    </div>
  )
}

export default TradeView
