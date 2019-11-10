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
        const desktopNav = !["xs", "sm"].includes(ctx.screen)
        const mobileProfile = ["xs"].includes(ctx.screen)
        
        return (
          <Header
            renderMenuIcon={open => (!desktopNav && <MenuRounded />)}
            className={`${classes.appBar} ${(!desktopNav || trigger) ? classes.translucent : classes.transparent} ${(mobileProfile) ? classes.mobile : ''}`}
            toolbarProps={{
              disableGutters: true,
              style: {
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "space-between"
              }
            }}
          >
            {desktopNav &&  
              <DesktopNav navStructure={navStructure} handlePlaceholder={handlePlaceholder} />
            }
            {(mobileProfile) ? (
              <>
                <img src="/static/images/esx/esx-white-logo.png" alt="ESX" className={classes.mobileLogo} height="26px" />
                <MobileProfileAndSearch isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
              </>
            ) : (
              <DesktopProfileAndSearch isLoggedIn = { isLoggedIn } handleLogout = { handleLogout } />
            )
            }
          </Header>
        )
      }}
    </LayoutContext.Consumer>
  )}
))
