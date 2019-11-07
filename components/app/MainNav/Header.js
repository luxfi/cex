import React from "react"
import { inject, observer } from "mobx-react"

import { useScrollTrigger } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"

import {
  ChevronLeft,
  MenuRounded
} from "@material-ui/icons"

import {
  LayoutContext,
  Header
} from 'mui-layout'

import DesktopNav from "./DesktopNav"
import navStructure from "./navStructure"

import { headerStyles } from './header.style.js'

const EsxHeader = inject("store")(observer((props) => {

  let { 
    classes, 
    handlePlaceHolder, 
    handleLogout,
    isLoggedIn
  } = props

  const trigger = useScrollTrigger({ threshold: 0, disableHysteresis: true, })

  return (
    <Header 
      renderMenuIcon={open => (open ? <ChevronLeft /> : <MenuRounded />)} 
      className={
        `${classes.appBar} ${!trigger ? classes.transparent : classes.translucent}`
      }
    >
      <LayoutContext.Consumer>
        {ctx => (
          <DesktopNav 
            show={(ctx.navVariant === "permanent")}
            navStructure={navStructure}
            classes={classes}
            handlePlaceHolder={handlePlaceHolder}
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
        )}
      </LayoutContext.Consumer>
    </Header>
  )
}))

export default withStyles(headerStyles)(EsxHeader)