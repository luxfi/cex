export default theme => ({
  appBar: {
    color: 'inherit',
    boxShadow: 'none',
    padding: `0px ${theme.spacing(3)}px`,   
    [theme.breakpoints.down('xs')]: {
      padding: `0px ${theme.spacing(2)}px`,   
    },
    [theme.breakpoints.up('lg')]: {
      padding: `0px ${theme.spacing(8)}px`,   
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
  },
  menuButton: {
    paddingLeft: 0,
  },
  mobileLogo: {
    height: '26px',
    display: 'block',
  },
  accountMenuButton: {
    paddingRight: 0,
  },
  mobile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
