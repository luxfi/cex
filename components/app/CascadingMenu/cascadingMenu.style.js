export default (theme) => ({

  menuOuter: {
    display: 'flex',
    flexWrap: 'noWrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    fontSize: '0.9rem',
    lineHeight: 1.1,
    fontWeight: 600,

    [theme.breakpoints.up('lg')]: {
      fontSize: '1.0rem',
      lineHeight: 1.2,
      fontWeight: 600,
    },

    '& *': {
      fontSize: 'inherit',
      lineHeight: 'inherit',
      fontWeight: 'inherit',
    }
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
    height: '100%',
    minWidth: 0,
  },

  menuButtonOuter: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
    },
    '&:last-child': {
      marginRight: 0,
    },

  }
})
