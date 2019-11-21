export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',

    [theme.breakpoints.up("lg")]: {
      //margin: "0 auto",
      //width: "95vw",
      //maxWidth: "1500px"
    },
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
})
