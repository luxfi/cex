import { fade } from '@material-ui/core/styles'

export default theme => {
  return {
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

    facets: {
      marginLeft: 'auto',
    },

    facetsLabel: {
      marginRight: theme.spacing(3)
    },

    facetsButton: {
      backgroundColor: '#222',
      marginRight: theme.spacing(2),
      '&:last-child': {
        marginRight: 0
      },
      textTransform: 'capitalize', 
    },

    facetsButtonText: {
      textTransform: 'capitalize', 
    },

    facetsMenu: {
      zIndex: 20
    },

    facetUnchecked: {
        // using visibility: hidden rather than display: none so layout is preserved
      visibility: 'hidden'
    },



    main: {
      paddingTop: '88px' // 64px offset + 24px real padding 
    },
  
    tabIndicator: {
      width: '150px !important',
    },
  
    tabRoot: {
      paddingLeft: 0,
    },
  
    tabWrapper: {
      alignItems: 'flex-start',
    },
  
    card: {
      maxWidth: 450,
      position: 'relative',
      zIndex: 1,
      '&:hover': {
        zIndex: 10,
        transform: 'scale(1.1) !important',
        cursor: 'pointer',
      },
      '&:hover $cardContent': {
        visibility: 'visible',
      }
      },
  
    cardMedia: {
      objectFit: 'cover'
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
    }
}