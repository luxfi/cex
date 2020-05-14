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
  divider: {
    marginBottom: 15,
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    backgroundColor: '#333',
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  finalButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  iconInfoAreaOuter: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconInfoAreaIcon: {
    display: 'block',
    fontSize: '2.5rem',
    flexGrow: 0,
    alignSelf: 'center',
    marginRight: theme.spacing(2),
  },
  iconInfoAreaMain: {
    flexGrow: 1,
  },
  iconInfoAreaButtonOuter: {
    flexGrow: 0,
  },
})
