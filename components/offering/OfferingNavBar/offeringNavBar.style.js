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
    [breakpoints.up('md')]: {
      minWidth: 0,
    },
    // whiteSpace: 'nowrap',
  },
  wrapper: {
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },
})

const navStyles = ({ spacing, palette, breakpoints }) => ({
  navBar: {
    boxShadow: `inset 0 -1px 0 0 ${palette.divider}`,
    [breakpoints.up('md')]: {
      //paddingLeft: spacing(3),
      //paddingRight: spacing(3),
    },
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
    [breakpoints.up('xl')]: {
      //width: '1800px',
      //margin: '0 auto',
    },
    [breakpoints.up('md')]: {
      //paddingLeft: spacing(2),
      //paddingRight: spacing(2),
    },
    [breakpoints.only('sm')]: {
      //paddingLeft: spacing(1),
      //paddingRight: spacing(1),
    },
    [breakpoints.only('xs')]: {
      paddingLeft: spacing(0),
      paddingRight: spacing(0),
    },
  },
  container: {
    backgroundColor: palette.background.default,
  },
})

const tabsStylesHook = {
  useTabs: makeStyles(tabsStyles),
  useTabItem: makeStyles(tabItemStyles),
}

const navStylesHook = {
  useNav: makeStyles(navStyles),
}

export { tabsStylesHook, navStylesHook }
