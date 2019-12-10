export default theme => {
  return {
    appBar: {
      color: 'inherit',
      boxShadow: 'none',
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
  }
}
