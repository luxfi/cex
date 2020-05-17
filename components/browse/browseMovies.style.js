import { fade } from '@material-ui/core/styles'

// this visually accomodates the trading/funding tabs
// and the fact that the text is centered
const tabOffsetMargin = '-15px'

export default (theme) => ({

  main: {
    padding: theme.spacing(0, 2),
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.common.black,
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(0, 8),
    },
  },
  toolbar: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: '64px',
    zIndex: 20,
    transition: 'background 0.75s ease-in-out',
    padding: `0px ${theme.spacing(3)}`,
    background: 'rgba(10, 10, 10, 0.85)',
    [theme.breakpoints.up('lg')]: {
      padding: `0px ${theme.spacing(8)}`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: `0px ${theme.spacing(2)}`,
    },
    [theme.breakpoints.down('xs')]: {
      background: '#000',
      flexDirection: 'column',
      paddingBottom: '7px',
    },
  },
  search: {
    marginLeft: theme.spacing(4),
  },
  tabsContainer: {
    marginLeft: tabOffsetMargin,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      marginLeft: 0,
    },
  },

  // https://codeburst.io/my-journey-to-make-styling-with-material-ui-right-6a44f7c68113
  tabRoot: {
    paddingLeft: 0,
    minWidth: 130,
    width: 130,
    cursor: 'default !important',

    '&$selected': {
      '& $tabWrapper:hover': {
        cursor: 'default !important',
        backgroundColor: theme.palette.background.default,
      },
    },
    [theme.breakpoints.down('xs')]: {
      flexShrink: 'unset',
      width: 'auto',
      minWidth: 100,
    },
  },

  // must include this!
  // https://codeburst.io/my-journey-to-make-styling-with-material-ui-right-6a44f7c68113
  selected: {},

  tabWrapper: {
    alignItems: 'center',
    lineHeight: '2.0',
    border: 1,
    borderRadius: 5,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },

  tabIndicator: {
    width: '110px !important',
    [theme.breakpoints.down('xs')]: {
      width: '90px !important',
    },
  },

  resultsOuter: {},

  noFilmMessage: {
    textAlign: 'center',
    width: '100%',
    marginTop: 64,
  },
})
