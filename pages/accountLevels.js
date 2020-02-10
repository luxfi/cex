import React from 'react'
import { inject, observer } from 'mobx-react'

import {
  Container,
  Typography,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  withStyles
} from '@material-ui/core'

import { googlePageView } from '../util/generic.js'

const styles = (theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(4),
  },
  stepper: {
    padding: 0,
  },
})

const STEPS = [
  {
    title: 'Level 1',
    action: 'Verify phone number',
    desc: 'Your account limit is $1,000. Buy shares in films up to this limit.',
  },
  {
    title: 'Level 2',
    action: 'Verify personal information',
    desc: 'Your account limit is $2,000. Buy shares in films up to this limit.',
  },
  {
    title: 'Level 1',
    action: 'Verify photo id',
    desc: 'Your account limit is $5,000. Buy shares in films up to this limit.',
  },

]


@inject("store")
@observer
class AccountLevels extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  renderStep = (title, action, desc, index) => {
    return (
        // safe to use index, since this never changes
      <Step key={index} active>
        <StepLabel>{title}</StepLabel>
        <StepContent>
          <Typography variant='h6'>{action}</Typography>
          <Typography variant='body1'>{desc}</Typography>
        </StepContent>
      </Step>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <Container >
        <Typography variant='h4' className={classes.pageTitle}>Account Levels</Typography>
        <Grid container spacing={3} alignItems='stretch' alignContent='stretch'>
          <Grid item sm={12} md={6}>
            <Paper className={classes.paper}>
              <Stepper orientation='vertical' className={classes.stepper}>
              {STEPS.map((step, index) => (
                this.renderStep(step.title, step.action, step.desc, index)
              ))}
              </Stepper>
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Paper className={classes.paper}>
              <Typography variant='h5'>Account Limits</Typography>
              <Typography variant='body1'>Bank purchases / deposits: $5,000 /day</Typography>
              <Typography variant='body1'>Card purchases: $5,000 /week</Typography>
              <Typography variant='body1'>Wire transfers: $25,000 /week</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(AccountLevels)
