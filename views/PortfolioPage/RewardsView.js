/* eslint-disable react/prop-types */
import React, { useState } from "react"


const RewardsView = (props) => {
  
  const { tabIdx, index } = props

  // Hide the tab
  if (tabIdx !== index) return null

  return (
    <h1>Rewards View</h1>
  )
}

export default RewardsView
