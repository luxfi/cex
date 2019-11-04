import React from "react"
import { inject, observer } from "mobx-react"

import {
  LayoutContext,
  Nav
} from 'mui-layout'

import {
  ChevronLeft,
  ChevronRight,
} from "@material-ui/icons"

import { withStyles } from "@material-ui/core/styles"

import MainNav from "./MainNav"

import { mobileNavStyles } from './header.style.js'

const MobileNav = inject("store")(observer((props) => {

  let { classes, store, openModal } = props
  let { userStore } = store
  let accountLoaded = userStore.loggedIn

  return (
    <Nav
      renderIcon={collapsed =>
        collapsed ? <ChevronRight /> : <ChevronLeft />
      }
    >
      <LayoutContext.Consumer>
        {ctx => (
          <MainNav
            showElements={ctx.navVariant !== "permanent"}
            classes={classes}
            openModal={openModal}
            accountLoaded={accountLoaded}
          />
        )}
      </LayoutContext.Consumer>
    </Nav>
  )
}
))

export default withStyles(mobileNavStyles)(MobileNav)