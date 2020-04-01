import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { googlePageView } from '../util'
import { inject, observer } from 'mobx-react'

const styles = {}

@inject('store')
@observer
class Careers extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    const { classes, store } = this.props
    const jobs = store.careerStore.jobs
    return (
      <Box>
        <ul>
          <li>hello</li>
          {jobs.forEach(job => {
            return <li>{job}</li>
          })}
        </ul>
      </Box>
    )
  }
}

export default withStyles(styles)(Careers)
