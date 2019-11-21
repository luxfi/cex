import React from "react"
import Link from "next/link"

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

  const { handlePlaceholder } = props
  const classes = useStyles()

  return (
    <>
      <Link href="/">
        <img src="/static/images/esx/esx-white-logo.png" alt="ESX" className={classes.logo} height="64px" />
      </Link>
      <div className={classes.navOuter}>
        <div className={classes.navSpacer} />
        <DesktopMainNav
          navStructure={navStructure}
          handlePlaceholder={handlePlaceholder}
          classes={classes}
        />
      </div>
    </>
  )
}

const MainNavDropdown = (props) => {

  const {
    menuDefinition,
    handlePlaceholder,
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
              return ('link' in item)
                ? (
                  <Link href={item.link} key={i} >
                    <MenuItem onClick={popupState.close}><span className={classes.subMenuItemText}>{item.title}</span></MenuItem>
                  </Link>
                ) : (
                  <MenuItem key={i} onClick={() => {
                    handlePlaceholder(item.placeholder)
                    popupState.close()
                  }}>
                    <span className={classes.subMenuItemText}>{item.title}</span>
                  </MenuItem>
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
    handlePlaceholder,
    classes
  } = props

  let result = []
  navStructure.forEach((navElement, i) => {

    if ('placeholder' in navElement) {
      result.push(
        <Button 
          className={classes.navButton}
          onClick={() => {
            handlePlaceholder(navElement.placeholder)
          }}
          key={`button+${i}`}
        >
          {navElement.title}
        </Button>
      ) 
    }
    else if ('link' in navElement) {
      result.push(
        <Link href={navElement.link} key={`link+${i}`}>
          <Button
            className={classes.navButton}
          >
            {navElement.title}
          </Button>
        </Link>
      ) 
    }
    else /* menu */ {
      result.push(
        <MainNavDropdown 
          classes={classes} 
          menuDefinition={navElement} 
          handlePlaceholder={handlePlaceholder}
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
