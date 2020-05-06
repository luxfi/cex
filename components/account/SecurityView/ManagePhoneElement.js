import { Typography } from '@material-ui/core'

import IconInfoArea from './IconInfoArea'

const ManagePhoneElement = (props) => {
  const { classes, phoneNumber } = props

  return (
    <div>
      <IconInfoArea classes={classes} iconName='phone_iphone' buttonText='Manage' buttonAction={() => {}} >
        <Typography
          variant='body1'
          color='textPrimary'
        >
          {`+x xxx xxx xx${phoneNumber.toString().slice(-2)}`}
        </Typography>
        <Typography
          color='textPrimary'
        >
          Keep your primary phone number up-to-date
        </Typography>
        <Typography
          color='primary'
        >
          Required
        </Typography>
      </IconInfoArea>
    </div>
  )
}

export default ManagePhoneElement
