import { container, title } from "../../../styles/esxStyles.js"

export default theme => ({
  container: {
    ...container,
    marginTop: '30vh',
    zIndex: "12",
    color: "#FFFFFF",
    marginLeft: theme.spacing(4),
    "@media (max-width: 573px)": {
      marginTop: '20vh',
    },
  },
  investButton: {
    color: "#000",
    backgroundColor: "#FBC43E",
    padding: "12px 24px"
  },
  watchTrailerButton: {
    color: "#FFF",
    border: "1px solid #FFF",
    padding: "11px 24px"
  },
  watchTrailerButtonText: {
    color: "#000",
  }
})

