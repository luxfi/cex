import React from 'react'
import { Tab, Tabs } from '@material-ui/core'

import NextMuiLink from '../NextMuiLink'

// IMPORTANT - DO NOT USE TRAILING '/' ON HREF VALUE!!!
export default ({ tab, tabs, orientation }) => (
  <Tabs value={tab} aria-label="Navigation Tabs" orientation={orientation || 'horizontal'}>
    {
      tabs && tabs.map((t, i) => (
          <Tab key={`tab_${i}`} label={t.label} value={t.id} id={t.id} component={NextMuiLink} to={t.href} href={t.href} />
        )
      )
    }
  </Tabs>
)

