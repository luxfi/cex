export default (theme) => ({
  root: {
    background: theme.palette.common.black,
  },
  main: {
    flexGrow: 1,
    marginTop: 64,
    background: theme.palette.common.black,
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
})
