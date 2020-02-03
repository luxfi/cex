import React from 'react'
import NextLink from 'next/link'

import { ExpandLess, ExpandMore } from "@material-ui/icons"

import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
  makeStyles
} from "@material-ui/core"

import { SideDrawer, CustomLink } from ".."

import styles from './mobileNavMenu.style.js'
const useStyles = makeStyles(styles)

import navStructure from "../../../settings/navStructure"

export default (props) => {

  const {
    open,
    setOpen,
  } = props

  return (
    <SideDrawer
      open={open}
      setOpen={setOpen}
      width="85vw"
      anchor="left"
    >
      <NavElements
        handleClose={() => setOpen(false)}
      />
    </SideDrawer>
  )
}

const NavElements = (props) => {

  const {
    handleClose
  } = props

  const classes = useStyles()

  let result = []
  navStructure.forEach((elementDef, i) => {

    let href = null
    if ('placeholder' in elementDef) {
      href = { pathname: "/placeholder", query: { title: elementDef.title } }
    }
    else if ('link' in elementDef) {
      href = elementDef.link 
    }
    if (href) {
      result.push(
        <ListItem className={classes.listButton} button key={i} onClick={() => handleClose()}>
          <CustomLink href={href} className={classes.listButtonLink}>
            {elementDef.title}
          </CustomLink>
        </ListItem>
      )
    }
    else {
      result.push(
        <SubNav
          menuDefinition={elementDef}
          classes={classes}
          handleClose={handleClose}
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
    handleClose
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
            (item, i) => {
              const href = 
                ('link' in item) 
                ? 
                item.link 
                :
                ({ pathname: "/placeholder", query: { title: elementDef.title } }) 

              return (
                <ListItem
                  className={classes.listButtonSublist}
                  button
                  key={i}
                  onClick={() => handleClose()}
                >
                <CustomLink href={href} className={classes.listButtonLink}>
                    <ListItemText primary={item.title} />
                  </CustomLink>
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
    <div className={classes.logoLink}>
      <NextLink href="/">
        <img src="/static/images/esx/esx-white-logo.png" alt="ESX" className={classes.logoImg}/>
      </NextLink>
    </div>
  )
}
