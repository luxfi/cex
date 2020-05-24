export default (theme) => ({

  menuOuter: {
    display: 'flex',
    flexWrap: 'noWrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& :first-child': {
      marginRight: theme.spacing(1),
    },
  },

  menuItemIcon: {
    width: 24,
    height: 24,
  },

  menuButton: {
    marginRight: theme.spacing(2),
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
    },
    minWidth: 0,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    '&:last-child': {
      marginRight: 0,
    },
  },

  aTag: {
    height: '100%',
    textDecoration: 'none',
  },

})
