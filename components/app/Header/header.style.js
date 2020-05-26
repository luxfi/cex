export default (theme) => ({
  appBarCommon: {
    color: 'inherit',
    boxShadow: 'none',
    transition: 'background 0.5s ease-in-out',

    /* NOTE: padding is impl in 'styles/responsivePadding.scss */
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
    color: '#fff', // theme.palette.common.white,  (true white, not palette white)
    '& *': {
      color: 'inherit'
    },
  },
    
  navButton: {
    '&:first-child': {
      marginRight: theme.spacing(2)
    }
  },

  hamburgerMenuButton: {
    marginRight: '-12px', // so button appears round on hover but is aligned w left margin
  },

  accountOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '260px',
    //border: '1px white solid'
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
})
