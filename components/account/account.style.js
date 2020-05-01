export default (theme) => ({

  root: {
    padding: theme.spacing(2),

    '& .MuiCard-root': {
      '& h6': {
        fontSize: '1rem',
        marginBottom: theme.spacing(1.5),
      }
    },
    '& MuiFormControl-root': {
      display: 'block',
      width: '100%',
    },

    '& .MuiTextField-root': {
      width: '100%',
    },
  },

  profileViewSaveButton: {
    margin: '20px 0 0 0',
    padding: '10px 45px',
  },

  linkedAccountsCard: {
    marginBottom: theme.spacing(2)
  },
  cardContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  apiSectionListInfoIcon: {
    display: 'inline',
    float: 'left',
    fontSize: '2.5rem',
  },
  apiSectionListNoneOuter: {
    paddingLeft: theme.spacing(3),
    '& p': {
      margin: 0,
    },
  },
  apiUpgradeLink: {
    marginLeft: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(2),
    }
  },

  sessionsHeaderRow: {
    borderBottom: '1px solid #444',
    marginBottom: theme.spacing(2),
    '& th': {
      textAlign: 'left',
    },
  },
  sessionsSessionsTable: {
    borderCollapse: 'collapse',
    '& td': {
      paddingTop: theme.spacing(1),
      borderBottom: 'none',
      paddingRight: theme.spacing(8),
    },
    maxWidth: '1000px',
  },
  warning: {
    color: theme.palette.error.dark,
  },
})
