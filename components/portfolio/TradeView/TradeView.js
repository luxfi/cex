/* eslint-disable react/prop-types */
import React, { useState } from "react"

import { ActivePositions, TopInvestmentPicks} from "../../app"

const TradeView = props => {
  const { tabIdx, index, investments, findMovieByTicker, store } = props

  // Hide the tab
  if (tabIdx !== index) return null

  return (
    <div>
      <TopInvestmentPicks store={store} />
      <ActivePositions investments={investments} findMovieByTicker={findMovieByTicker} />
    </div>
  )
}

export default TradeView
