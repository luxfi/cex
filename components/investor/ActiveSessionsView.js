import { Button, Typography } from '@material-ui/core'

import { ViewCard } from '../app'
import fakeData from './fixture/fakeActiveSessions'

const data = fakeData()

const ThirdPartyApps = (props) => {

	const { classes } = props

	const AppsTableHeader = (props) => {
		return (
			<tr className={classes.sessionsHeaderRow}>
				<th className={classes.sessionsAppsAppNameColumn}>Application</th>
				<th className={classes.sessionsAppsPermissionsColumn}>Permissions</th>
				<th className={classes.sessionsAppsActivityColumn}>Recent activity</th>
			</tr>
		)
	} 

	const AppsTableRow = ({ appName, renderedIcon, permissions, time }) => {

		const icon = (!renderedIcon) ? null : renderedIcon + '&nbsp;'
		return (<tr>
			<td className={classes.sessionsAppsAppName}>{icon}{appName}</td>
			<td className={classes.sessionsAppsPermissions}>{permissions}</td>
			<td className={classes.sessionsAppsPermissions}>{time}</td>
		</tr>)
	}

	return (
		<ViewCard title='Third-Party Applications' >
			<table className={classes.sessionsThirdPartyAppsTable}><tbody>
				<AppsTableHeader />
				{data.thirdPartyApps.map((item, i) => {
					return(
						<AppsTableRow appName={item.application} permissions={item.permissions} time={item.date} key={`apps-table-key${i}`}/> 	
					)
				})}
			</tbody></table>
		</ViewCard>
	)
}

const ActiveSessions = (props) => {

	const { classes } = props

	const SessionsTableHeader = (props) => {
		return (
			<tr className={classes.sessionsHeaderRow}>
				<th className={classes.sessionsSessionsDateColumn}>Signed In</th>
				<th className={classes.sessionsSessionsBrowserColumn}>Browser</th>
				<th className={classes.sessionsSessionsIPColumn}>IP Address</th>
				<th className={classes.sessionsSessionsLocationColumn}>Near</th>
			</tr>
		)
	}

	const SessionsTableRow = ({ date, browser, ip, location }) => {

		return (<tr>
			<td className={classes.sessionsSessionsDate}>{date}</td>
			<td className={classes.sessionsSessionsBrowser}>{browser}</td>
			<td className={classes.sessionsSessionsIP}>{ip}</td>
			<td className={classes.sessionsSessionsLocation}>{location}</td>
		</tr>)
	}

	return (
		<ViewCard title='Active Sessions' >
			<table className={classes.sessionsSessionsTable}><tbody>
				<SessionsTableHeader />
				{data.webSessions.map((item, i) => {
					return (
						<SessionsTableRow date={item.date} browser={item.browser} ip={item.ip} location={item.location} key={`sessions-table-key${i}`}/>
					)
				})}
			</tbody></table>
		</ViewCard>
	)
}

const CloseAccount = (props) => {

	const { classes } = props
	
	return (
		<ViewCard title='Close Account' >
			<Typography>
				Withdraw funds and close your ESX Accounts - <span className={classes.warning}>this cannot be undone</span>
			</Typography>
			<Button variant="outlined">Close Account</Button>
		</ViewCard>
	)
}

export default (props) => {

	const { classes } = props

	return (
		<>
			<ThirdPartyApps classes={classes} />
			<ActiveSessions classes={classes} />
			<CloseAccount classes={classes} />
		</>
	)
}