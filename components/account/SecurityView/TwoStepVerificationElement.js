import { Typography } from '@material-ui/core'

import IconInfoArea from './IconInfoArea'

const TwoStepVerificationElement = (props) => {
  const { classes } = props

  return (
    <div>
      <IconInfoArea classes={classes} iconName='phone_iphone' buttonText='Manage' buttonAction={() => {}} >
        <Typography color='textPrimary' variant='h6'>Authenticator</Typography>
        <Typography color='textPrimary'>Install and authenticator app on your phone</Typography>
        <Typography color='primary'>Secure</Typography>
      </IconInfoArea>
    </div>
  )
}

export default TwoStepVerificationElement
