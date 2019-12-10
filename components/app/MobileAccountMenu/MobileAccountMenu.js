import React, { useState } from 'react'
import NextLink from 'next/link'

import {
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faAddressCard,
  faChartArea,
  faIdCard,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import SideDrawer from '../SideDrawer'
import styles from './mobileAccountMenu.style'

const useStyles = makeStyles(styles)

const menuElements = {
  loggedIn: [
    {
      title: 'My Account',
      link: '/account',
      icon: (className) => <FontAwesomeIcon icon={faAddressCard} size='1x' className={className} />,
    },
    {
      title: 'Investor Profile',
      link: '/account/kyc',
      icon: (className) => <FontAwesomeIcon icon={faIdCard} size='1x' className={className} />,
    },
    {
      title: 'Portfolio',
      link: '/portfolio',
      icon: (className) => <FontAwesomeIcon icon={faChartArea} size='1x' className={className} />,
    },
    {
      title: 'Logout',
      handler: 'handleLogout',
      icon: (className) => <FontAwesomeIcon icon={faSignOutAlt} size='1x' className={className} />,
    },
  ],
  guest: [
    {
      title: 'Login',
      link: '/login',
    },
    {
      title: 'Sign Up',
      link: '/signup',
    },
  ],
}


export default ({
  open,
  setOpen,
  isLoggedIn,
  handleLogout,
}) => (
  <SideDrawer
    open={open}
    setOpen={setOpen}
    width='85vw'
    anchor='right'
  >
    <NavElements
      isLoggedIn={isLoggedIn}
      handleLogout={handleLogout}
      handleClose={() => setOpen(false)}
    />
  </SideDrawer>
)

const NavElements = (props) => {
  const {
    isLoggedIn,
    handleClose,
  } = props

  const callHandlerAndClose = (handlerName) => {
    props[handlerName]()
    handleClose()
  }

  const classes = useStyles()
  const base = (isLoggedIn) ? menuElements.loggedIn : menuElements.guest

  return (
    <List>
      {base.map((elementDef) => {
        if ('handler' in elementDef) {
          return (
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

        let href = null
        if ('placeholder' in elementDef) {
          href = { pathname: '/placeholder', query: { title: elementDef.title } }
        } else if ('link' in elementDef) {
          href = elementDef.link
        }

        if (href) {
          return (
            <NextLink
              href={href}
              key={elementDef.title}
            >
              <ListItem
                className={classes.listButton}
                onClick={() => handleClose()}
                button
                key={elementDef.link}
              >
                {elementDef.title}
              </ListItem>
            </NextLink>
          )
        }

        return (
          <SubNav
            menuDefinition={elementDef}
            classes={classes}
            callHandler={callHandlerAndClose}
            handleClose={handleClose}
            key={elementDef.link}
          />
        )
      })}
    </List>
  )
}

const SubNav = (props) => {
  const {
    classes,
    menuDefinition,
    handleClose,
    callHandler,
  } = props

  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  const renderItem = (item) => {
    if ('handler' in item) {
      return (
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
      )
    }
    let href = null
    if ('link' in item) {
      href = item.link
    } else if ('placeholder' in item) {
      href = { pathname: '/placeholder', query: { title: item.title } }
    }
    return (
      <NextLink href={href} >
        <ListItem
          className={classes.listButtonSublist}
          button
          onClick={() => handleClose()}
        >
          <ListItemText primary={item.title} />
        </ListItem>
      </NextLink>
    )
  }

  return (
    <>
      <ListItem button onClick={toggleOpen} className={classes.listButton}>
        <ListItemText primary={menuDefinition.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <Divider light />
        <List component='div' disablePadding>
          {menuDefinition.items.map((item) => renderItem(item))}
        </List>
        <Divider light />
      </Collapse>
    </>
  )
}
