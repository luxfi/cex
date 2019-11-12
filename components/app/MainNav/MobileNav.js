import React from "react"
import { inject, observer } from "mobx-react"

import NextLink from "next/link"

import {
  ExpandLess,
  ExpandMore
} from "@material-ui/icons"

import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider
} from "@material-ui/core"

import SideDrawer from "../SideDrawer"

import { makeStyles } from "@material-ui/core/styles"
import styles from './mobileNav.style.js'
const useStyles = makeStyles(styles)

import navStructure from "./navStructure"

export default inject("store")(observer((props) => {

  const {
    handlePlaceholder,
  } = props

  return (
    <SideDrawer
      open={props.store.uiStore.drawers.left}
      setOpen={props.store.uiStore.setLeftDrawerOpen}
      width="85vw"
      anchor="left"
    >
      <NavElements
        handlePlaceholder={handlePlaceholder}
        handleClose={() => props.store.uiStore.setLeftDrawerOpen(false)}
      />
    </SideDrawer>
  )
}))

const NavElements = (props) => {

  const { 
    handlePlaceholder,
    handleClose 
  } = props

  const handlePlaceHolderAndClose = (text) => {
    handlePlaceholder(text)
    handleClose() 
  }

  const classes = useStyles()

  let result = []
  navStructure.forEach((elementDef) => {

    if ('placeholder' in elementDef) {
      result.push(
        <ListItem
          className={classes.listButton}
          onClick={() => {
            handlePlaceHolderAndClose(elementDef.placeholder)
          }}
          key={elementDef.placeholder}
          button
        >
          {elementDef.title}
        </ListItem>
      )
    }
    else if ('link' in elementDef) {
      result.push(
        <ListItem className={classes.listButton} button key={elementDef.link}>
          <NextLink href={elementDef.link} >
            {elementDef.title}
          </NextLink>
        </ListItem>
      )
    }
    else {
      result.push(
        <SubNav 
          menuDefinition={elementDef}
          classes={classes}
          handlePlaceHolder={handlePlaceHolderAndClose}
          key={elementDef.link}
        />
      )
    }
  })


  return (
    <>
      <Logo classes={classes}/>
      <List>
        {result}
      </List>
    </>
  )
}

const SubNav = (props) => {

  const {
    classes,
    menuDefinition,
    handlePlaceHolder
  } = props

  const [open, setOpen] = React.useState(false)

  const toggleOpen = () => {
    setOpen(!open);
  }

  return (
    <>
      <ListItem button onClick={toggleOpen} className={classes.listButton}>
        <ListItemText primary={menuDefinition.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider light />
        <List component="div" disablePadding>
          {menuDefinition.items.map(
            (item) => {
              return ('link' in item)
                ? (
                  <ListItem
                    className={classes.listButtonSublist}
                    button
                    key={item.link}
                  >
                    <NextLink href={item.link} >
                      <ListItemText primary={item.title} />
                    </NextLink>
                  </ListItem>

                ) : (
                  <ListItem
                    className={classes.listButtonSublist}
                    onClick={() => {
                      handlePlaceHolder(item.placeholder)
                    }}
                    key={item.placeholder}
                    button
                  >
                    <ListItemText primary={item.title} />
                  </ListItem>
                )
            }
          )}
        </List>
        <Divider light />
      </Collapse>
    </>
  )
}

const Logo = (props) => {
  const {classes} = props
  return (
    <NextLink href="/" className={classes.logoLink}>
      <img src="/static/images/esx/esx-white-logo.png" alt="ESX" className={classes.logoImg}/>
    </NextLink>
  )
}
