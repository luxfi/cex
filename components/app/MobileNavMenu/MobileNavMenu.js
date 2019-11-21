import React from "react"
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

import { 
  SideDrawer, 
  CustomLink 
} from ".."

import { makeStyles } from "@material-ui/core/styles"
import styles from './mobileNavMenu.style.js'
const useStyles = makeStyles(styles)

import navStructure from "../../../util/navStructure"

export default (props) => {

  const {
    open,
    setOpen,
    handlePlaceholder,
  } = props

  return (
    <SideDrawer
      open={open}
      setOpen={setOpen}
      width="85vw"
      anchor="left"
    >
      <NavElements
        handlePlaceholder={handlePlaceholder}
        handleClose={() => setOpen(false)}
      />
    </SideDrawer>
  )
}

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
          <CustomLink href={elementDef.link} className={classes.listButtonLink}>
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
                    <CustomLink href={item.link} className={classes.listButtonLink}>
                      <ListItemText primary={item.title} />
                    </CustomLink>
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
