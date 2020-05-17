export default (theme) => ({

  breadcrumbRow: {
    marginBottom: '30px',
    marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
    '& > .MuiBreadcrumbs-root': {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },

  pageTabsOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: '0 30px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'space-between',
      paddingTop: 0,
    },
  },
  pageTab: {
    display: 'block',
    cursor: 'pointer',
    '&:first-child': {
      marginRight: '12px',
    },
    textTransform: 'uppercase',
    lineHeight: '1.1',
  },
  selectedTab: {
    // better than textDecoration: underline,
    // which renders too close to the text
    borderBottom: `1px solid ${theme.palette.text.primary}`,
  },

  titleAndDescription: {},

  title: {
    display: 'inline-block',
    margin: "1.75rem 0 0.875rem",
    position: 'relative',
    minHeight: '32px',
    textDecoration: 'none',
    fontSize: '3rem',
    fontWeight: "700",
    fontFamily: 'sans-serif',
    textTransform: 'uppercase',
    marginTop: '0px',
    color: 'inherit',
  },

  description: {
    fontSize: '1.313rem',
    maxWidth: '70%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },

  },

  sectionTitle: {
    fontSize: '3rem',
    margin: 0,
    textTransform: 'uppercase',
  },
  sectionByline: {
    fontSize: '1.5rem',
    margin: 0,
    textTransform: 'uppercase',
    marginBottom: '24px',
  },

  graphImage: {
    display: 'block',
    margin: '0 auto',
    backgroundColor: '#f4f3f3',
  },

  articleSection: {
    marginTop: '70px',
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  grow: {
    flexGrow: 1,
    display: 'block',
  },
  flex: {
    display: 'flex',
    alignItems: 'flex-end',
  },

  movieButton: {
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 15px 0',
      width: '100%',
    },
    display: 'inline-block',
    flexGrow: 1,
    marginLeft: '12px',
  },
  faPlay: {
    paddingRight: '10px',
  },

  '.$watch-trailer-button': {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0 0 15px 0',
    },
  },

  watchButton: {
    textDecoration: 'none',
    '& > .watch-trailer-button': {
      [theme.breakpoints.down('sm')]: {
        margin: '0 0 15px 0',
        width: '100%',
      },
    },
  },

  seeMoreOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottom: '1px solid #555',
  },
  seeMoreButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    paddingBottom: '2px',
  },
  seeMoreCopy: {
    display: 'block',
    fontSize: '8pt',
    cursor: 'pointer',
  },

  aboutMoreTitleArea: {
    padding: '30px 0',
  },
  aboutMoreCopyArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  aboutMoreStats: {
    flexGrow: 1,
    flexBasis: 0,
    paddingRight: '24px',
  },
  aboutMoreText: {
    flexGrow: 1,
    flexBasis: 0,
  },
  aboutMoreStatsTable: {
    tableLayout: 'fixed',
    width: '80%',
    borderSpacing: '0 1em',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  aboutImage: {
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  investCompanyName: {
    margin: '0 auto',
    marginTop: '32px',
    fontSize: '32px',
  },
  investCompanyDescription: {
    margin: '0 auto',
    fontSize: '13px',
  },
  investPrice: {
    margin: '0 auto',
    marginTop: '12px',
  },
  deltaRow: {
    margin: '0 auto',
    marginBottom: '12px',
    fontSize: '13px',
  },
  statsButton: {
    margin: '0 auto',
  },

  dollarSign: {
    fontSize: '38px',
  },
  dollarValue: {
    fontSize: '38px',
  },
  centsValue: {
    fontSize: '38px',
  },

  investMoreOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '32px',
  },
  investMoreTable: {
    borderTop: '1px #444 solid',
    width: '300px',
    '&:first-child': {
      marginRight: '60px',
    },
    '& td': {
      borderBottom: '1px #444 solid',
      fontSize: '1.3rem',
      color: '#999',
      textAlign: 'right',
      '&:first-child': {
        textAlign: 'left',
      },
    },
  },
})
