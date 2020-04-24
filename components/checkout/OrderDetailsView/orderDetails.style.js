export default (theme) => ({
  container: {
    marginTop: theme.spacing(6),
    padding: '20px',
    position: 'relative',
    '& > *': {
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },

  aTags: {
    color: '#fff',
    textDecoration: 'none',
  },

  darkerBg: {
    background: '#222',
  },

  lighterBg: {
    background: '#333',
  },

  padding20: {
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },

  borderBottom: {
    '& > :not(:last-child)': {
      borderBottom: '1px solid #535353',
    },
  },

  shareLabel: {
    padding: theme.spacing(1),
  },

  topText: {
    textAlign: 'center',
    marginTop: '3em',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      paddingTop: 0,
    },
  },

  movieDetails: {
    textAlign: 'center',
    '& > *': {
      maxHeight: 250,
      marginBottom: '0.75em',
    },
    '& > h4': {
      fontSize: '1.75em',
    },
  },

  screenDetailsWrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  ticketDetail: {
    padding: 20,
    textAlign: 'center',
    '&:not(:last-child)': {
      borderRight: '1px solid #535353',
      [theme.breakpoints.down('sm')]: {
        borderBottom: '1px solid #535353',
        borderRight: 'none',
      },
    },
    flexGrow: 1,
    maxWidth: '100%',
    flexBasis: 0,
  },

  ticketDetailsLink: {
    padding: 10,
  },

  sideBar: {
    textAlign: 'center',
  },

  marginBottom: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
      },
    },
  },

  sidebarButton: {
    display: 'block',
    width: '100%',
    padding: '20px',
    '&:hover': {
      background: '#fac54c',
      color: '#222',
    },
  },

  mapSectionTitle: {
    fontSize: '1.5em',
    margin: '0 0 0.75em 0',
  },

  venueAddress: {
    padding: '20px 0 0 0',
    '& > .name': {
      fontSize: '1.5em',
    },
  },

  loadingIcon: {
    margin: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& svg': {
      color: '#FBC43E',
    },
  },

  '@media print': {
    'body *': { visibility: 'hidden' },
    '.print-area *': {
      backgroundColor: 'white',
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      margin: 0,
      padding: '15px',
      fontSize: '14px',
      color: '#000',
      visibility: 'visible',
    },
  },

})
