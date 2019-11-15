import React from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  useScrollTrigger
} from "@material-ui/core";

import { MenuRounded } from "@material-ui/icons";

import DesktopNav from "./DesktopNav";
import DesktopProfileAndSearch from "./DesktopProfileAndSearch";

import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import styles from "./header.style.js";

const useStyles = makeStyles(styles);

export default props => {
  const {
    showDesktopNav,
    showDesktopProfileMenu,
    openLeftDrawer,
    openRightDrawer,
    handlePlaceholder,
    handleLogout,
    isLoggedIn
  } = props;

  const trigger = useScrollTrigger({ threshold: 0, disableHysteresis: true });
  const classes = useStyles();

  return (
    <AppBar
      className={classNames(
        classes.appBar,
        !showDesktopNav || trigger ? classes.translucent : classes.transparent,
        showDesktopProfileMenu ? classes.mobile : ""
      )}
    >
      <Toolbar disableGutters className={classes.toolbar}>
        {showDesktopNav ? (
          <DesktopNav handlePlaceholder={handlePlaceholder} />
        ) : (
          <IconButton onClick={openLeftDrawer}>
            <MenuRounded className={classes.mobileHamburgerIcon} />
          </IconButton>
        )}
        {showDesktopProfileMenu ? (
          <DesktopProfileAndSearch
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
          />
        ) : (
          <>
            <img
              src="/static/images/esx/esx-white-logo.png"
              alt="ESX"
              className={classes.mobileLogo}
              height="26px"
            />
            <AccountMenu
              openAccountMenu={openRightDrawer}
              classes={classes}
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const AccountMenu = (props) => {

  const { openAccountMenu, classes } = props

  return (
    <div className={classes.accountOuter}>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        onClick={openAccountMenu}
      >
        <AccountCircle style={{ fontSize: "2rem" }} />
      </IconButton>
    </div>
  )
}
