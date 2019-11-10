import React from "react"
import { inject, observer } from "mobx-react"

import NextLink from "next/link"

import {
  LayoutContext,
  Nav
} from 'mui-layout'

import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore
} from "@material-ui/icons"

import {
  Link,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
import styles from './mobileNav.style.js'

const useStyles = makeStyles(styles)


import navStructure from "./navStructure"


export default inject("store")(observer((props) => {

  const {
    handlePlaceholder,
    handleLogout,
    isLoggedIn,
  } = props

  const classes = useStyles()

  return (
      <LayoutContext.Consumer>
        {ctx => (
          <Nav 
            renderIcon={collapsed =>
              collapsed ? <ChevronRight /> : <ChevronLeft />
            }
          >
            <MobileNavItself
              navStructure={navStructure}
              classes={classes}
              handlePlaceholder={handlePlaceholder}
              handleClose={() => ctx.setOpened(false)}
            />
          </Nav>
        )}
      </LayoutContext.Consumer>
  )
}
))


const MobileNavItself = (props) => {

  const { 
    classes, 
    navStructure, 
    handlePlaceholder,
    handleClose 
  } = props

  const handlePlaceHolderAndClose = (text) => {
    handlePlaceholder(text)
    handleClose() 
  }


  let result = []
  navStructure.forEach((navElement) => {

    if ('placeholder' in navElement) {
      result.push(
        <ListItem
          className={classes.listButton}
          onClick={() => {
            handlePlaceHolderAndClose(navElement.placeholder)
          }}
          key={navElement.placeholder}
          button
        >
          {navElement.title}
        </ListItem>
      )
    }
    else if ('link' in navElement) {
      result.push(
          <ListItem
            className={classes.listButton}
            button
            key={navElement.link}
          >
            <NextLink href={navElement.link} >
              {navElement.title}
            </NextLink>
          </ListItem>
      )
    }
    else {
      result.push(
        <SubNav 
          menuDefinition={navElement}
          classes={classes}
          handlePlaceHolder={handlePlaceHolderAndClose}
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
    <Link href="/" component={CustomLink} className={classes.logoLink}>
      <img src="/static/images/esx/esx-white-logo.png" alt="ESX" className={classes.logoImg}/>
    </Link>
  )
}

const CustomLink = React.forwardRef(
  ({ className, href, hrefAs, children, }, ref) => (
    <NextLink ref={ref} href={href} as={hrefAs}>
      <a className={className}>{children}</a>
    </NextLink>
  )
)
