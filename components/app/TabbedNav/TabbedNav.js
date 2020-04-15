import React from 'react'

import {
  Tab,
  Tabs,
} from '@material-ui/core'

import { CustomLink } from '..'

// IMPORTANT - DO NOT USE TRAILING '/' ON HREF VALUE!!!

export default props => {
  const {
    tab,
    tabs,
    orientation,
  } = props

  const tabOrientation = orientation || 'horizontal'

  return (
    <Tabs value={tab} aria-label="Navigation Tabs" orientation={tabOrientation}>
      {
        tabs && tabs.map((t, i) => (
            <Tab key={`tab_${i}`} label={t.label} value={t.id} id={t.id} component={CustomLink} to={t.href} href={t.href} />
          )
        )
      }
    </Tabs>
  )
}
