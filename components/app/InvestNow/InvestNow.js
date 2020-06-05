import React, { useState } from 'react'

import { 
  Button,
  Box,
  Grid, 
  makeStyles, 
  Paper, 
  Typography
} from '@material-ui/core'

import { NextMuiLink, CustomModal } from '..'

import commonStr, { APP_NAME } from '../../../service/common'

const myStyles = makeStyles((theme) => ({
  section: {
    height: '400px',
    borderRadius: '16px'
  }
}))

export default (props) => {

  const classes = myStyles()
  const { loggedIn, noPadding, ...rest } = props
  const hrefLink = loggedIn ? "/portfolio" : "/signup"

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div style={noPadding ? {} : { padding: "48px 0px" }}>
      <Box clone pt={2} pr={1} pb={1} pl={2}>
        <Paper elevation={0}>
          <Grid
            container
            className={classes.section}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography
              align="center"
              color="textPrimary"
              variant="h5"
              component="h2"
              gutterBottom
            >
              <Box>Invest more than screen time in your favorite films.</Box>
            </Typography>
            <Grid container justify="center">
              <Button component={NextMuiLink} href={hrefLink}>
                Invest Now
              </Button>
              <Button
                variant="outlined"
                style={{
                  marginLeft: "20px"
                }}
                onClick={handleOpen}
              >
                What is {APP_NAME}?
              </Button>

              <CustomModal
                handleClose={handleClose}
                open={open}
                title={`What is ${APP_NAME}?`}
              >
                <p>{APP_NAME} is a film investing platform for everyone.</p>{" "}
                <p>
                  We allow regular people — not just wealthy {commonStr('product')} producers — to
                  invest in promising {commonStr('productPlural')}, with as little as $10 or as much as
                  $100,000 per investment.
                </p>{" "}
                <p>
                  {APP_NAME} was created to democratize fundraising for {commonStr('product')} while
                  giving anyone the chance to back the next greatest {commonStr('product')}.
                </p>
              </CustomModal>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  )
}
