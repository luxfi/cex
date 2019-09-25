import { title } from "../../esx.js"

const productStyle = {
  section: {
    padding: "70px 0",
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: "#999",
    marginTop: "-6px" // find a cleaner way later
  }
}

export default productStyle
