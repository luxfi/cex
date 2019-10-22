import React from "react"
import { withRouter } from "next/router"

import { ContactForm } from "../components/contact"

const Contact = (props) => (
  <ContactForm/>
)

export default withRouter(Contact)


