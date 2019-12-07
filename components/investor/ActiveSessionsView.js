import { 
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow, 
	Typography 
} from '@material-ui/core'

import { ViewCard } from '../app'
import fakeData from './fixture/fakeActiveSessions'
const data = fakeData()

const ThirdPartyApps = (props) => {
	const { classes } = props
	const AppsTableHeader = (props) => {
		return (
			<TableHead>
				<TableRow className={classes.sessionsHeaderRow}>
					<TableCell className={classes.sessionsAppsAppNameColumn}>Application</TableCell>
					<TableCell className={classes.sessionsAppsPermissionsColumn}>Permissions</TableCell>
					<TableCell className={classes.sessionsAppsActivityColumn}>Recent activity</TableCell>
				</TableRow>
			</TableHead>
		)
	} 

	const AppsTableRow = ({ appName, renderedIcon, permissions, time }) => {
		const icon = (!renderedIcon) ? null : renderedIcon + '&nbsp;'
		return (<TableRow>
			<TableCell className={classes.sessionsAppsAppName}>{icon}{appName}</TableCell>
			<TableCell className={classes.sessionsAppsPermissions}>{permissions}</TableCell>
			<TableCell className={classes.sessionsAppsPermissions}>{time}</TableCell>
		</TableRow>)
	}

	return (
		<ViewCard title='Third-Party Applications' >
			<Table className={classes.sessionsThirdPartyAppsTable} padding='none'>
				<AppsTableHeader />
				<TableBody>
				{data.thirdPartyApps.map((item, i) => {
					return(
						<AppsTableRow appName={item.application} permissions={item.permissions} time={item.date} key={`apps-table-key${i}`}/> 	
					)
				})}
				</TableBody>
			</Table>
		</ViewCard>
	)
}

const ActiveSessions = (props) => {
	const { classes } = props
	const SessionsTableHeader = (props) => {
		return (
			<TableHead>
				<TableRow className={classes.sessionsHeaderRow}>
					<TableCell className={classes.sessionsSessionsDateColumn}>Signed In</TableCell>
					<TableCell className={classes.sessionsSessionsBrowserColumn}>Browser</TableCell>
					<TableCell className={classes.sessionsSessionsIPColumn}>IP Address</TableCell>
					<TableCell className={classes.sessionsSessionsLocationColumn}>Near</TableCell>
				</TableRow>
			</TableHead>
		)
	}

	const SessionsTableRow = ({ date, browser, ip, location }) => {

		return (<TableRow>
			<TableCell className={classes.sessionsSessionsDate}>{date}</TableCell>
			<TableCell className={classes.sessionsSessionsBrowser}>{browser}</TableCell>
			<TableCell className={classes.sessionsSessionsIP}>{ip}</TableCell>
			<TableCell className={classes.sessionsSessionsLocation}>{location}</TableCell>
		</TableRow>)
	}

	return (
		<ViewCard title='Active Sessions' >
			<Table className={classes.sessionsSessionsTable} padding='none'>
				<SessionsTableHeader />
				<TableBody>
					{data.webSessions.map((item, i) => {
						return (
							<SessionsTableRow date={item.date} browser={item.browser} ip={item.ip} location={item.location} key={`sessions-table-key${i}`} />
						)
					})}
				</TableBody>
			</Table>
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