export default (theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('xl')]: {
      width: 1800,
      margin: '0 auto',
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
    [theme.breakpoints.only('sm')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.only('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },

  logoAreaGridItem: {
    [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing(3),
    },
  },
  navGridItem: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(2),
    },
  },

  logoImg: {
    display: 'block',
    position: 'relative',
    top: -10,
  },
  byline: {
    marginBottom: theme.spacing(2),
  },
  socialIconRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
    },
  },
  socialIcon: {
    display: 'block',
    padding: 0,
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
  },
  navOuter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
    },
  },
  navGridContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'stretch',
    },
  },
  navSectionGridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(3),
  },
  navSectionTitle: {
    fontSize: '1.3rem',
  },
  footerNavLink: {
    '&:hover': {
      textDecoration: 'none',
      color: '#fac54c', // :aa TODO theme.palette.secondary.main isn't working for some reason
    },
  },
  navSectionHR: {
    margin: 0,
    marginBottom: theme.spacing(3),
    display: 'block',
    width: '90%',
    borderWidth: '0 0 1px 0',
    borderColor: theme.palette.divider,
  },
  appStoreSectionHR: {
    margin: 0,
    marginBottom: theme.spacing(2),
    display: 'block',
    width: '100%',
    borderWidth: '0 0 1px 0',
    borderColor: theme.palette.divider,
  },
  appStoreOuter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appStoreTitle: {
    marginBottom: theme.spacing(0.5),
  },
  appStoreApple: {
    width: 110,
    paddingRight: theme.spacing(1),
  },

  copyrightOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    color: theme.palette.text.secondary,
    '& p': {
      marginRight: theme.spacing(1),
    },
    marginBottom: theme.spacing(2),

    '& a': {
      color: 'inherit',
    },
  },
  finePrint: {
    fontSize: '0.8rem',
    color: theme.palette.text.disabled,
    '& a': {
      color: 'inherit',
    },
  },

  '@global': {
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
})
