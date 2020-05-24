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
    justifyContent: 'space-between',
    flex: 2,
    height: 60,

    [theme.breakpoints.down('md')]: {
      flex: 1,
    },
  },

  logo: {
    cursor: 'pointer',
  },

  desktopElementsOuter : {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
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
    display: 'none',
    transition: 'all 300ms linear',
  },
  showSearchBotton: {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
  },
  search: {
    width: '450px',
    height: 63,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    position: 'absolute',
    right: 63,
    boxSizing: 'border-box',
    width: 0,
    height: 42,
    padding: '0 20px',
    outline: 'none',
    fontSize: 18,
    borderRadius: 63,
    color: '#29313a',
    border: '3px solid #62d474',
    transition: 'all 0.8s ease',
  },
  active: {
    width: 350,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    right: 100,
  },
  btn: {
    position: 'absolute',
    width: 42,
    height: 42,
    background: '#62d474',
    borderRadius: '50%',
    right: 63,
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: 80,
    fontSize: 20,
    color: '#fff',
    transition: 'all 0.8s ease',
  },
  btnInner: {
    position: 'relative',
  }
  atag: {
    color: 'inherit',
    textDecoration: 'none',
  },
})
