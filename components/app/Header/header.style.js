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

  modalHeader: {
    backgroundColor: theme.palette.common.black,
  },

  toolbar: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logoArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    cursor: 'pointer',
    marginTop: '2px'
  },

  desktopElementsOuter : {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  navMenu: {
    marginRight: theme.spacing(8),
    color: '#fff', // theme.palette.common.white,  (true white, not palette white)
    '& *': {
      color: 'inherit'
    }
  },

  hamburgerMenuButton: {
    marginRight: '-12px', // so button appears round on hover but is aligned w left margin
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

  menu: {
    '& li.MuiMenuItem-root': {
      '& svg': {
        color: 'inherit',
        marginRight: '8px'
      },
      '& a': {
        color: 'inherit',
        textDecoration: 'none',
      }
    }
  },
  searchButton: {
    width: 48,
    height: 48,
  }
})
