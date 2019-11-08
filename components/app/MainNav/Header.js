import React from "react"
import { inject, observer } from "mobx-react"

import { useScrollTrigger } from "@material-ui/core"

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
            handlePlaceholder={handlePlaceholder}
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
        )}
      </LayoutContext.Consumer>
    </Header>
  )
}))
