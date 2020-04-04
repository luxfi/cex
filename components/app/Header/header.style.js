export default (theme) => ({
  appBar: {
    color: 'inherit',
    boxShadow: 'none',

    padding: `0px ${theme.spacing(3)}px`,   
    [theme.breakpoints.down('xs')]: {
      padding: 0 //`0px ${theme.spacing(2)}px`,   
    },

    [theme.breakpoints.up('lg')]: {
      padding: 0,   
    },
    transition: 'background 0.5s ease-in-out',
  },

  transparent: {
    background: 'transparent',
  },

  solid: {
    background: theme.palette.common.black,
  },

  translucent: {
    background: 'rgba(17, 17, 17, 0.7)',
  },

  toolbar: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },

  logo: {
    cursor: 'pointer',
    alignSelf: 'flex-start',
    marginTop: '2px'
  },

  desktopElementsOuter : {
    display: 'flex',
    flexDirection: 'row',
  },

  navMenu: {
    marginRight: theme.spacing(8),
    color: theme.palette.primary.dark,
    '& *': {
      color: 'inherit'
    }
  },

  hamburgerMenuButton: {
    paddingLeft: 0,
  },

  accountOuter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  accountIcon: {
    width: 36,
    height: 36,
  },
})
