import React from 'react'
import Layout from './Layout'
import TickerStrip from './TickerStrip'

const TickerStripLayout = ({ movies, children }) => (
  <div>
    <TickerStrip movies={movies} />
    <Layout>{children}</Layout>
  </div >
)

export default TickerStripLayout;
