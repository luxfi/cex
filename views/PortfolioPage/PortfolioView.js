/* eslint-disable react/prop-types */
import React, { useState } from "react"

import Watchlist from './Sections/Watchlist'

const PortfolioView = (props) => {
  const { tabIdx, index } = props

  // Hide the tab
  if (tabIdx !== index) return null

  return (
    <div>
      This is the portfolio page!
      <Watchlist />
    </div>
  )
}

export default PortfolioView
