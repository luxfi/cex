import React from "react"
import { inject, observer } from "mobx-react"

import { useScrollTrigger } from "@material-ui/core"

import { MenuRounded } from "@material-ui/icons"

import {
  LayoutContext,
  Header
} from 'mui-layout'

import DesktopNav from "./DesktopNav"
import DesktopProfileAndSearch from "./DesktopProfileAndSearch"
import MobileProfileAndSearch from "./MobileProfileAndSearch"

import navStructure from "./navStructure"

import { makeStyles } from "@material-ui/core/styles"
import styles from './header.style.js'

const useStyles = makeStyles(styles)


const isDesktopView = (screen) => {
  return !["xs", "sm"].includes(screen)
}

export default inject("store")(observer((props) => {

  const { 
    handlePlaceholder, 
    handleLogout,
    isLoggedIn
  } = props

  const trigger = useScrollTrigger({ threshold: 0, disableHysteresis: true, })

  const classes = useStyles()

  return (
    <LayoutContext.Consumer>
      {(ctx) => {
        const desktopView = isDesktopView(ctx.screen)
        
        return (
          <Header
            renderMenuIcon={open => (!desktopView && <MenuRounded />)}
            className={`${classes.appBar} ${(!desktopView || trigger) ? classes.translucent : classes.transparent }`}
            toolbarProps={{disableGutters: true}}
          >
            {(desktopView) ? (
                <>
                <DesktopNav navStructure={navStructure} handlePlaceholder={handlePlaceholder} />
                <DesktopProfileAndSearch isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
                </>
              ) : (
                <MobileProfileAndSearch isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
              )
            }
          </Header>
        )
      }}
    </LayoutContext.Consumer>
  )}
))
