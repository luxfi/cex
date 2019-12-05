import { 
	Button, 
	Icon, 
	IconButton, 
	Typography 
} from '@material-ui/core'

import ViewSection from './ViewSection'

const PhoneNumberDisplay  = (props) => {
	const { number, className } = props
	return (
		<Typography variant='body1' color='textPrimary' className={className}>{`+x xxx xxx xx${number.toString().slice(-2)}`}</Typography>
	)
}

const PhoneSection = (props) => {
	const { classes, phoneNumber } = props

	const AddButton = < IconButton className = { classes.apiSectionAddButton } > <Icon color="primary">add_circle</Icon></IconButton>

	return (
		<ViewSection title='Phone Number' controlUI={AddButton}>
			<Icon className={classes.securityPhoneIcon}>phone_iphone</Icon>
			<div className={classes.securityPhoneMainArea}>
				<PhoneNumberDisplay number={phoneNumber} className={classes.securityNumber}/>
				<Typography color='textPrimary' className={classes.securityPhoneNumberSuggestion}>Keep your primary phone number up-to-date</Typography>
				<Typography color='primary' className={classes.okLabel}>Required</Typography>
			</div>
			<Button className={classes.sectionButton}>Manage</Button>
		</ViewSection>
	)
}

const TwoStepVerification = (props) => {
	const { classes } = props
	return (
		<ViewSection title='2-step verification' >
			<Icon className={classes.securityAuthenticatorIcon}>verified_user</Icon>
			<div className={classes.securityAuthenticatorMainArea}>
				<Typography color='textPrimary' variant='h6' className={classes.securityAuthenticatorTitle}>Authenticator</Typography>
				<Typography color='textPrimary' className={classes.securityAuthenticatorSuggestion}>Install and authenticator app on your phone</Typography>
				<Typography color='primary' className={classes.okLabel}>Secure</Typography>
			</div>
			<Button className={classes.sectionButton}>Install</Button>
		</ViewSection>
	)
}


export default (props) => {
	const { classes } = props
	return (
		<>
			<PhoneSection phoneNumber={'2154551234'} classes={classes} />
			<TwoStepVerification classes={classes} />
		</>
	)
}

