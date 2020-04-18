import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import {
  Box, 
  Button, 
  Grid, 
  Typography,
} from '@material-ui/core'

import { AuthModal } from '../components/app'


/** use as decorator
 * 
 *  @loginRequired
 *  class MyClass extends Component ...
 */
export default (Component) => inject('store')(observer((props) => {
    
  const {
    store: {
      userStore,
      uiStore,
      uiStore: { authModalOpen, tabIndexValue },
    },
  } = props

  useEffect(() => {
    if (!userStore.loggedIn) {
      uiStore.openAuthModal()
    }
  }, [userStore.loggedIn])


  console.log(JSON.stringify(props, null, 2))


  return (
    <>
      <AuthModal authModalOpen={authModalOpen} tabIndexValue={tabIndexValue} />
      {userStore.loggedIn && <Component />}
      {(!userStore.loggedIn && !authModalOpen) && <LogInText onClick={() => uiStore.openAuthModal()} />}
    </>
  )
}))


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
