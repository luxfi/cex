'use client'

import React from 'react'
import { cn } from '@hanzo/ui/util'

import type { SiteDef } from '../../site-def'
import DesktopHeader from './desktop'
import MobileHeader from './mobile'

const Header: React.FC<{
  siteDef: SiteDef
  className?: string
}> = ({ siteDef, className }) => {
  return (
    <>
      <DesktopHeader siteDef={siteDef} className={cn('hidden md:flex', className)} />
      <MobileHeader siteDef={siteDef} className={cn('flex md:hidden', className)} />
    </>
  )
}

export default Header
