export default (theme) => ({
  root: {
    backgroundColor: theme.palette.common.black,
  },
  appBar: {
    backgroundImage: 'none',
    backgroundColor: theme.palette.common.black,
    boxShadow: 'none',
    padding: theme.spacing(0, 4)
  },
  main: {
    flexGrow: 1,
    marginTop: 64,
    backgroundColor: theme.palette.common.black,
    padding: theme.spacing(0),
    minHeight: '50vh',
    '& .slide-button': {
      margin: 0,
      background: 'transparent !important',
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2),
      marginTop: 0,
    },
  },
  toolbar: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconSection: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-start',
  },
  logo: {
    marginLeft: theme.spacing(2),
  },
})
