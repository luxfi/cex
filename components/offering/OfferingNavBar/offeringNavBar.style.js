import { makeStyles } from '@material-ui/styles'

const tabsStyles = ({ palette }) => ({
  root: {
    width: '100%',
    boxShadow: `inset 0 -1px 0 0 ${palette.divider}`,
  },
  indicator: {
    backgroundColor: palette.common.white,
  },
})

const tabItemStyles = ({ breakpoints, spacing }) => ({
  root: {
    textTransform: 'initial',
    margin: spacing(0, 0),
    minWidth: 0,
  },
  wrapper: {
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },
})

const navStyles = ({ spacing, palette, breakpoints }) => ({
  navBar: {
    boxShadow: `inset 0 -1px 0 0 ${palette.divider}`,
  },
  sticky: {
    position: 'sticky',
    top: 64,
    left: 0,
    right: 0,
    zIndex: 10,
    background: palette.background.default,
  },
  root: {
    marginTop: spacing(7),
    [breakpoints.only('xs')]: {
      paddingLeft: spacing(0),
      paddingRight: spacing(0),
    },
  },
  container: {
    backgroundColor: palette.background.default,
  },
  hideNavBar: {
    display: 'none',
  }
})

const tabsStylesHook = {
  useTabs: makeStyles(tabsStyles),
  useTabItem: makeStyles(tabItemStyles),
}

const navStylesHook = {
  useNav: makeStyles(navStyles),
}

export { tabsStylesHook, navStylesHook }
