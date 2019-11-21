// https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/
export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flexGrow: 1,
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
})
