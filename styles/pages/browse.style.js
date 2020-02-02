import { fade } from '@material-ui/core/styles'

const tabOffsetMargin = '-15px'

export default theme => ({
  toolbar: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: '64px',  // app bar height
    zIndex: 20,
    transition: 'background 0.75s ease-in-out',

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
    paddingTop: '128px', // 2 X 64px toolbar 
    marginTop: 0
  },

  tabsContainer: {
    marginLeft: tabOffsetMargin,
  },

  tabRoot: {
    paddingLeft: 0,
    minWidth: 130,
    width: 130
  },

  tabWrapper: {
    //alignItems: 'flex-start',
    alignItems: 'center',
  },

  tabIndicator: {
    width: '110px !important',
  },



  card: {
    maxWidth: 450,
    position: 'relative',
    height: '100%',
    zIndex: 1,
    cursor: 'pointer',
    '&:hover': {
      zIndex: 10,
      transform: 'scale(1.1) !important',
    },
    '&:hover $cardContent': {
      visibility: 'visible',
    }
  },

  cardMedia: {
    objectFit: 'cover',
    height: '100%',
  },

  cardContent: {
    visibility: 'hidden',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: '#222',
    opacity: '0.8'
  },

  stat: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main
  }
})
