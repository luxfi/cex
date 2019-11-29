import React from "react"
import NextLink from "next/link"

import {
  Button,
  Popover,
  MenuItem,
} from "@material-ui/core"

  // This one is recommended in the MUI docs themselves :)
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

import { makeStyles } from "@material-ui/core/styles"
import styles from './desktopNav.style.js'

const useStyles = makeStyles(styles)

import navStructure from "../../../util/navStructure"

export default (props) => {

  const classes = useStyles()

  return (
    <>
      <NextLink href="/">
        <img src="/static/images/esx/esx-white-logo.png" alt="ESX" className={classes.logo} height="42px" />
      </NextLink>
      <div className={classes.navOuter}>
        <div className={classes.navSpacer} />
        <DesktopMainNav
          navStructure={navStructure}
          classes={classes}
        />
      </div>
    </>
  )
}

const MainNavDropdown = (props) => {

  const {
    menuDefinition,
    classes
  } = props

  return (
    <PopupState variant="popover" popupId="menu-popover">
      {(popupState) => (
        <>
        <Button
          {...bindTrigger(popupState)}
          className={classes.navButton}
        >
          {menuDefinition.title}
        </Button >
        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          className={classes.menu}
        >
          {menuDefinition.items.map(
            (item, i) => {
              const href = ('link' in item) ?
                item.link
                :
                ({
                  pathname: "/placeholder",
                  query: { title: item.placeholder }
                })
                return (
                  <NextLink href={href} key={i} >
                    <MenuItem onClick={popupState.close}><span className={classes.subMenuItemText}>{item.title}</span></MenuItem>
                  </NextLink>
                )
            }
          )}
        </Popover>
        </>
      )}
    </PopupState>
  )
}

const DesktopMainNav = (props) => {

  const {
    navStructure,
    classes
  } = props

  let result = []
  navStructure.forEach((navElement, i) => {

    let href = null
    if ('placeholder' in navElement) {
      href = { pathname: "/placeholder", query: { title: navElement.title } }
    }
    else if ('link' in navElement) {
      href = navElement.link
    }

    if (href) {
      result.push(
        <NextLink href={href} key={`link+${i}`}>
          <Button
            className={classes.navButton}
          >
            {navElement.title}
          </Button>
        </NextLink>
      )
    }
    else {
      result.push(
        <MainNavDropdown
          classes={classes}
          menuDefinition={navElement}
          key={`dropdown+${i}`}
        />
      )
    }
  })
  return (
    <>
      {result}
    </>
  )
}
