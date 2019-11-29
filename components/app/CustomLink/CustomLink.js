import React from "react"
import NextLink from "next/link"

// import Button from "@material-ui/core/Button"
// <Button component={CustomLink} href={'/foo'}>bar</Button>

const CustomLink = React.forwardRef(
  ({ className, href, hrefAs, children, download, target }, ref) => (
    <NextLink ref={ref} href={href} as={hrefAs}>
      {
        download ?
        <a className={className} download target={target}>{children}</a>
        : <a className={className} target={target}>{children}</a>
      }
    </NextLink>
  )
)

export default CustomLink

// https://material-ui.com/demos/buttons/#third-party-routing-library

// https://gist.github.com/herr-vogel/0b5d4f3c28f08dc6cc4a2fd4f7b4a4df
// Created in order to use Material-UI Button or Material-UI Link with Next.js Link
