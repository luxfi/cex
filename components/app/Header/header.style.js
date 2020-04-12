export default (theme) => ({
  appBarCommon: {
    color: 'inherit',
    boxShadow: 'none',

    padding: `0px ${theme.spacing(3)}`,
  
    [theme.breakpoints.up('lg')]: {
      padding: `0px ${theme.spacing(8)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `0px ${theme.spacing(2)}`,
    },

    transition: 'background 0.5s ease-in-out',
  },

  appBarDesktopTop: {
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(to bottom, rgba(17, 17, 17, 0.7), rgba(17, 17, 17, 0.0))'
  },

  appBarDesktopScrolled: {
    backgroundImage: 'none',
    backgroundColor: theme.palette.common.black,
  },

  appBarMobile: {
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
    color: '#fff', // theme.palette.common.white,  (true white, not palette white)
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
    color: '#fff', // theme.palette.common.white,  (true white, not palette white)
    '& *': {
      color: 'inherit'
    }
  },

  accountIcon: {
    width: 36,
    height: 36,
  },
})
