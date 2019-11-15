import React from "react"
import NextLink from "next/link"

import {
  ExpandLess,
  ExpandMore
} from "@material-ui/icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faAddressCard,
  faChartArea,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"

import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider
} from "@material-ui/core"

import SideDrawer from "../SideDrawer"

import { makeStyles } from "@material-ui/core/styles"
import styles from './mobileAccountMenu.style.js'
const useStyles = makeStyles(styles)


const menuElements = {
  loggedIn: [
    {
      title: "Account",
      link: "/account",
      icon: (className) => <FontAwesomeIcon icon={faAddressCard} size="1x" className={className} />
    },
    {
      title: "Portfolio",
      link: "/portfolio",
      icon: (className) => <FontAwesomeIcon icon={faChartArea} size="1x" className={className} />
    },
    {
      title: "Logout",
      handler: "handleLogout",
      icon: (className) => <FontAwesomeIcon icon={faSignOutAlt} size="1x" className={className} />
    },
  ],
  guest: [
    {
      title: "Login",
      link: "/login"
    },
    {
      title: "Sign Up",
      link: "/signup"
    }
  ]
}


export default (props) => {

  const {
    open,
    setOpen,
    isLoggedIn,
    handleLogout,
    handlePlaceholder,
  } = props

  return (
    <SideDrawer
      open={open}
      setOpen={setOpen}
      width="85vw"
      anchor="right"
    >
      <NavElements
        isLoggedIn={isLoggedIn}
        handlePlaceholder={handlePlaceholder}
        handleLogout={handleLogout}
        handleClose={() => setOpen(false)}
      />
    </SideDrawer>
  )
}

const NavElements = (props) => {

  const {
    isLoggedIn,
    handlePlaceholder,
    handleClose
  } = props

  const handlePlaceHolderAndClose = (text) => {
    handlePlaceholder(text)
    handleClose()
  }
  const callHandlerAndClose = (handlerName) => {
    props[handlerName]()
    handleClose()
  }

  const classes = useStyles()
  const base = (isLoggedIn) ? menuElements.loggedIn : menuElements.guest

  let result = []
  base.forEach((elementDef) => {

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
    else if ('handler' in elementDef) {
      result.push(
        <ListItem
          className={classes.listButton}
          onClick={() => {
            callHandlerAndClose(elementDef.handler)
          }}
          key={elementDef.handler}
          button
        >
          {elementDef.title}
        </ListItem>
      )
    }
    else if ('link' in elementDef) {
      result.push(
          <NextLink href={elementDef.link} >
          <ListItem className={classes.listButton} onClick={() => handleClose()} button key={elementDef.link}>
              {elementDef.title}
            </ListItem>
          </NextLink>
      )
    }
    else {
      result.push(
        <SubNav
          menuDefinition={elementDef}
          classes={classes}
          handlePlaceHolder={handlePlaceHolderAndClose}
          callHandler={callHandlerAndClose}
          handleClose={handleClose}
          key={elementDef.link}
        />
      )
    }
  })

  return (
    <List>
      {result}
    </List>
  )
}

const SubNav = (props) => {

  const {
    classes,
    menuDefinition,
    handlePlaceHolder,
    handleClose,
    callHandler
  } = props

  const [open, setOpen] = React.useState(false)

  const toggleOpen = () => {
    setOpen(!open);
  }

  const renderItem = (item) => {
    if ('link' in item) {
      return (
        <NextLink href={item.link} >
        <ListItem
          className={classes.listButtonSublist}
          button
          key={item.link}
          onClick={() => handleClose()} 
        >
            <ListItemText primary={item.title} />
        </ListItem>
        </NextLink>
      )
    }
    else if ('placeholder' in item) {
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
    }
    else if ('handler' in item) {
      <ListItem
        className={classes.listButtonSublist}
        onClick={() => {
          callHandler(item.handler)
        }}
        key={item.callHandler}
        button
      >
        <ListItemText primary={item.title} />
      </ListItem>
    }
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
          {menuDefinition.items.map((item) => { return renderItem(item) })}
        </List>
        <Divider light />
      </Collapse>
    </>
  )
}
