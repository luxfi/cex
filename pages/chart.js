import React from 'react'
import dynamic from 'next/dynamic'

const TVChartContainer = dynamic(
	() =>
		import('../components/app/TVChartContainer').then(mod => {
      console.log('Have mod', mod, mod.TVChartContainer)
      return mod.TVChartContainer
    }),
	{ ssr: false, loading: () => <div style={{ color: 'red' }}>This is loading</div> },
)

export default () => <TVChartContainer />
