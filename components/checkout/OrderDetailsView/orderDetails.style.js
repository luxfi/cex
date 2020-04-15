export default (theme) => ({
  container: {
    margin: '52px auto 0',
    padding: '20px 32px',
    position: 'relative',
    flexGrow: 1,
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
  },

  borderBottom: {
    '& > :not(:last-child)': {
      borderBottom: '1px solid #535353',
    },
  },

  shareLabel: {
    padding: theme.spacing(1)
  },

  topText: {
    textAlign: 'center',
    marginTop: '3em',
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

  ticketDetail: {
    padding: 20,
    textAlign: 'center',
    '&:not(:last-child)': {
      borderRight: '1px solid #535353',
    },
  },

  ticketDetailsLink: {
    padding: 10,
  },

  sideBar: {
    textAlign: 'center',
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
