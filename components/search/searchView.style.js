// This visually accomodates the trading/funding tabs
// and the fact that the text is centered
const TAB_OFFSET_MARGIN = '-5px'
const TOOLBAR_HEIGHT = 48
const PILLS_HEIGHT = 40

export default (theme) => ({

  main: {
    backgroundColor: theme.ext.greys[1], 

      // https://stackoverflow.com/questions/5209814/can-i-position-an-element-fixed-relative-to-parent
    transform: 'translateZ(0)',

    boxSizing: 'border-box',
    paddingTop: `${TOOLBAR_HEIGHT + PILLS_HEIGHT}px`, // Start content below my toolbar
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: '80vh', 
    borderRadius: '3px'
  },

  toolbar: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0, 
    zIndex: 20,
    minHeight: 'initial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },

  toolbarInner: {
    height: `${TOOLBAR_HEIGHT}px`, // Start content below my toolbar
    
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },


  tabsContainer: {
    marginLeft: TAB_OFFSET_MARGIN,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      marginLeft: 0,
    },
  },

    // https://codeburst.io/my-journey-to-make-styling-with-material-ui-right-6a44f7c68113
  tabRoot: {
    paddingLeft: 0,
    minWidth: 110,
    width: 110,
    cursor: 'default !important',

    '&$selected': {
      '& $tabWrapper:hover': {
        cursor: 'default !important',
        backgroundColor: 'inherit',
      },
    },
    '& $tabWrapper:hover': {
      backgroundColor: theme.palette.background.default,
    },

    [theme.breakpoints.down('xs')]: {
      flexShrink: 'unset',
      width: 'auto',
      minWidth: 100,
    },
  },

  facetsAreaOuter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    width: '100px !important',
    [theme.breakpoints.down('xs')]: {
      width: '90px !important',
    },
  },

  facetPillsOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingTop: '3px',
    height: PILLS_HEIGHT,
    paddingRight: theme.spacing(2),
  },

  viewButton: {
    padding: '3px',
    borderRadius: 'initial'
  },

  selectedView: {
    cursor: 'default',
    backgroundColor: theme.ext.greys[2],
    '&:hover': {
      backgroundColor: theme.ext.greys[2],
    },
  },

  closeButton: {
    margin: '0px 5px'
  },

  resultsOuter: {
  },

  noFilmMessage: {
    textAlign: 'center',
    width: '100%',
    marginTop: 64,
  },

  table: {
  },

  tr: {
    paddingTop: '5px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.ext.greys[2]
    }
  },

  td: {
    paddingTop: '8px'
  },

})
