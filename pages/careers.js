import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button, Avatar, Grid } from '@material-ui/core'
import { googlePageView } from '../util/generic'
import { inject, observer } from 'mobx-react'
import Container from "@material-ui/core/Container"

const styles = {}

@inject('store')
@observer
class Careers extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    const { classes, store } = this.props
    const jobs = store.careerStore.getJobs
    return (
      <Container>
        <ul>
          <li>hello</li>
          {jobs.forEach(job => {
            return <li>{job}</li>
          })}
        </ul>
      </Container>
    )
  }
}

export default withStyles(styles)(Careers)
