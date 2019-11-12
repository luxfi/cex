import React from "react"
import { ContactForm } from "../components/contact"
import { googlePageView } from '../util/generic'

class Contact extends React.Component {
  componentDidMount() {
    googlePageView()
  }
  render() {
    return <ContactForm/>
  }
}

export default Contact
