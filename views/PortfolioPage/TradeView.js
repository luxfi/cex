/* eslint-disable react/prop-types */
import React, { useState } from "react"

const TradeView = (props) => {
  const { tabIdx, index } = props

  // Hide the tab
  if (tabIdx !== index) return null

  return (
    <div>
      This is the trade page!
    </div>
  )
}

export default TradeView
