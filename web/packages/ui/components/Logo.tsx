import React from 'react'
import Link from 'next/link'

interface LogoProps {
  href?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'wordmark' | 'icon-only'
  className?: string
}

/** Official Lux inverted-triangle logomark */
const LuxTriangle: React.FC<{ className?: string; size?: number }> = ({
  className,
  size = 28,
}) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
  >
    <path d="M50 85 L15 25 L85 25 Z" fill="currentColor" />
  </svg>
)

/** Official LUX wordmark from @luxfi/logo design spec */
const LuxWordmark: React.FC<{ className?: string; height?: number }> = ({
  className,
  height = 17,
}) => (
  <svg
    viewBox="0 0 63 17"
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    className={className}
    fill="currentColor"
  >
    <g fillRule="nonzero">
      <polygon points="18 12.485 18 17 0 17 0 0 5.061 0 5.061 12.485" />
      <path d="M62.991,0 L56.069,0 L50.841,5.265 L45.64,0 L33.537,0 L33.537,8.355 C33.537,10.39 32.904,12.547 28.355,12.547 C23.805,12.547 23.173,10.418 23.173,8.355 L23.173,0 L18,0 L18,8.355 C18,14.199 21.107,17 28.364,17 C35.593,17 38.728,14.171 38.728,8.355 L38.728,0.327 C38.728,0.215 38.858,0.159 38.942,0.233 L47.25,8.374 L38.7,16.748 L45.649,16.748 L50.85,11.483 L56.078,16.748 L63,16.748 L54.478,8.374 L62.991,0 Z" />
    </g>
  </svg>
)

const sizeMap = {
  sm: { icon: 22, wordmark: 14 },
  md: { icon: 28, wordmark: 17 },
  lg: { icon: 36, wordmark: 22 },
}

const Logo: React.FC<LogoProps> = ({
  href = '/',
  size = 'md',
  variant = 'default',
  className = '',
}) => {
  const s = sizeMap[size]

  const logoContent = (
    <div className={`flex items-center gap-2 text-white ${className}`}>
      {variant !== 'wordmark' && <LuxTriangle size={s.icon} />}
      {variant !== 'icon-only' && <LuxWordmark height={s.wordmark} />}
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
export { LuxTriangle, LuxWordmark }
