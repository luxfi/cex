import { fade } from '@material-ui/core/styles'

  // this visually accomodates the trading/funding tabs
  // and the fact that the text is centered 
const tabOffsetMargin = '-15px'

export default theme => ({
  toolbar: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: '64px',  // app bar height
    zIndex: 20,
    transition: 'background 0.75s ease-in-out',
    maxWidth: theme.maxStagingWidth,
    // TODO move this into a custom mixin into the theme
    paddingLeft: theme.spacing(3), // 32px
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
    
    marginLeft: tabOffsetMargin,
    
    ...theme.mixins.toolbar,
  },

  transparent: {
    background: 'transparent',
  },

  solid: {
    background: 'rgba(10, 10, 10, 0.85)',
  },

  search: {
    marginLeft: theme.spacing(4)
  },



  main: {
    paddingTop: '64px',
    marginTop: 0
  },

  tabsContainer: {
    marginLeft: tabOffsetMargin,
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
      }
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
    }
  },

  tabIndicator: {
    width: '110px !important',
  },
})
