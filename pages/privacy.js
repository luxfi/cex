import React from 'react'
import { Box } from "@material-ui/core"

import { googlePageView } from '../util'


class Privacy extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    return (
      <Box>
        <h1>Privacy Policy</h1>
      </Box>
    )
  }
}

export default Privacy
