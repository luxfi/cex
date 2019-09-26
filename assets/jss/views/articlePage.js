import { container, title } from "../esx.js"

const articlePageStyle = theme => ({
  container: {
    zIndex: "12",
    ...container
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    fontSize: "3em"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainImage: {
    // padding: "70px 0",
    // padding: "106px",
    textAlign: "center",
    backgroundColor: "#f4f3f3",
    height: "629px",
    margin: "70px 0px",
    borderRadius: "8px",
    overflow: "hidden"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  grow: {
    flexGrow: 1,
    display: "none",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block"
    // },
    display: "block"
  },
  flex: {
    display: "flex",
    alignItems: "flex-end"
  },
  investButton: {
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
      display: "inline"
    },
    display: "none"
  }
})

export default articlePageStyle
