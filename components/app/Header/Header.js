import React from "react"
import { inject, observer } from "mobx-react"

import {
  LayoutContext,
  Header
} from 'mui-layout'

import { useScrollTrigger } from "@material-ui/core"

import {
  ChevronLeft,
  //ChevronRight,
  MenuRounded
} from "@material-ui/icons"

import { withStyles } from "@material-ui/core/styles"

import MainNav from "./MainNav"

import { headerStyles, appBarStyles} from './header.style.js'

const MyHeader = inject("store")(observer((props) => {

    let { classes, store, openModal } = props
    let { userStore } = store
    let accountLoaded = userStore.loggedIn

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
            <MainNav 
              showElements={ctx.navVariant === "permanent"}
              classes={classes}
              openModal={openModal}
              accountLoaded={accountLoaded}
            />
          )}
        </LayoutContext.Consumer>
      </Header>
    )
  }
))

export default withStyles(headerStyles)(MyHeader)