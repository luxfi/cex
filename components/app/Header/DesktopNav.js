import React from 'react'
import NextLink from 'next/link'

import { makeStyles } from '@material-ui/core'

import HeaderLogo from './HeaderLogo'
import CascadingMenu from '../CascadingMenu'

import styles from './desktopNav.style.js'
import structure from '../../../settings/navStructure'

const useStyles = makeStyles(styles)
export default () => {
  const classes = useStyles()

  return (
    <>
    <NextLink href='/'>
      <HeaderLogo className={classes.logo} />
    </NextLink>
    <CascadingMenu structure={structure} />
    </>
  )
}
