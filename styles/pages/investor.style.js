export default (theme) => ({
  root: {
    padding: 0,
    width: '90%',
  },
  apiSectionAddButton: {
    padding: 0,
    paddingRight: theme.spacing(1),
  },
  controlUILabel: {
    fontSize: '0.9rem',
    marginRight: theme.spacing(1),
  },
  controlUIIcon: {
    fontSize: '1.5rem',
  },

  viewSectionBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  },

  investorInfoTable: {
    borderCollapse: 'collapse',
    '& td': {
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(8),
      borderBottom: 'none',
    },
    maxWidth: '1000px',
  },
  tableSectionRow: {
    '& td': {
      paddingTop: theme.spacing(2) + 'px !important',
      borderBottom: '1px solid #444 !important',
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
  sessionsThirdPartyAppsTable: {
    borderCollapse: 'collapse',
    '& td': {
      borderBottom: 'none',
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(8),
    },
    maxWidth: '1000px',

  },

  formControl: {
    width: '100%',
    marginBottom: '10px',
    '& .MuiTextField-root': {
      width: '100%',
    },
    '& .MuiInput-root': {
      padding: '0 10px',
      marginRight: 10,
    },
    '& .MuiFormLabel-root': {
      margin: '0 10px',
      color: '#dcdcdc',
    },
    '& .MuiSvgIcon-root': {
      width: '0.8em',
      height: '0.8em',
    },
    '& .MuiIconButton-root': {
      padding: 5,
    },
    '& .MuiFormControlLabel-label': {
      fontSize: '1em',
    },
  },

  radioGroup: {
    marginTop: 16,
  },

  largeButton: {
    margin: '20px 0 0 0',
    padding: '10px 45px',
  },

  sessionsHeaderRow: {
    borderBottom: '1px solid #444',
    marginBottom: theme.spacing(2),
    '& th': {
      textAlign: 'left',
    },
  },

  iconInfoAreaOuter: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '800px',
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
  warning: {
    color: theme.palette.error.dark,
  },
})
