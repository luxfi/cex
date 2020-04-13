import {
  Button,
  Icon,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core'

import { ViewCard } from '../../app'
import styles from '../../../styles/pages/account.style'

const useStyles = makeStyles(styles)

const PhoneNumberDisplay = (props) => {
  const { number, className } = props
  return (
    <Typography variant='body1' color='textPrimary' className={className}>{`+x xxx xxx xx${number.toString().slice(-2)}`}</Typography>
  )
}

const IconInfoArea = (props) => {
  const {
    classes,
    iconName,
    children,
    buttonText,
    buttonAction,
  } = props

  return (
    <div className={classes.iconInfoAreaOuter}>
      <Icon className={classes.iconInfoAreaIcon}>{iconName}</Icon>
      <div className={classes.iconInfoAreaMain}>
        {children}
      </div>
      <div className={classes.iconInfoAreaButtonOuter} >
        <Button className={classes.iconInfoAreaButtonOuter} variant="outlined" onClick={buttonAction} >{buttonText}</Button>
      </div>
    </div>
  )
}

const PhoneSection = (props) => {
  const { classes, phoneNumber } = props

  const AddButton =
    <IconButton className = { classes.apiSectionAddButton } >
      <span className={classes.controlUILabel}>Add</span>
      <Icon color="primary" className={classes.controlUIIcon}>add_circle</Icon>
    </IconButton>

  return (
    <ViewCard title='Phone Number' controlUI={AddButton}>
      <IconInfoArea classes={classes} iconName='phone_iphone' buttonText='Manage' buttonAction={() => {}} >
        <PhoneNumberDisplay number={phoneNumber} className={classes.securityNumber} />
        <Typography color='textPrimary' className={classes.securityPhoneNumberSuggestion}>Keep your primary phone number up-to-date</Typography>
        <Typography color='primary' className={classes.okLabel}>Required</Typography>
      </IconInfoArea>
    </ViewCard>
  )
}

const TwoStepVerification = (props) => {
  const { classes } = props
  return (
    <ViewCard title='2-step verification' >
      <IconInfoArea classes={classes} iconName='verified_user' buttonText='Install' buttonAction={() => { }} >
        <Typography color='textPrimary' variant='h6' className={classes.securityAuthenticatorTitle}>Authenticator</Typography>
        <Typography color='textPrimary' className={classes.securityAuthenticatorSuggestion}>Install and authenticator app on your phone</Typography>
        <Typography color='primary' className={classes.okLabel}>Secure</Typography>
      </IconInfoArea>
    </ViewCard>
  )
}

export default (props) => {
  const classes = useStyles()

  return (
    <>
      <PhoneSection phoneNumber='2154551234' classes={classes} />
      <TwoStepVerification classes={classes} />
    </>
  )
}
