import React from "react"
import { inject, observer } from "mobx-react" // TODO when removing fake data
import { Container, makeStyles } from "@material-ui/core"

import { TabbedView } from "../components/app"
import {
	InvestorInfoView,
	APIAccessView,
	SecurityView,
	ActiveSessionsView
} from "../components/investor"

import { googlePageView } from "../util/generic.js" // TODO

import myStyles from "../styles/pages/investor.style.js"
const styles = makeStyles(myStyles)

export default (props) => {
	const classes = styles()
	return (
		<Container className={classes.root}>
			<TabbedView >
				<InvestorInfoView tabTitle="Profile" classes={classes}/>
				<APIAccessView tabTitle="API Access" classes={classes} />
				<SecurityView tabTitle="Security" classes={classes} />
				<ActiveSessionsView tabTitle="Account Activity" classes={classes} />
			</TabbedView>
		</Container>
	)
}
