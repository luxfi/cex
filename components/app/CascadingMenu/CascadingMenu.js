import React from 'react'
import NextLink from 'next/link'
import classNames from 'classnames'

import {
    Button,
    makeStyles,
    MenuItem,
    Popover,
} from '@material-ui/core'

// This one is recommended in the MUI docs themselves :)
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

import styles from './cascadingMenu.style.js'
const myStyles = makeStyles(styles)

export default ({ structure, className, handleClose }) => {

  const s = myStyles()

  const elements = structure.map((n) => {
    let href = null
    if ('placeholder' in n) {
      href = { pathname: '/placeholder', query: { title: n.title } }
    }
    else if ('link' in n) {
      href = n.link
    }

    if (href) {
      return (
        <NextLink href={href} key={`link+${n.title}`}>
          <Button className={s.menuButton}>{n.title}</Button>
        </NextLink>
      )
    }
    return (
      <MenuDropdown
        classes={s}
        def={n}
        key={`dropdown+${n.title}`}
      />
    )
  })
  return (
    <div onClick={handleClose} className={classNames(s.menuOuter, className)}>
      {elements}
    </div>
  )
}

const MenuDropdown = ({ def, classes, key }) => (
  <PopupState variant='popover' popupId='menu-popover' key={key}>
    {(popupState) => (
      <>
      <Button
        {...bindTrigger(popupState)}
        className={classes.menuButton}
      >
        {def.title}
      </Button >
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        className={classes.menu}
      >
      {def.items.map(
        (item) => {
          const href = ('link' in item) ? item.link
            : {
              pathname: '/placeholder',
              query: { title: item.placeholder },
            }
          return (
            <NextLink href={href} key={item.title}>
              <MenuItem onClick={popupState.close}>
                <span className={classes.subMenuItemText}>
                  {item.title}
                </span>
              </MenuItem>
            </NextLink>
          )
        },
      )}
      </Popover>
      </>
    )}
  </PopupState>
)
