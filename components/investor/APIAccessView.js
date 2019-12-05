import { Button, IconButton, Icon } from '@material-ui/core'

import ViewSection from './ViewSection'

const labels = {
	apiKeys: {
		title: "API Keys",
		noneYetTitle: "You haven't created any API keys yet.",
		noneYetCopy: "API keys allow you to perform automated actions on your account with your own software."
	},
	oauthApps: {
		title: "OAuth2 Applications",
		noneYetTitle: "You haven't created any OAuth2 applications yet.",
		noneYetCopy: "Build applications for others using the ESX API."
	},
}

const FillableSection = (props) => {
	const { classes, title, noneYetTitle, noneYetCopy} = props

	const AddButton = <IconButton className={classes.apiSectionAddButton}><Icon color="primary">add_circle</Icon></IconButton>
	return (
		<ViewSection title={title} controlUI={AddButton}>
			<Icon className={classes.apiSectionListInfoIcon} color="primary">info_circle</Icon>
			<div className={classes.apiSectionListNoneOuter} >
					<span className={classes.apiSectionListNoneTitle}>{noneYetTitle}</span>
					<span className={classes.apiSectionListNoneCopy}>{noneYetCopy}</span>
			</div>
		</ViewSection>
	)
}

const APIVersionAndNotifications = (props) => {

	const { classes } = props
	return (
		<ViewSection title='API Versions and Notifications' >
			<p>
				API version is generally passed as a <code>CB-VERSION</code> header. If the API version is moitted, the version displayed below will be used. Learn more about API versioning.
			</p>
			<p>
				Notifications allow you to subscrive to updates for your OAuth application or API key. Since notifications are delivered via webhooks, they always 
				correspond to the API version displayed below. Before upgrading your service, ensure that your application is ready to accept the laterst notciation version.
			</p>
			<div className={classes.apiApiUpgradeOuter} >
				<strong className={classes.apiUpgradeVersion}>API Version: 2019-03-26</strong>
				<Button className={classes.apiUpgradeLink} href="#">Upgrade</Button>
			</div>
		</ViewSection>
	)

}

export default (props) => {
	const { classes } = props
	return (
		<>
			<FillableSection title={labels.apiKeys.title} noneYetTitle={labels.apiKeys.noneYetTitle} noneYetCopy={labels.apiKeys.noneYetCopy} classes={classes} />
			<FillableSection title={labels.oauthApps.title} noneYetTitle={labels.oauthApps.noneYetTitle} noneYetCopy={labels.oauthApps.noneYetCopy} classes={classes} />
			<APIVersionAndNotifications classes={classes} />
		</>
	)
}

