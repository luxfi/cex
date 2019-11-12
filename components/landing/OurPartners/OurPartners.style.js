import { cardTitle, title } from "../../../styles/esxStyles.js"

const ourPartnersStyle = theme => ({
  section: {
    marginTop: "40px",
    marginBottom: "40px",
    padding: "72px 0",
    textAlign: "center",
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    color: "#fff",
  },
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  justifyCenter: {
    justifyContent: "center !important"
  },
  margin5: {
    margin: "5px"
  },
  svg: {
    fill: theme.defaultSVGColor
  },
})

export default ourPartnersStyle
