import React from "react"
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from "@material-ui/core"

import { container } from "../styles/esxStyles.js"

const useStyles = makeStyles({
	container: {
		...container,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start"
	},
})

const DEFAULT_BODY = "coming soon"

// https://stackoverflow.com/questions/43862600/how-to-get-query-string-parameters-from-url-in-next-js
export default (props) => {

	const {query} = useRouter()
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<Typography variant="h4">{query.title}</Typography>
			<Typography variant="body1" color="textPrimary">
				{('body' in query && query.message) ? query.message : DEFAULT_BODY}
			</Typography>
		</div>
	)
}