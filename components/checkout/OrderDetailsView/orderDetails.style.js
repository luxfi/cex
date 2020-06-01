const darkerBg = {
  background: '#222',
}

const lighterBg = {
  background: '#333',
}

const borderBottom = {
  '& > :not(:last-child)': {
    borderBottom: '1px solid #535353',
  },
}

const padding20 = (theme) => ({
  padding: 20,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
})

const container = (theme) => ({
  marginTop: theme.spacing(6),
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
})

const marginBottom = (theme) => ({
  '&:not(:last-child)': {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
})

export default (theme) => ({

  outerContainer: {
    ...container(theme),
  },

  innerContainer: {
    ...container(theme),
    ...darkerBg,
  },

  mainContentArea: {
    padding: theme.spacing(2),
    '&:not(:last-child)': {
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
      },
    },
  },

  contentBox: {
    ...marginBottom(theme),
  },

  aTags: {
    color: '#fff',
    textDecoration: 'none',
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

  qrCodeSection: {
    textAlign: 'center',
    ...marginBottom(theme),
    ...lighterBg,
    ...padding20(theme),
    '& > *': {
      maxHeight: 250,
      marginBottom: '0.75em',
    },
    '& > h4': {
      fontSize: '1.75em',
    },
  },

  detailBox: {
    ...lighterBg,
    ...borderBottom,
  },

  locationSection: {
    ...lighterBg,
    ...borderBottom,
    ...padding20(theme),
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
    textAlign: 'center',
    ...padding20(theme),
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
    padding: theme.spacing(2),
  },

  emailInfo: {
    ...padding20(theme),
  },

  sidebarButton: {
    display: 'block',
    width: '100%',
    padding: '20px',
  },

  buttonWrapper: {
    ...padding20(theme),
    '& > :not(:last-child)': {
      marginBottom: theme.spacing(2),
    }
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
