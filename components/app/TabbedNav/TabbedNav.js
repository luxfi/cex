import React from 'react'
import { Tab, Tabs } from '@material-ui/core'

import NextMuiLink from '../NextMuiLink'

// IMPORTANT - DO NOT USE TRAILING '/' ON HREF VALUE!!!
export default ({ tab, tabs, orientation }) => (
  <Tabs value={tab} aria-label="Navigation Tabs" orientation={orientation || 'horizontal'}>
    {tabs && tabs.map((t, i) => {
      const rest = (t.href) ? 
        {
          href: t.href,
          to: t.href,
          component: NextMuiLink
        } : {} 
      return (
        <Tab key={`tab_${i}`} label={t.label} value={t.id} id={t.id} {...rest} />
      )
    })}
  </Tabs>
)

