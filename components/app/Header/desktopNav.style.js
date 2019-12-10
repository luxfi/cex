export default (theme) => ({
  logo: {
    display: 'inline-block',
    marginTop: '-16px',
    cursor: 'pointer',
  },

  navOuter: {
    display: 'flex',
    flexWrap: 'noWrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  navSpacer: {
    width: theme.spacing(12),
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

  navButton: {
    marginRight: theme.spacing(2),
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

  accountOuter: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
  },

  accountIcon: {
    width: 36,
    height: 36,
  },
})
