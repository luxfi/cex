import React from "react"
import { withStyles } from '@material-ui/core/styles'

import { container } from "../styles/esxStyles.js"
import { googlePageView } from "../util/generic.js"

const styles = theme => ({
	container: {
		...container,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center"
	},
})

class ActiveSessions extends React.Component {

	componentDidMount() {
		googlePageView()
	}

	render() {

		const { classes} = this.props
		return (
			<div className={classes.container}>
				<h1 className={classes.heading}>Active Sessions</h1>
			</div>
		)
	}
}

export default withStyles(styles)(ActiveSessions)
