'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@hanzo/ui/util'
import { motion, AnimatePresence } from 'framer-motion'

import type { SiteDef } from '../../site-def'
import Logo from '../Logo'

const MobileHeader: React.FC<{
  siteDef: SiteDef
  className?: string
}> = ({ siteDef, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { nav, companyName, brandColor } = siteDef

  return (
    <header className={cn('sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}>
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo companyName={companyName} brandColor={brandColor} size="sm" />
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b bg-background"
          >
            <nav className="container flex flex-col gap-4 px-4 py-6">
              {nav.common.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground/60 transition-colors hover:text-foreground"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default MobileHeader
