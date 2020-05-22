import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'

export default ({
  className,
  href,
  as,
  children,
  style,
}) => (
  <Link href={href} as={as}>
    <a
      className={classNames(className, 'wrapped-link')}
      style={style}
    >
      {children}
    </a>
  </Link>
)
