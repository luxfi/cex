import React from 'react'

import {
  Tab,
  Tabs,
} from '@material-ui/core'

import { CustomLink } from '../../app'

const tabs = [
  {
    id: '',
    label: 'Account',
    href: '/account'
  },
  {
    id: 'documents',
    label: 'Documents',
    href: '/account/documents'
  },
  {
    id: 'kyc',
    label: 'KYC',
    href: '/account/kyc'
  },
]

// IMPORTANT - DO NOT USE TRAILING '/' ON HREF VALUE!!!

export default props => {
  const { 
    tab,
  } = props

  return (
    <Tabs value={tab} aria-label="Account Navigation Tabs">
      {
        tabs.map((t, i) => (
            <Tab key={`tab_${i}`} label={t.label} value={t.id} id={t.id} component={CustomLink} to={t.href} href={t.href} />
          )
        )
      }
    </Tabs>
  )
}
