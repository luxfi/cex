import { cardTitle, title } from "../../esx.js"
import imagesStyle from "../../imagesStyles.js"

const investNowStyle = {
  section: {
    // padding: "70px 0",
    padding: "32px 0",
    textAlign: "center",
    backgroundColor: "#f4f3f3",
    borderRadius: "32px"
  },
  title: {
    ...title,
    // marginBottom: "1rem",
    // minHeight: "32px",
    marginTop: "0.875rem",
    textDecoration: "none",
    textAlign: "center"
  },
  ...imagesStyle,
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  cardTitle,
  smallTitle: {
    color: "#6c757d"
  },
  description: {
    color: "#999"
  },
  justifyCenter: {
    justifyContent: "center !important"
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999"
  },
  margin5: {
    margin: "5px"
  }
}

export default investNowStyle
