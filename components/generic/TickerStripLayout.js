import React from 'react'
import Layout from './Layout'
import TickerStrip from './TickerStrip'

const TickerStripLayout = ({ movies, children, darkNav }) => (
  <div>
    <TickerStrip movies={movies} />
    <Layout darkNav={darkNav}>{children}</Layout>
  </div >
)

export default TickerStripLayout;
