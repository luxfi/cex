import React from 'react'
import Link from 'next/link'
import { cn } from '@hanzo/ui/util'

interface LogoProps {
  href?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'text-only' | 'icon-only'
  className?: string
  brandColor?: string
  companyName?: string
}

const Logo: React.FC<LogoProps> = ({
  href = '/',
  size = 'md',
  variant = 'default',
  className = '',
  brandColor = '#e4e4e7',
  companyName = 'Lux Exchange'
}) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  }

  const logoContent = (
    <div className={cn('flex items-center gap-2', className)}>
      {variant !== 'text-only' && (
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center font-bold"
          style={{
            backgroundColor: brandColor,
            color: '#0A0A0A'
          }}
        >
          LX
        </div>
      )}
      {variant !== 'icon-only' && (
        <span className={cn('font-bold', sizes[size])} style={{ color: brandColor }}>
          {companyName}
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="no-underline">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}

export default Logo
