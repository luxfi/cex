import React from "react"
import { ContactForm } from "../components/contact"
import { googlePageView } from '../components/utils/generic'

class Contact extends React.Component {
  componentDidMount() {
    googlePageView()
  }
  render() {
    return <ContactForm/>
  }
}

export default Contact
