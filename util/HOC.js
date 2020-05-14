import {
  Box, Button, Grid, Typography,
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useEffect } from 'react'

const LogInText = ({ onClick }) => (
  <Box
    className='MuiContainer-maxWidthXl'
  >
    <Grid
      container
      justify='center'
      alignItems='center'
      style={{ height: '50vh' }}
    >
      <Box style={{ textAlign: 'center' }}>
        <Typography gutterBottom variant='h6'>You are not logged in click on the button below to login</Typography>
        <Button onClick={onClick} variant='outlined' color='primary'>Login</Button>
      </Box>
    </Grid>
  </Box>
)

export const withOnDemandAuth = (Component) => inject('store')(observer((props) => {
  const {
    store: {
      userStore,
      uiStore,
      uiStore: { authModalOpen },
    },
  } = props

  useEffect(() => {
    if (!userStore.loggedIn) {
      uiStore.openAuthModal()
    }
  }, [userStore.loggedIn])

  return (
    <>
      {userStore.loggedIn && <Component />}
      {(!userStore.loggedIn && !authModalOpen) && <LogInText onClick={() => uiStore.openAuthModal()} />}
    </>
  )
}))

export const noop = () => {}
