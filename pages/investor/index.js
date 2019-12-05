import React from "react"
import { inject, observer } from "mobx-react"
import { makeStyles } from "@material-ui/core"

import { TabbedView } from "../../components/app"
import {
	InvestorInfoView,
	APIAccessView,
	SecurityView,
	ActiveSessionsView
} from "../../components/investor"

import { googlePageView } from "../../util/generic.js"

import myStyles from "../../styles/pages/investor.style.js"
const styles = makeStyles(myStyles)


export default (props) => {
	const classes = styles()
	return (
		<div>
			<TabbedView persistenceKey="investor-info">
				<InvestorInfoView tabTitle="Profile" classes={classes}/>
				<APIAccessView tabTitle="API Access" classes={classes} />
				<SecurityView tabTitle="Security" classes={classes} />
				<ActiveSessionsView tabTitle="Account Activity" classes={classes} />
			</TabbedView>
		</div>
	)
}
