import { container, title } from "../esx.js"

const appStyle = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    marginBottom: theme.spacing(2)
  },
  stickyFooter: {
    marginTop: "auto"
  }
})

export default appStyle
