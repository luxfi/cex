/* eslint-disable react/prop-types */
import React, { useState } from "react"

import PortfolioMeta from './Sections/PortfolioMeta'
import Watchlist from './Sections/Watchlist'

const PortfolioView = (props) => {
  const { tabIdx, index } = props

  // Hide the tab
  if (tabIdx !== index) return null

  return (
    <div>
      <PortfolioMeta />
      <Watchlist />
    </div>
  )
}

export default PortfolioView
