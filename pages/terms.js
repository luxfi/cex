import React from 'react'
import { Box } from "@material-ui/core"

import { googlePageView } from '../util'


class Terms extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    return (
      <Box>
        <h1>Terms of Use</h1>
      </Box>
    )
  }
}

export default Terms
