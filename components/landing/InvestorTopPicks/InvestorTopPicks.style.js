import { cardTitle, title } from "../../../styles/esxStyles.js"

const investorTopPicksStyle = {
  section: {
    padding: "70px 0",
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    color: "#FFF",
  },
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  img: {
    maxWidth: "100%",
    height: '210px'
  },
  cardTitle: {
    ...cardTitle,
    color: "#FFF",
  },
  smallTitle: {
    color: "#FFF",
  },
  description: {
    color: "#FFF",
    marginTop: "-6px" // find a cleaner way later
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
  },
}

export default investorTopPicksStyle
