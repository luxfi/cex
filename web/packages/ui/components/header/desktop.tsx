'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@hanzo/ui/util'

import type { SiteDef } from '../../site-def'
import Logo from '../Logo'

const DesktopHeader: React.FC<{
  siteDef: SiteDef
  className?: string
}> = ({ siteDef, className }) => {
  const { nav, companyName, brandColor } = siteDef

  return (
    <header className={cn('sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}>
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo companyName={companyName} brandColor={brandColor} />
        
        <nav className="flex items-center gap-6">
          {nav.common.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Add user menu, theme toggle, etc. here */}
        </div>
      </div>
    </header>
  )
}

export default DesktopHeader
