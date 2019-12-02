import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'

export default function withSize(minHeight = 300) {
  return (OriginalComponent) => (
    (props) => (
      <AutoSizer style={{ minHeight }}>
        {({ height, width }) => (
          <OriginalComponent
            {...props}
            height={height}
            width={width} />
        )}
      </AutoSizer>
    )
  )
}
