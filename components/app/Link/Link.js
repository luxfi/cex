import Link from 'next/link'
import React from 'react'

export default ({
  className,
  href,
  as,
  children,
  style,
}) => (
  <Link href={href} as={as}>
    <a
      className={className}
      style={style}
    >
      {children}
    </a>
  </Link>
)
